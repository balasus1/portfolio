# 🔐 GitHub Environment Variables Setup Guide

This guide explains how to configure environment variables for your portfolio chatbot in GitHub.

## 📍 Where to Add Environment Variables

Since this is a **Vite application**, environment variables need to be available at **build time** (they get baked into the JavaScript bundle). You have two options:

### Option 1: GitHub Secrets (Recommended for Production)

This is the **recommended approach** for production deployments. Environment variables are stored securely in GitHub Secrets and passed to the Docker build.

#### Step 1: Add Secrets to GitHub Repository

1. Go to your GitHub repository
2. Click on **Settings** (top menu)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add the following secrets:

   **Secret 1: Gemini API Key**
   - Name: `VITE_GEMINI_API_KEY`
   - Value: Your Gemini API key (from https://aistudio.google.com/app/apikey)
   - Click **Add secret**

   **Secret 2: Groq API Key (Recommended)**
   - Name: `VITE_GROQ_API_KEY`
   - Value: Your Groq API key (from https://console.groq.com/)
   - Click **Add secret**

#### Step 2: Verify Secrets Are Added

You should now see both secrets listed:
- ✅ `VITE_GEMINI_API_KEY`
- ✅ `VITE_GROQ_API_KEY`

**Note:** Once you add a secret, you cannot view its value again (for security). You can only update or delete it.

---

### Option 2: Local .env File (For Local Development Only)

For **local development**, create a `.env` file in your project root:

```bash
# In your project root directory
touch .env
```

Add your API keys to `.env`:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GROQ_API_KEY=your_groq_api_key_here
```

**Important:** 
- The `.env` file is already in `.gitignore`, so it won't be committed to GitHub
- This file is only for local development
- For production builds via GitHub Actions, you **must** use GitHub Secrets (Option 1)

---

## 🔄 How It Works

### For Local Development:
1. Create `.env` file in project root
2. Add your API keys
3. Run `npm run dev` or `docker compose up`
4. Vite automatically reads `.env` file

### For Production (GitHub Actions):
1. Add secrets to GitHub (as described above)
2. GitHub Actions workflow passes secrets to Docker build
3. Docker build includes them in the Vite build process
4. Environment variables are baked into the production bundle

---

## ✅ Verification

### Check if Secrets Are Configured:

1. **In GitHub:**
   - Go to: Repository → Settings → Secrets and variables → Actions
   - You should see both `VITE_GEMINI_API_KEY` and `VITE_GROQ_API_KEY` listed

2. **After Deployment:**
   - Open your deployed portfolio website
   - Open the chat widget
   - Try asking a question
   - If it works, your API keys are correctly configured!

### Troubleshooting:

- **"Chatbot is not configured"**: API keys are missing or not passed correctly
- **"Invalid API key"**: Check that you copied the full API key without extra spaces
- **Works locally but not in production**: Make sure you added the secrets to GitHub (not just local .env)

---

## 🔒 Security Best Practices

1. ✅ **Never commit `.env` files** to Git (already in `.gitignore`)
2. ✅ **Use GitHub Secrets** for production builds
3. ✅ **Rotate API keys** if they're accidentally exposed
4. ✅ **Use different keys** for development and production if possible
5. ✅ **Monitor API usage** in your Gemini/Groq dashboards

---

## 📝 Quick Reference

| Location | Purpose | When to Use |
|----------|---------|-------------|
| **GitHub Secrets** | Production builds | Always for GitHub Actions deployments |
| **Local `.env` file** | Local development | When running `npm run dev` locally |
| **VPS `.env` file** | VPS deployment | If deploying manually on VPS (not via GitHub Actions) |

---

## 🆘 Need Help?

If you're still having issues:

1. Check the GitHub Actions workflow logs to see if secrets are being passed
2. Verify API keys are valid by testing them directly:
   - Gemini: https://aistudio.google.com/app/apikey
   - Groq: https://console.groq.com/
3. Check browser console for any error messages
4. Ensure the workflow file has been updated to use the secrets (see next section)
