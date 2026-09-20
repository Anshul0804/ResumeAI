# ResumeAI — AI-Powered Resume Analyzer & Job Matcher

ResumeAI is a full-stack web application that uses AI to analyze resumes, generate ATS-style feedback, and match resumes with job descriptions.

## 🚀 Features

- User Registration & Login
- JWT-based Authentication
- Resume PDF Upload
- Automatic Resume Text Extraction
- AI-Powered Resume Analysis
- ATS Score
- Skills, Strengths & Weaknesses Detection
- AI-Powered Resume Improvement Suggestions
- Job Description Management
- Resume–Job Matching
- Matched & Missing Skills
- Match Score
- Dashboard
- Swagger API Documentation
- Dockerized Application

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- Vite

### Backend
- Java
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- Hibernate

### Database
- MySQL

### AI & Processing
- Gemini API
- Apache PDFBox

### DevOps
- Docker
- Docker Compose

## 🏗️ Architecture

React.js → REST API → Spring Boot → Service Layer → Repository Layer → MySQL

Resume Flow:

PDF Upload → PDF Text Extraction → Gemini AI → Resume Analysis → ATS Score & Suggestions

## 📌 Main Modules

1. Authentication
2. Resume Management
3. AI Resume Analysis
4. Job Description Management
5. Resume–Job Matching
6. Dashboard
7. API Documentation

## 🔐 Authentication

The application uses:

- Spring Security
- JWT Authentication
- BCrypt Password Hashing

JWT is used to authenticate protected API requests.

## 📄 Resume Analysis

The uploaded PDF is processed using Apache PDFBox to extract resume text.

The extracted text is then sent to Gemini AI for analysis.

The application generates:

- ATS Score
- Resume Summary
- Skills
- Strengths
- Weaknesses
- Improvement Suggestions

## 🔗 API Documentation

Swagger UI is available at:

`http://localhost:8081/swagger-ui/index.html`

## 🐳 Docker Setup

The application can be started using Docker Compose.

```bash
docker compose up --build
