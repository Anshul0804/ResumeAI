package com.resumeai.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.resumeai.entity.JobDescription;
import com.resumeai.service.JobDescriptionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobDescriptionController {

    private final JobDescriptionService jobDescriptionService;

    @PostMapping
    public ResponseEntity<JobDescription> createJobDescription(
            @RequestParam String jobTitle,
            @RequestParam String description) {

        JobDescription jobDescription =
                jobDescriptionService.createJobDescription(
                        jobTitle,
                        description
                );

        return ResponseEntity.ok(jobDescription);
    }

    @GetMapping("/my")
    public ResponseEntity<List<JobDescription>> getMyJobDescriptions() {

        List<JobDescription> jobs =
                jobDescriptionService.getMyJobDescriptions();

        return ResponseEntity.ok(jobs);
    }
}