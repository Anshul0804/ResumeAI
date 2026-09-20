package com.resumeai.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.resumeai.entity.JobDescription;
import com.resumeai.entity.User;
import com.resumeai.repository.JobDescriptionRepository;
import com.resumeai.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobDescriptionService {

    private final JobDescriptionRepository jobDescriptionRepository;
    private final UserRepository userRepository;

    public JobDescription createJobDescription(
            String jobTitle,
            String description) {

        // Get logged-in user's email from JWT
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        // Find user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // Create job description
        JobDescription jobDescription =
                JobDescription.builder()
                        .jobTitle(jobTitle)
                        .description(description)
                        .user(user)
                        .build();

        return jobDescriptionRepository.save(jobDescription);
    }

    public List<JobDescription> getMyJobDescriptions() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return jobDescriptionRepository
                .findByUserId(user.getId());
    }
}