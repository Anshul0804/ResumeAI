package com.resumeai.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.resumeai.entity.JobMatch;

public interface JobMatchRepository
        extends JpaRepository<JobMatch, Long> {

    Optional<JobMatch> findByResumeIdAndJobDescriptionId(
            Long resumeId,
            Long jobDescriptionId
    );

    @Query("SELECT AVG(j.matchScore) FROM JobMatch j")
    Double findAverageMatchScore();
}