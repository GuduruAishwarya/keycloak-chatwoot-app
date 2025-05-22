# Keycloak SSO+ Outline + Chatwoot AI Agent

## Overview
- **Frontend:** Next.js (TypeScript)
- **Knowledge Base:** Outline (OIDC-protected via Keycloak)
- **ChatWoot:** Chat Bot (with AI bot)
- **Auth:** Keycloak SSO for all services
- **Orchestration:** Docker Compose

## Prerequisites
- Docker & Docker Compose
- Node.js (for local development, optional)

## 1. Getting Started

### Clone the repository
```bash
git clone <repository-url>
cd keycloak-chatwoot-app
```

### Environment Setup
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Update the `.env` file with your configuration.

## 2. Keycloak Setup
1. Access Keycloak at `http://localhost:8080`
2. A new realm (e.g., `kb-chat-demo`)
3. clients:
   - `kb-ui` (public, for frontend)
   - `outline-client` (confidential, for Outline OIDC)
   - `chatwoot-oidc` (confidential, for Chatwoot SSO)
4. redirect URIs:
   - `http://localhost:3000/*` (frontend/Outline)
   - `http://localhost:4000/`

## 3. Running the Application

### Start all services
```bash
docker-compose up --build
```

### Access the services:
- **Outline Knowledge Base:** http://localhost:3000
- **Chatwoot Dashboard:** http://localhost:3001
- **NextJS app:** http://localhost:4000



