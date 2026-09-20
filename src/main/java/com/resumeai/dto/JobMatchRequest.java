package com.resumeai.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobMatchRequest {

    private Long resumeId;
    private Long jobId;
}