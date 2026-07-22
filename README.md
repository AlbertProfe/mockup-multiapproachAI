# Multi-Approach AI Chatbot v0

Spring Boot chatbot mockup with Thymeleaf UI, H2 database, and Spring AI (OpenAI).

## Quick Start

### 0. Clone

```bash
git clone https://github.com/AlbertProfe/mockup-multiapproachAI.git
cd mockup-multiapproachAI/multiApproachAi
```

### 1. Set API Key

```bash
export OPENAI_API_KEY=sk-...
```

### 2. Run

```bash
mvn spring-boot:run
```

Open http://localhost:8080

## Tech Stack

Java 21 · Spring Boot 3.2.5 · Thymeleaf · H2 (file-based) · JPA · Spring AI

## Project Structure

```
root/
├── .git/
├── .gitignore
├── .idea/
├── db/                       # H2 database files
├── doc/                      # Documentation
│   ├── architecture.md
│   ├── h2-database.md
│   ├── multiapproach_v0.md
│   ├── devops/deploy-flow.md
│   └── screenshots/
├── multiApproachAi/          # Spring Boot project
│   ├── pom.xml
│   └── src/
│       ├── main/java/com/example/chatbot/
│       │   ├── ChatbotApplication.java
│       │   ├── config/WebConfig.java
│       │   ├── controller/ChatController.java
│       │   ├── entity/ChatMessage.java
│       │   ├── repository/ChatMessageRepository.java
│       │   └── service/
│       │       ├── ChatService.java
│       │       └── AiChatService.java
│       └── main/resources/
│           ├── application.properties
│           ├── static/css/style.css
│           └── templates/chat.html
├── prod-jar/                 # Deploy artifacts
│   ├── Dockerfile
│   └── chatbot.jar
├── scripts/
│   └── deploy.sh
└── README.md
```

## Deploy Pipeline

See [`doc/devops/deploy-flow.md`](doc/devops/deploy-flow.md) for full details.

```
scripts/deploy.sh  ──►  prod-jar/chatbot.jar  ──►  Docker  ──►  Railway
```

| Step | Command | Description |
| ---- | ------- | ----------- |
| Build | `./scripts/deploy.sh` | Runs `mvn clean package` in `multiApproachAi/`, copies JAR to `prod-jar/` |
| Docker | `docker build -t chatbot prod-jar/` | Builds image from `prod-jar/Dockerfile` |
| Deploy | `railway up` | Deploys to Railway |

## Endpoints

| Method | Path         | Description             |
| ------ | ------------ | ----------------------- |
| GET    | `/`          | Chat page               |
| POST   | `/send`      | Send message (AJAX)     |
| GET    | `/h2-console`| H2 database console     |

## Documentation

See [`doc/`](doc/) for architecture overview, database config, deploy pipeline, and screenshots.

## Configuration

| Property                    | Default                  |
| --------------------------- | ------------------------ |
| Database                    | `jdbc:h2:file:./db/chatdb` |
| DB Username                 | `albert`                 |
| DB Password                 | `1234`                   |
| AI Model                    | `gpt-4o-mini`            |
| API Key                     | `OPENAI_API_KEY` env var |
