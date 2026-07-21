# Architecture — AI Chatbot Mockup v0

## System Architecture

```
┌───────────────┐     HTTP     ┌───────────────────┐
│   Browser     │ ◄──────────► │  Spring Boot App  │
│  (Thymeleaf)  │   AJAX/JSON  │  (Port 8080)      │
└───────────────┘              └─────────┬─────────┘
                                         │
                         ┌───────────────┼───────────────┐
                         │               │               │
                    ┌────────┐    ┌────────────┐   ┌──────────┐
                    │ Chat   │    │ ChatService│   │AiChatSvc │
                    │Controll│    │ (Business) │   │  (AI)    │
                    └────────┘    └──────┬─────┘   └────┬─────┘
                                         │              │
                                    ┌──────────┐   ┌──────────┐
                                    │   JPA    │   │ Spring AI│
                                    │Repository│   │OpenAI Ch.│
                                    └────┬─────┘   └────┬─────┘
                                         │              │
                                    ┌──────────┐   ┌──────────┐
                                    │  H2 DB   │   │  OpenAI  │
                                    │ (Memory) │   │   API    │
                                    └──────────┘   └──────────┘
```

## Layer Breakdown

### 1. Presentation Layer (Controller)

**`ChatController`** — `src/main/java/.../controller/ChatController.java`

| Endpoint | Method | Description                |
| -------- | ------ | -------------------------- |
| `GET /`  | HTML   | Renders chat page with history |
| `POST /send` | JSON | Accepts message, returns AI reply |

### 2. Service Layer

**`ChatService`** — Business logic for persisting and retrieving chat messages.

**`AiChatService`** — Wraps Spring AI's `OpenAiChatModel` to generate AI responses.

Both services are injected into the controller via constructor injection.

### 3. Persistence Layer

**`ChatMessage`** (Entity)
| Field       | Type            | Notes                |
| ----------- | --------------- | -------------------- |
| id          | Long (PK, auto) | Generated identity   |
| role        | String          | `user` or `assistant`|
| content     | String (TEXT)   | Message body         |
| createdAt   | LocalDateTime   | Auto-set via @PrePersist |

**`ChatMessageRepository`** — Extends `JpaRepository<ChatMessage, Long>` with `findAllByOrderByCreatedAtAsc()`.

### 4. AI Integration

Uses **Spring AI** (`spring-ai-openai-spring-boot-starter`) to communicate with OpenAI-compatible APIs. `AiChatService` calls `OpenAiChatModel.call(prompt)` synchronously.

The AI provider can be swapped by changing the Spring AI starter dependency and configuration.

## Dependency Graph

```
spring-boot-starter-web
├── spring-boot-starter-tomcat
└── spring-webmvc

spring-boot-starter-thymeleaf
├── thymeleaf
├── thymeleaf-spring6
└── spring-boot-starter-web (transitive)

spring-boot-starter-data-jpa
├── spring-orm
├── hibernate-core
├── spring-data-jpa
└── hikaricp

com.h2database:h2 (runtime)

spring-ai-openai-spring-boot-starter
├── spring-ai-openai
│   ├── spring-ai-core
│   └── openai-api-client
└── spring-boot-starter (transitive)
```

## Configuration Properties (`application.properties`)

| Property                    | Purpose                      |
| --------------------------- | ---------------------------- |
| `spring.datasource.url`     | H2 JDBC URL (in-memory)      |
| `spring.jpa.hibernate.ddl-auto` | Schema generation (`update`) |
| `spring.ai.openai.api-key`  | OpenAI API key               |
| `spring.ai.openai.model`    | Model name (default `gpt-4o-mini`) |

## Data Flow — Chat Request

```
1. User types message → JS fetch POST /send
2. ChatController receives JSON {message: "..."}
3. ChatService.saveMessage("user", text) → persists to H2
4. AiChatService.getResponse(text) → calls OpenAI API
5. ChatService.saveMessage("assistant", response) → persists reply
6. Returns JSON {response: "..."} to browser
7. JS appends assistant bubble to the chat UI
```

## Running the Application

```bash
# Prerequisites: Java 21+, Maven 3.8+
export OPENAI_API_KEY=sk-your-key-here
mvn spring-boot:run
```

Access the app at `http://localhost:8080` and H2 console at `http://localhost:8080/h2-console`.
