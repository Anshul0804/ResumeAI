package com.resumeai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestClient restClient = RestClient.create();

    private final ObjectMapper objectMapper = new ObjectMapper();

    public String analyzeResume(String resumeText) {

        String prompt = """
                Analyze the following resume and return ONLY valid JSON.

                Do not use markdown.
                Do not use ```json.
                Do not add any explanation before or after the JSON.

                The JSON must follow exactly this structure:

                {
                  "atsScore": 0,
                  "summary": "string",
                  "skills": ["skill1", "skill2"],
                  "strengths": ["strength1", "strength2"],
                  "weaknesses": ["weakness1", "weakness2"],
                  "suggestions": ["suggestion1", "suggestion2"]
                }

                Rules:
                - atsScore must be a number between 0 and 100.
                - skills must contain skills actually found in the resume.
                - strengths must be based on the resume.
                - weaknesses should identify genuine gaps or weaknesses.
                - suggestions should be practical and specific.
                - Do not invent experience, education, projects, or skills.

                Resume:
                """ + resumeText;

        String requestBody = """
                {
                  "contents": [
                    {
                      "parts": [
                        {
                          "text": %s
                        }
                      ]
                    }
                  ]
                }
                """.formatted(toJsonString(prompt));

       String response;

try {

    response = restClient.post()
            .uri("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent")
            .header("x-goog-api-key", apiKey)
            .header("Content-Type", "application/json")
            .body(requestBody)
            .retrieve()
            .body(String.class);

} catch (HttpClientErrorException.TooManyRequests e) {

    throw new RuntimeException(
            "Gemini API quota exceeded. Please try again later."
    );

} catch (HttpServerErrorException.ServiceUnavailable e) {

    System.out.println("Gemini 3.8 unavailable. Trying fallback model...");

    response = restClient.post()
            .uri("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent")
            .header("x-goog-api-key", apiKey)
            .header("Content-Type", "application/json")
            .body(requestBody)
            .retrieve()
            .body(String.class);

} catch (HttpClientErrorException e) {

    throw new RuntimeException(
            "Gemini API error: " + e.getStatusCode()
    );
}

        try {

            JsonNode root = objectMapper.readTree(response);

            String aiText = root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
System.out.println("GEMINI RESPONSE: " + aiText);
            return aiText;

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to parse Gemini response", e
            );
        }
    }

    private String toJsonString(String text) {

        return "\"" + text
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t")
                + "\"";
    }
}