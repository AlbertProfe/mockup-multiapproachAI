

# Step-by-Step Guide: Deploying a Spring Boot JAR (with Thymeleaf HTML) to GitHub + Railway using Docker

- [Deploy a Spring Boot App](https://docs.railway.com/guides/spring-boot)

- [Repo]([GitHub - AlbertProfe/mockup-multiapproachAI · GitHub](https://github.com/AlbertProfe/mockup-multiapproachAI))

This guide covers the full flow for our repo: [`https://github.com/AlbertProfe/mockup-multiapproachAI`](https://github.com/AlbertProfe/mockup-multiapproachAI).

### 1. Prepare the JAR and Versioning (Local)

1. Build our Spring Boot project (from the `multiApproachAi/` folder):
   
   ```bash
   cd multiApproachAi
   ./mvnw clean package -DskipTests
   ```

2. Copy the generated JAR to the deployment folder and version it:
   
   ```bash
   cp target/*.jar ../prod-jar/
   
   # Example versioning (update version.txt accordingly)
   cd ../prod-jar
   ls  # Should show chatbot.jar or similar
   ```

3. Update `version.txt` with the new version number (e.g., `1.0.1`).

4. Rename the JAR to match versioning (e.g., `app_1.0.1.jar`):
   
   ```bash
   mv *.jar app_$(cat version.txt).jar
   ```

5. Update the **Dockerfile** in `prod-jar/` to reference the correct JAR:
   
   ```dockerfile
   FROM eclipse-temurin:21-jre-alpine
   WORKDIR /app
   COPY *.jar app.jar   # This copies the versioned JAR
   EXPOSE 8080
   ENTRYPOINT ["java", "-jar", "app.jar"]
   ```
   
   **Important**: Make sure our `application.properties` (or `application-prod.properties`) is configured for production (H2 or external DB, ports, etc.).

### 2. Update GitHub Repository

1. Commit and push the changes:
   
   ```bash
   git add prod-jar/
   git commit -m "Deploy: Update to version $(cat prod-jar/version.txt)"
   git push origin main   # or master
   ```

2. Recommended `.gitignore` updates (root level):
   
   ```gitignore
   # Ignore local builds and DB files
   multiApproachAi/target/
   db/
   *.h2.db
   ```

3. Update `README.md` with deployment info (add badges if desired).

4. (Optional but recommended) Add a `deploy.sh` script in `scripts/` for automation:
   
   ```bash
   #!/bin/bash
   cd multiApproachAi
   ./mvnw clean package -DskipTests
   cp target/*.jar ../prod-jar/
   cd ../prod-jar
   mv *.jar app_$(cat version.txt).jar
   git add .
   git commit -m "Deploy: version $(cat version.txt)"
   git push
   echo "Deploy committed. Railway will auto-deploy on push."
   ```

### 3. Configure Railway Deployment

Railway supports **Dockerfile-based deployments** directly from GitHub.

#### Option A: New Project (Recommended for first time)

1. Go to [railway.app](https://railway.app) and log in (GitHub auth works best).

2. Click **New Project** → **Deploy from GitHub repo**.

3. Select our repo: `AlbertProfe/mockup-multiapproachAI`.

4. In the deployment settings:
   
   - **Root Directory**: Set to `prod-jar/` (this is key — Railway will look for the Dockerfile here).
   - **Dockerfile Path**: Leave default (`Dockerfile`) or specify `Dockerfile`.
   - **Build Command**: Optional (Railway uses Docker build by default).
   - **Start Command**: Not needed (handled by Dockerfile ENTRYPOINT).

5. Add **Environment Variables** (from our `application.properties`):
   
   - `SPRING_PROFILES_ACTIVE=prod`
   - Any DB credentials, API keys, etc.
   - Port is handled by Railway (it exposes 8080 automatically).

6. Click **Deploy**.

#### Option B: Existing Project

1. Open our project on Railway.
2. Go to **Settings** → **Service** → Update **Root Directory** to `prod-jar/`.
3. Trigger a new deployment (or set up auto-deploy on push).

### 4. Verify & Monitor

- Railway will build the Docker image and deploy.
- Check **Logs** tab for startup output.
- Our app should be available at the Railway-generated URL (e.g., `https://our-service.up.railway.app`).
- Test the chat endpoint and Thymeleaf templates (`/chat` or root).

### 5. CI/CD & Best Practices

- **Auto-deploy**: Enable in Railway (default on `main` pushes).
- **Versioning**: Always update `version.txt` + rename JAR before push.
- **Environment Variables**: Manage secrets in Railway (never commit them).
- **Health Checks**: Add `/actuator/health` if you enable Spring Boot Actuator.
- **Database**: For production, connect to Railway Postgres/MySQL instead of H2 files.
- **Scaling**: Railway handles it — monitor usage in the dashboard.

### Troubleshooting

- **Build fails**: Check Docker build logs. Ensure JAR exists in `prod-jar/` and Dockerfile paths are correct.
- **Port issues**: Railway assigns its own port; our app should respect `$PORT` env var if needed (Spring Boot usually binds to 8080 fine).
- **Static resources/Thymeleaf**: Verify `static/` and `templates/` are inside the JAR.
- **Large images**: Optimize our Docker image (multi-stage if needed).

### Full Folder Structure Reminder (after setup)

```
root/
├── multiApproachAi/          # Source
├── prod-jar/
│   ├── Dockerfile
│   ├── app_1.0.1.jar
│   └── version.txt
├── scripts/
│   └── deploy.sh
└── README.md
```

Push changes to `main` → Railway auto-deploys! 🚀
