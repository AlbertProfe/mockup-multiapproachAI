# Multi-Approach AI Chatbot v0

Spring Boot chatbot mockup with Thymeleaf UI, H2 database, and Spring AI (OpenAI).

## Quick Start

### 0. Clone

```bash
git clone https://github.com/AlbertProfe/mockup-multiapproachAI.git
cd mockup-multiapproachAI
```

### 1. Set API Key

```bash
export OPENAI_API_KEY=sk-...
```

### 2. Run

**Linux / macOS:**
```bash
./mvnw spring-boot:run
```

**Windows (CMD):**
```cmd
mvnw spring-boot:run
```

**Windows (PowerShell):**
```powershell
.\mvnw spring-boot:run
```

If you don't have the Maven wrapper, use `mvn` instead of `./mvnw`.

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
