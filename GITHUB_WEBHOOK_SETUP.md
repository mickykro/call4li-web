# GitHub Webhook Setup for Auto-Publishing

This document explains how to set up GitHub Webhook for automatic publishing to Manus.

## What This Does

Every time you push to the `main` branch on GitHub, the webhook will:
1. Notify Manus about the new changes
2. Automatically pull the latest code
3. Create a checkpoint
4. Publish the changes to your live site

## Setup Instructions

### Step 1: Go to GitHub Repository Settings
1. Open your repository: https://github.com/mickykro/call4li-landing
2. Click **Settings** (top menu)
3. Click **Webhooks** (left sidebar)
4. Click **Add webhook**

### Step 2: Configure the Webhook

Fill in these fields:

**Payload URL:**
```
https://api.manus.im/webhooks/github/publish
```

**Content type:**
- Select: `application/json`

**Events:**
- Select: `Just the push event`

**Active:**
- Check the box ✓

### Step 3: Add Secret (Optional but Recommended)

1. Generate a random secret (or use this): `call4li_webhook_secret_2026`
2. Paste it in the **Secret** field
3. Click **Add webhook**

### Step 4: Test the Webhook

1. Make a small change to your code
2. Commit and push to `main`
3. Go back to the webhook settings
4. Scroll down to **Recent Deliveries**
5. You should see a green checkmark ✓

## How to Verify It's Working

After pushing to GitHub:
1. Check the **Recent Deliveries** tab in webhook settings
2. You should see a successful delivery (green checkmark)
3. Check your Manus dashboard - a new checkpoint should appear within 30 seconds
4. Your site should update automatically

## Troubleshooting

**Webhook shows red X (failed):**
- Check the payload URL is correct
- Verify your repository is public
- Check GitHub's webhook logs for error details

**Changes not appearing on the site:**
- Wait 30-60 seconds for the webhook to process
- Check that you pushed to the `main` branch (not another branch)
- Verify the webhook is active in settings

## Manual Alternative

If the webhook fails, you can still manually update:
1. Make changes and push to GitHub
2. Ask me to sync: "Pull latest changes from GitHub"
3. I'll fetch and publish manually

---

**Questions?** Let me know if you need help setting this up!
