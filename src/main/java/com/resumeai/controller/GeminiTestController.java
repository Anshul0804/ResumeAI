package com.resumeai.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.resumeai.service.GeminiService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/gemini")
@RequiredArgsConstructor
public class GeminiTestController {

    private final GeminiService geminiService;

    @GetMapping("/test")
    public String testGemini() {

        return geminiService.analyzeResume(
                "I am a Java developer with skills in Java, Spring Boot, React and MySQL."
        );
    }
}