package com.resumeai.service;

import org.springframework.stereotype.Service;

import com.resumeai.dto.DashboardResponse;
import com.resumeai.repository.JobDescriptionRepository;
import com.resumeai.repository.JobMatchRepository;
import com.resumeai.repository.ResumeAnalysisRepository;
import com.resumeai.repository.ResumeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ResumeRepository resumeRepository;
    private final JobDescriptionRepository jobDescriptionRepository;
    private final JobMatchRepository jobMatchRepository;
    private final ResumeAnalysisRepository resumeAnalysisRepository;

    public DashboardResponse getDashboard() {

        long totalResumes = resumeRepository.count();

        long totalJobs = jobDescriptionRepository.count();

        long totalMatches = jobMatchRepository.count();

        Double averageAtsScore =
                resumeAnalysisRepository.findAverageAtsScore();

        Double averageMatchScore =
                jobMatchRepository.findAverageMatchScore();

        if (averageAtsScore == null) {
            averageAtsScore = 0.0;
        }

        if (averageMatchScore == null) {
            averageMatchScore = 0.0;
        }

        return DashboardResponse.builder()
                .totalResumes(totalResumes)
                .totalJobs(totalJobs)
                .totalMatches(totalMatches)
                .averageAtsScore(averageAtsScore)
                .averageMatchScore(averageMatchScore)
                .build();
    }
}