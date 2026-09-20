package com.resumeai.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Builder
@AllArgsConstructor
public class ResumeAnalysisResponseDto {

    private Long id;

    private Long resumeId;

    private Integer atsScore;

    private String summary;

private List<String> skills;
private List<String> strengths;
private List<String> weaknesses;
private List<String> suggestions;
}