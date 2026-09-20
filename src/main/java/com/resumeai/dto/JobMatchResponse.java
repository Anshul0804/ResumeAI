package com.resumeai.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobMatchResponse {

    private Integer matchScore;

    private List<String> matchedSkills;

    private List<String> missingSkills;

    private List<String> suggestions;
}