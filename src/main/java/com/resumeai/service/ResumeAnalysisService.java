package com.resumeai.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumeai.dto.ResumeAnalysisResponse;
import com.resumeai.entity.Resume;
import com.resumeai.entity.ResumeAnalysis;
import com.resumeai.repository.ResumeAnalysisRepository;
import com.resumeai.repository.ResumeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ResumeAnalysisService {

    private final ResumeRepository resumeRepository;
    private final ResumeAnalysisRepository resumeAnalysisRepository;
    private final GeminiService geminiService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public ResumeAnalysis analyzeResume(Long resumeId) {

        // 1. Find resume
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() ->
                        new RuntimeException("Resume not found"));

        // 2. Get extracted text
        String resumeText = resume.getExtractedText();

        if (resumeText == null || resumeText.isBlank()) {
            throw new RuntimeException(
                    "Resume text is empty. Please upload a valid PDF.");
        }

        // 3. Send resume text to Gemini
        String aiResponse = geminiService.analyzeResume(resumeText);

        // 4. Convert Gemini JSON into DTO
        ResumeAnalysisResponse analysisResponse;

        try {

            analysisResponse = objectMapper.readValue(
                    aiResponse,
                    ResumeAnalysisResponse.class
            );

        } catch (JsonProcessingException e) {

            throw new RuntimeException(
                    "Invalid JSON received from Gemini", e);
        }

        try {

            // 5. Convert lists into JSON strings
            String skills = objectMapper.writeValueAsString(
                    analysisResponse.getSkills());

            String strengths = objectMapper.writeValueAsString(
                    analysisResponse.getStrengths());

            String weaknesses = objectMapper.writeValueAsString(
                    analysisResponse.getWeaknesses());

            String suggestions = objectMapper.writeValueAsString(
                    analysisResponse.getSuggestions());

            // 6. Check if analysis already exists
            ResumeAnalysis analysis =
                    resumeAnalysisRepository
                            .findByResumeId(resumeId)
                            .orElse(
                                    ResumeAnalysis.builder()
                                            .resume(resume)
                                            .build()
                            );

            // 7. Update analysis
            analysis.setAtsScore(
                    analysisResponse.getAtsScore());

            analysis.setSummary(
                    analysisResponse.getSummary());

            analysis.setSkills(skills);

            analysis.setStrengths(strengths);

            analysis.setWeaknesses(weaknesses);

            analysis.setSuggestions(suggestions);

            // 8. Save analysis
            return resumeAnalysisRepository.save(analysis);

        } catch (JsonProcessingException e) {

            throw new RuntimeException(
                    "Failed to convert analysis data", e);
        }
    }

    public ResumeAnalysis getAnalysis(Long resumeId) {

        return resumeAnalysisRepository
                .findByResumeId(resumeId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Analysis not found for this resume"));
    }
}