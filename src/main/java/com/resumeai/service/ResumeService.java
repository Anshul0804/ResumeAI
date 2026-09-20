package com.resumeai.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.resumeai.entity.Resume;
import com.resumeai.entity.User;
import com.resumeai.repository.ResumeRepository;
import com.resumeai.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final PdfTextExtractorService pdfTextExtractorService;

    public String uploadResume(MultipartFile file)
            throws IOException {

        // Get logged-in user's email from JWT
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        // Find logged-in user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Path uploadDir = Paths.get("uploads");

        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        String fileName = System.currentTimeMillis()
                + "_" + file.getOriginalFilename();

        Path filePath = uploadDir.resolve(fileName);

        // Save PDF file
        Files.copy(file.getInputStream(), filePath);

        // Extract text from PDF
        String extractedText =
                pdfTextExtractorService.extractText(filePath);

        // Save resume information + extracted text
        Resume resume = Resume.builder()
                .fileName(file.getOriginalFilename())
                .fileType(file.getContentType())
                .filePath(filePath.toString())
                .extractedText(extractedText)
                .user(user)
                .build();

        resumeRepository.save(resume);

        return "Resume uploaded successfully";
    }

    public List<Resume> getMyResumes() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return resumeRepository.findByUserId(user.getId());
    }
    public Resume getResumeById(Long resumeId) {

    return resumeRepository.findById(resumeId)
            .orElseThrow(() ->
                    new RuntimeException("Resume not found"));
}
}