package com.resumeai.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.resumeai.entity.Resume;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    List<Resume> findByUserId(Long userId);
}