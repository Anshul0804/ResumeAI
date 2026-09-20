package com.resumeai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class DashboardResponse {

    private Long totalResumes;

    private Long totalJobs;

    private Long totalMatches;

    private Double averageAtsScore;

    private Double averageMatchScore;
}