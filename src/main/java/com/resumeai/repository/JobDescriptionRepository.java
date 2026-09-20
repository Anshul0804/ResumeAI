package com.resumeai.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.resumeai.entity.JobDescription;

public interface JobDescriptionRepository
        extends JpaRepository<JobDescription, Long> {

    List<JobDescription> findByUserId(Long userId);
}