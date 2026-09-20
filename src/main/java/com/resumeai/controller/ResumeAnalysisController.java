package com.resumeai.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumeai.dto.ResumeAnalysisResponseDto;
import com.resumeai.entity.ResumeAnalysis;
import com.resumeai.service.ResumeAnalysisService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/resumes")
@RequiredArgsConstructor
public class ResumeAnalysisController {

    private final ResumeAnalysisService resumeAnalysisService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping("/{resumeId}/analyze")
    public ResponseEntity<ResumeAnalysisResponseDto> analyzeResume(
            @PathVariable Long resumeId) {

        ResumeAnalysis analysis =
                resumeAnalysisService.analyzeResume(resumeId);

        ResumeAnalysisResponseDto response =
                ResumeAnalysisResponseDto.builder()
                        .id(analysis.getId())
                        .resumeId(analysis.getResume().getId())
                        .atsScore(analysis.getAtsScore())
                        .summary(analysis.getSummary())
                        .skills(parseList(analysis.getSkills()))
                        .strengths(parseList(analysis.getStrengths()))
                        .weaknesses(parseList(analysis.getWeaknesses()))
                        .suggestions(parseList(analysis.getSuggestions()))
                        .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{resumeId}/analysis")
    public ResponseEntity<ResumeAnalysisResponseDto> getAnalysis(
            @PathVariable Long resumeId) {

        ResumeAnalysis analysis =
                resumeAnalysisService.getAnalysis(resumeId);

        ResumeAnalysisResponseDto response =
                ResumeAnalysisResponseDto.builder()
                        .id(analysis.getId())
                        .resumeId(analysis.getResume().getId())
                        .atsScore(analysis.getAtsScore())
                        .summary(analysis.getSummary())
                        .skills(parseList(analysis.getSkills()))
                        .strengths(parseList(analysis.getStrengths()))
                        .weaknesses(parseList(analysis.getWeaknesses()))
                        .suggestions(parseList(analysis.getSuggestions()))
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
                    "Failed to parse analysis data", e);
        }
    }
}