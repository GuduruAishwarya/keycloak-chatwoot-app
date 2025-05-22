# Knowledge Base + Chatwoot AI Agent + Keycloak SSO

## Overview
- **Frontend:** Next.js (TypeScript)
- **Knowledge Base:** Outline (OIDC-protected via Keycloak)
- **Chat:** Chatwoot (with AI bot)
- **Bot:** Node.js Express (connects Chatwoot <-> Outline)
- **Auth:** Keycloak SSO for all services
- **Database:** PostgreSQL for Outline and Chatwoot
- **Orchestration:** Docker Compose

## Prerequisites
- Docker & Docker Compose
- Node.js (for local development, optional)

## 1. Getting Started

### Clone the repository
```bash
git clone <repository-url>
cd kb-chatbot
```

### Environment Setup
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Update the `.env` file with your configuration.

## 2. Keycloak Setup
1. Access Keycloak at `http://localhost:8080`
2. Create a new realm (e.g., `kb-chat-demo`)
3. Create the following clients:
   - `kb-ui` (public, for frontend)
   - `outline-client` (confidential, for Outline OIDC)
   - `chatwoot-oidc` (confidential, for Chatwoot SSO)
4. Configure valid redirect URIs:
   - `http://localhost:3000/*` (frontend/Outline)
   - `http://localhost:4000/auth/callback` (bot)

## 3. Running the Application

### Start all services
```bash
docker-compose up --build
```

### Access the services:
- **Outline Knowledge Base:** http://localhost:3000
- **Chatwoot Dashboard:** http://localhost:3002
- **Bot API:** http://localhost:4000

## 4. Initial Setup

### Outline
1. Log in via Keycloak SSO
2. Create collections and documents
3. Generate an API token in Outline settings

### Chatwoot
1. Log in to Chatwoot (default admin: admin@example.com / password)
2. Create a Website inbox
3. Configure the webhook in inbox settings:
   - URL: `http://bot:4000/webhook`
   - Method: POST
   - Content-Type: application/json

## 5. Development

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Bot Development
```bash
cd bot
npm install
npm run dev
```

## 6. Deployment
For production deployment, ensure you:
1. Use proper SSL certificates
2. Set strong secrets in `.env`
3. Configure proper CORS settings
4. Set up proper database backups

## 7. Troubleshooting
- Check container logs: `docker-compose logs -f [service_name]`
- Verify database connections
- Ensure all environment variables are properly set

## License
[Specify your license here]

---

**Note:** This project is for demonstration purposes. Ensure proper security measures are in place for production use.
