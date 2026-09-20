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
public class JobMatchResponseDto {

    private Long id;

    private Long resumeId;

    private Long jobId;

    private Integer matchScore;

    private List<String> matchedSkills;

    private List<String> missingSkills;

    private List<String> suggestions;
}