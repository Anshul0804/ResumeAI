package com.resumeai.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResumeAnalysisResponse {

    private Integer atsScore;

    private String summary;

    private List<String> skills;

    private List<String> strengths;

    private List<String> weaknesses;

    private List<String> suggestions;
}