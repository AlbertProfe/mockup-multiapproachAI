# Multi-Approach v0 — AI Chatbot Mockup

## Overview

A Spring Boot chatbot mockup that demonstrates a full-stack AI chat interface. Built as a foundation for experimenting with different AI integration approaches and conversation patterns.

## Tech Stack

| Component         | Technology                 |
| ----------------- | -------------------------- |
| Language          | Java 21                    |
| Framework         | Spring Boot 3.2.5          |
| Template Engine   | Thymeleaf                  |
| Database          | H2 (in-memory)             |
| Persistence       | JPA / Hibernate            |
| AI Integration    | Spring AI 1.0.0-M1 (OpenAI)|

## Project Structure

```
src/main/java/com/example/chatbot/
├── ChatbotApplication.java       # Entry point
├── config/WebConfig.java         # CORS configuration
├── controller/ChatController.java # Web & REST endpoints
├── entity/ChatMessage.java       # JPA entity
├── repository/                   # Spring Data JPA
└── service/
    ├── ChatService.java          # Message persistence
    └── AiChatService.java        # AI model interaction
src/main/resources/
├── application.properties        # Configuration
├── static/css/style.css          # Chat UI styles
└── templates/chat.html           # Thymeleaf template
```

## How to Run

```bash
export OPENAI_API_KEY=sk-...
mvn spring-boot:run
```

Open http://localhost:8080 in a browser.

## Key Features

- **Chat UI** — Clean, modern interface with message bubbles and typing indicator
- **History Persistence** — All messages stored in H2 in-memory DB via JPA
- **AI Integration** — Pluggable Spring AI layer (currently OpenAI)
- **REST API** — JSON endpoint at `POST /send` for AJAX communication
- **H2 Console** — Available at `/h2-console` for database inspection

## Configuration

All settings in `application.properties`:

- Database: `jdbc:h2:mem:chatdb`
- AI model: `gpt-4o-mini` (configurable)
- API key: via `OPENAI_API_KEY` environment variable
