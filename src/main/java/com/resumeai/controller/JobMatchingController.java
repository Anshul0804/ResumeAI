package com.resumeai.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumeai.dto.JobMatchRequest;
import com.resumeai.dto.JobMatchResponseDto;
import com.resumeai.entity.JobMatch;
import com.resumeai.service.JobMatchingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/matches")
@RequiredArgsConstructor
public class JobMatchingController {

    private final JobMatchingService jobMatchingService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping
    public ResponseEntity<JobMatchResponseDto> matchResumeWithJob(
            @RequestBody JobMatchRequest request) {

        JobMatch jobMatch =
                jobMatchingService.matchResumeWithJob(
                        request.getResumeId(),
                        request.getJobId()
                );

        JobMatchResponseDto response =
                JobMatchResponseDto.builder()
                        .id(jobMatch.getId())
                        .resumeId(jobMatch.getResume().getId())
                        .jobId(jobMatch.getJobDescription().getId())
                        .matchScore(jobMatch.getMatchScore())
                        .matchedSkills(
                                parseList(jobMatch.getMatchedSkills()))
                        .missingSkills(
                                parseList(jobMatch.getMissingSkills()))
                        .suggestions(
                                parseList(jobMatch.getSuggestions()))
                        .build();

        return ResponseEntity.ok(response);
    }

    private List<String> parseList(String json) {

        try {
            return objectMapper.readValue(
                    json,
                    objectMapper.getTypeFactory()
                            .constructCollectionType(
                                    List.class,
                                    String.class
                            )
            );

        } catch (JsonProcessingException e) {

            throw new RuntimeException(
                    "Failed to parse matching data", e);
        }
    }
}