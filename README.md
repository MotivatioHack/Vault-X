# Vault-X — End-to-End Encrypted Cloud Storage System

Vault-X is a zero-knowledge cloud storage platform engineered with client-side cryptography. Files are encrypted on the client device prior to upload using modern cryptographic algorithms, guaranteeing that plaintext data, encryption keys, and derived credentials are never exposed to server infrastructure or third parties.

---

## 1. Core Technology Stack

### Frontend
- **Framework**: React.js 18 (JavaScript)
- **Tooling**: Vite
- **Routing**: React Router DOM
- **Styling**: Modern CSS with custom cyber-security visual styling, glowing grid effects, and animations
- **Networking**: Native Fetch API

### Backend
- **Runtime**: Node.js (v22+)
- **Framework**: Express.js
- **Architecture**: Modular REST API with centralized error handling
- **Configuration**: Environment-based (`dotenv`) with CORS protection

### Database & Storage (Subsequent Bricks)
- **Database**: MongoDB Atlas (via Mongoose)
- **Encrypted Blob Storage**: MongoDB GridFS

### Cryptography (Subsequent Bricks)
- **Core Standard**: AES-256-GCM authenticated encryption
- **Key Derivation**: Argon2id / PBKDF2-HMAC-SHA-256 via Web Crypto API
- **Key Persistence**: Browser IndexedDB

---

## 2. Prerequisites
- **Node.js**: v18.0.0 or higher (v22+ recommended for native `--watch` flag)
- **npm**: v9.0.0 or higher
- **Git**: Installed and configured on your system

---

## 3. Project Structure

```
vault-x/
├── client/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── BrandHeader.jsx
│   │   │   └── HealthBadge.jsx
│   │   ├── pages/
│   │   │   └── FoundationPage.jsx
│   │   ├── layouts/
│   │   │   └── RootLayout.jsx
│   │   ├── hooks/
│   │   │   └── useHealthCheck.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── context/
│   │   ├── utils/
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   └── foundation.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── environment.js
│   │   ├── controllers/
│   │   │   └── health.controller.js
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   └── README.md
│   │   ├── routes/
│   │   │   ├── health.routes.js
│   │   │   └── index.js
│   │   ├── services/
│   │   │   └── health.service.js
│   │   ├── utils/
│   │   │   └── apiResponse.js
│   │   └── app.js
│   ├── .env.example
│   ├── .env
│   └── package.json
├── docs/
│   └── DEVELOPMENT_PROGRESS.md
├── .gitignore
└── README.md
```

---

## 4. Installation & Setup

### 1. Clone or Open the Repository
```bash
cd "00 Project"
```

### 2. Install Backend Dependencies
```bash
cd server
npm install
```

Ensure environment configuration is present:
```bash
# Verify .env exists or copy from example
cp .env.example .env
```

### 3. Install Frontend Dependencies
```bash
cd ../client
npm install
```

---

## 5. Running the Application

### Start the Backend Server (Port 5000)
In your server terminal:
```bash
cd server
npm run dev
```
*Note: Uses Node.js native file watching (`node --watch src/app.js`).*

### Start the Frontend Client (Port 5173)
In a separate client terminal:
```bash
cd client
npm run dev
```

---

## 6. Local Development URLs

| Service | URL | Description |
|---|---|---|
| **Frontend Web App** | [http://localhost:5173](http://localhost:5173) | Vault-X React foundation interface |
| **Backend API Root** | [http://localhost:5000](http://localhost:5000) | Express.js REST server |
| **API Health Check** | [http://localhost:5000/api/health](http://localhost:5000/api/health) | System health monitoring endpoint |

---

## 7. Current Implementation Status

### ✅ Completed in Brick 1:
- [x] Initialized Git repository and comprehensive `.gitignore`
- [x] Created decoupled directory structure (`client`, `server`, `docs`)
- [x] Implemented Express.js backend with JSON body parsing, CORS, centralized error handling, and `GET /api/health`
- [x] Implemented React + Vite frontend with React Router, custom dark cyber visual styling, glowing badges, and real-time backend health check monitoring
- [x] Verified zero security leaks and zero hardcoded credentials
- [x] Verified development scripts (`npm run dev` for both client and server)

---

## 8. Scope of the Next Brick (Brick 2)

**Brick 2: Database Connection & User Authentication Model**
- Connect Express server to MongoDB Atlas using Mongoose
- Create User schema with fields for email, password hash, cryptographic salt, and key derivation parameters
- Implement registration and authentication endpoints using JWT and bcrypt
- Test database connectivity and verify credential security hygiene
