package com.resumeai.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumeai.dto.JobMatchResponse;
import com.resumeai.entity.JobDescription;
import com.resumeai.entity.JobMatch;
import com.resumeai.entity.Resume;
import com.resumeai.repository.JobDescriptionRepository;
import com.resumeai.repository.JobMatchRepository;
import com.resumeai.repository.ResumeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobMatchingService {

    private final ResumeRepository resumeRepository;
    private final JobDescriptionRepository jobDescriptionRepository;
    private final JobMatchRepository jobMatchRepository;
    private final GeminiService geminiService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public JobMatch matchResumeWithJob(
            Long resumeId,
            Long jobId) {

        // 1. Find resume
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() ->
                        new RuntimeException("Resume not found"));

        // 2. Find job description
        JobDescription jobDescription =
                jobDescriptionRepository.findById(jobId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Job description not found"));

        // 3. Get resume text
        String resumeText = resume.getExtractedText();

        if (resumeText == null || resumeText.isBlank()) {
            throw new RuntimeException(
                    "Resume text is empty");
        }

        // 4. Create AI prompt
        String prompt = """
                Compare the following resume with the given job description.

                Return ONLY valid JSON.
                Do not use markdown.
                Do not use ```json.
                Do not add any explanation.

                JSON structure:

                {
                  "matchScore": 0,
                  "matchedSkills": ["skill1", "skill2"],
                  "missingSkills": ["skill1", "skill2"],
                  "suggestions": ["suggestion1", "suggestion2"]
                }

                Rules:
                - matchScore must be between 0 and 100.
                - matchedSkills must contain skills present in both resume and job description.
                - missingSkills should contain important job requirements missing from the resume.
                - suggestions should be practical and specific.
                - Do not invent skills or experience.

                RESUME:
                """ + resumeText + """

                JOB DESCRIPTION:
                """ + jobDescription.getDescription();

        // 5. Send to Gemini
        String aiResponse =
                geminiService.analyzeResume(prompt);

        // 6. Convert AI JSON to DTO
        JobMatchResponse matchResponse;

        try {
            matchResponse = objectMapper.readValue(
                    aiResponse,
                    JobMatchResponse.class
            );
        } catch (JsonProcessingException e) {
            throw new RuntimeException(
                    "Invalid JSON received from Gemini", e);
        }

        try {

            String matchedSkills =
                    objectMapper.writeValueAsString(
                            matchResponse.getMatchedSkills());

            String missingSkills =
                    objectMapper.writeValueAsString(
                            matchResponse.getMissingSkills());

            String suggestions =
                    objectMapper.writeValueAsString(
                            matchResponse.getSuggestions());

            // 7. Check existing match
            JobMatch jobMatch =
                    jobMatchRepository
                            .findByResumeIdAndJobDescriptionId(
                                    resumeId,
                                    jobId
                            )
                            .orElse(
                                    JobMatch.builder()
                                            .resume(resume)
                                            .jobDescription(jobDescription)
                                            .build()
                            );

            // 8. Update result
            jobMatch.setMatchScore(
                    matchResponse.getMatchScore());

            jobMatch.setMatchedSkills(
                    matchedSkills);

            jobMatch.setMissingSkills(
                    missingSkills);

            jobMatch.setSuggestions(
                    suggestions);

            // 9. Save
            return jobMatchRepository.save(jobMatch);

        } catch (JsonProcessingException e) {
            throw new RuntimeException(
                    "Failed to convert matching data", e);
        }
    }
}