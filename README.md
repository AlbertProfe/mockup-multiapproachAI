# Multi-Approach AI Chatbot v0

Spring Boot chatbot mockup with Thymeleaf UI, H2 database, and Spring AI (OpenAI).

## Quick Start

```bash
export OPENAI_API_KEY=sk-...
mvn spring-boot:run
```

Open http://localhost:8080

## Tech Stack

Java 21 · Spring Boot 3.2.5 · Thymeleaf · H2 (file-based) · JPA · Spring AI

## Project Structure

```
src/main/java/com/example/chatbot/
├── ChatbotApplication.java
├── config/WebConfig.java
├── controller/ChatController.java
├── entity/ChatMessage.java
├── repository/ChatMessageRepository.java
└── service/
    ├── ChatService.java
    └── AiChatService.java
src/main/resources/
├── application.properties
├── static/css/style.css
└── templates/chat.html
```

## Endpoints

| Method | Path       | Description             |
| ------ | ---------- | ----------------------- |
| GET    | `/`        | Chat page               |
| POST   | `/send`    | Send message (AJAX)     |
| GET    | `/h2-console` | H2 database console  |

## Documentation

See [`doc/`](doc/) for architecture overview, database config, and screenshots.

## Configuration

| Property                    | Default                  |
| --------------------------- | ------------------------ |
| Database                    | `jdbc:h2:file:./db/chatdb` |
| DB Username                 | `albert`                 |
| DB Password                 | `1234`                   |
| AI Model                    | `gpt-4o-mini`            |
| API Key                     | `OPENAI_API_KEY` env var |
