# Vault-X — MongoDB Atlas Setup & Configuration Guide

This guide is written for beginners to understand how MongoDB Atlas is integrated into **Vault-X** for user authentication, session security, and data storage.

---

## 1. Overview

Vault-X uses **MongoDB Atlas** (a fully managed cloud database) through the **Mongoose** object modeling library.

- **Cluster**: Cloud-hosted replica set (e.g. `Cluster0`).
- **Database Name**: `vault-x`.
- **Collections**: `users` (holds user profiles with bcrypt password hashes).
- **Security Boundary**: The database is never exposed directly to the browser; all requests flow securely through the Express backend API.

---

## 2. Setting Up MongoDB Atlas (Step-by-Step)

If you ever need to create a new cluster or reconfigure your database, follow these steps:

### Step 1: Create a Free Shared Cluster
1. Sign in to [MongoDB Atlas](https://cloud.mongodb.com/).
2. Click **Create** and select the **M0 Free** shared tier.
3. Choose your nearest cloud provider region (e.g., AWS / Mumbai, Frankfurt, N. Virginia).
4. Click **Create Deployment**.

### Step 2: Configure Database Access (User Credentials)
1. In the Atlas left navigation bar, go to **Security** → **Database Access**.
2. Click **Add New Database User**.
3. Choose **Password** authentication:
   - **Username**: e.g. `vault_admin` (or your preferred name).
   - **Password**: Generate or type a secure password. *Save this password in a secure password manager.*
4. Under **Database User Privileges**, select **Read and write to any database** (or assign `readWrite` on the `vault-x` database).
5. Click **Add User**.

### Step 3: Configure Network Access (IP Whitelist)
> [!IMPORTANT]
> A common issue for beginners is receiving connection timeouts. This occurs when your current IP address is not whitelisted in Atlas.

1. In the Atlas left navigation bar, go to **Security** → **Network Access**.
2. Click **Add IP Address**.
3. For local development from home or dynamic mobile networks:
   - Click **Allow Access from Anywhere** (`0.0.0.0/0`), or
   - Click **Add Current IP Address** (remember that your ISP may change your IP periodically).
4. Click **Confirm**. Wait ~1 minute until the status shows **Active**.

### Step 4: Get Your Connection String
1. Go to **Deployments** → **Database** → click **Connect**.
2. Choose **Drivers** (Node.js).
3. Copy the SRV connection URI format:
   ```text
   mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<username>` with your database username and `<password>` with your database user password.
5. In Vault-X, specify the database name `vault-x` after the slash:
   ```text
   mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/vault-x?retryWrites=true&w=majority
   ```

---

## 3. Local Environment Configuration

The database connection URI must **only** be saved inside `server/.env` (which is excluded from Git via `.env*` in `.gitignore`):

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/vault-x?retryWrites=true&w=majority
JWT_SECRET=your_secure_64_byte_cryptographic_secret
JWT_EXPIRES_IN=7d
```

> [!CAUTION]
> **Security Rules:**
> - Never commit `server/.env` to Git or push it to GitHub.
> - Never hardcode database credentials or connection strings into source code.
> - Keep `.env.example` strictly populated with placeholders.

---

## 4. How Vault-X Connects to MongoDB Atlas

The connection is managed by `server/src/config/db.js`:

1. **Sanitized Logs**: When connecting, only the cluster hostname is printed (e.g. `cluster0.xxxx.mongodb.net`). Passwords and usernames are stripped to prevent accidental log leaks.
2. **Duplicate Prevention**: If Mongoose is already connected or in the process of connecting, duplicate connection requests are blocked.
3. **Graceful Error Handling**: If MongoDB Atlas is unavailable or credentials are invalid, the backend does not crash; instead, it reports `database: "disconnected"` on the `/api/health` endpoint and returns descriptive 503 error responses to auth requests.
4. **Auto-indexing**: Builds unique indexes (such as unique normalized emails) automatically in development.

---

## 5. Verifying the Connection

You can verify that MongoDB Atlas is connected at any time:

### Via Health Check Endpoint
Make a `GET` request to `http://localhost:5000/api/health`.

Expected response:
```json
{
  "success": true,
  "message": "Vault-X API is operational",
  "environment": "development",
  "database": "connected",
  "timestamp": "2026-10-29T08:17:33.721Z"
}
```

### Via Browser UI
1. Navigate to `http://localhost:5173/signup` in your browser.
2. Enter an email and a master password (minimum 8 characters).
3. Click **Create Vault Account**.
4. The account will be registered directly in your MongoDB Atlas cluster, and you will be signed in with an HttpOnly session cookie.
