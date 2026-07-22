# Deploy Flow — Railway

Build, containerize, and deploy the Spring Boot app to Railway via opencode.

## Pipeline Overview

```
 opencode agent
      │
      ▼
 scripts/deploy.sh        ──►    multiApproachAi/target/ → prod-jar/chatbot.jar
      │
      ▼
 prod-jar/Dockerfile      ──►    eclipse-temurin:21-jre-alpine image
      │
      ▼
 Railway CLI              ──►    railway up
```

## How It Works

### 1. opencode Agent

The agent is invoked from the opencode CLI using the `Task` tool. It runs the deploy script, which handles the full pipeline.

### 2. Build Script (`scripts/deploy.sh`)

```bash
./scripts/deploy.sh
```

What it does:

| Step                              | Description                                      |
| --------------------------------- | ------------------------------------------------ |
| `mvn clean package` in `multiApproachAi/` | Builds the Spring Boot fat JAR (skips tests) |
| Removes old JARs from `prod-jar/` | Clears previous build                            |
| Copies new JAR as `chatbot.jar`   | Places it in `prod-jar/`                         |

### 3. Dockerfile

Located at `prod-jar/Dockerfile`. Uses `eclipse-temurin:21-jre-alpine` for a minimal JRE runtime.

| Instruction       | Value                              |
| ----------------- | ---------------------------------- |
| Base image        | `eclipse-temurin:21-jre-alpine`    |
| Working directory | `/app`                             |
| Build context     | `prod-jar/`                        |
| JAR source        | `chatbot.jar`                      |
| Port              | `8080`                             |
| Entrypoint        | `java -jar app.jar`                |

### 4. Railway Deployment

Requires the [Railway CLI](https://docs.railway.app/develop/cli) and a linked Railway project.

```bash
railway login
railway link            # link to your Railway project
cd prod-jar             # Dockerfile lives here
railway up              # build & deploy
```

## How to Call the Agent from opencode

In an opencode conversation, ask the agent to run the deploy flow.

**Example prompt:**

> Run the deploy flow: build the JAR, prepare prod-jar/, Dockerize, and deploy to Railway.

The agent will:

1. Run `scripts/deploy.sh` via Bash
2. Run `docker build -t chatbot prod-jar/` via Bash
3. Run `railway up` from `prod-jar/` via Bash

## File Structure

```
project-root/
├── doc/devops/
│   └── deploy-flow.md           # This document
├── scripts/
│   └── deploy.sh                # Build & prepare script
├── prod-jar/
│   ├── Dockerfile               # Container definition
│   └── chatbot.jar              # Latest build
├── db/                          # H2 database files
└── multiApproachAi/             # Spring Boot project
    ├── pom.xml
    └── src/
```

## Prerequisites

| Requirement       | Check                     |
| ----------------- | ------------------------- |
| Java 21           | `java -version`           |
| Maven             | `mvn --version`           |
| Docker            | `docker --version`        |
| Railway CLI       | `railway --version`       |
| Railway account   | https://railway.app       |
| Railway project   | Linked via `railway link` |
