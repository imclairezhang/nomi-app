# Nomi - AI-Powered Food Discovery

## Deploy to Vercel (Step-by-Step)

### Step 1: Download this folder
Download and unzip the `nomi-app` folder to your computer.

### Step 2: Create a GitHub account (if you don't have one)
Go to https://github.com and sign up (free).

### Step 3: Upload code to GitHub
1. Go to https://github.com/new
2. Name your repository: `nomi-app`
3. Keep it Public
4. Click "Create repository"
5. On the next page, click "uploading an existing file"
6. Drag and drop ALL files from the nomi-app folder
7. Click "Commit changes"

### Step 4: Deploy on Vercel
1. Go to https://vercel.com
2. Click "Sign Up" → "Continue with GitHub"
3. Authorize Vercel to access your GitHub
4. Click "Add New Project"
5. Find `nomi-app` and click "Import"
6. Keep all settings as default
7. Click "Deploy"
8. Wait 1-2 minutes...
9. 🎉 Your site is live at: `nomi-app.vercel.app`

### Step 5: Add Custom Domain (Optional)
1. Buy a domain (nomi.ai, getnomi.com, etc.) from:
   - https://namecheap.com (~$10/year)
   - https://porkbun.com (~$9/year)
   
2. In Vercel dashboard:
   - Go to your project → Settings → Domains
   - Type your domain (e.g., nomi.ai)
   - Click "Add"
   
3. Vercel will show you DNS settings. Go to your domain registrar and:
   - Add an A record: `76.76.21.21`
   - Add a CNAME record: `cname.vercel-dns.com`
   
4. Wait 5-10 minutes for DNS to propagate
5. ✅ Your site is now live at your custom domain!

---

## Project Structure
```
nomi-app/
├── app/
│   ├── globals.css      # Tailwind styles
│   ├── layout.js        # SEO & metadata
│   └── page.js          # Main app code
├── package.json         # Dependencies
├── next.config.js       # Next.js config
├── tailwind.config.js   # Tailwind config
├── postcss.config.js    # PostCSS config
└── README.md            # This file
```

## Tech Stack
- Next.js 14
- React 18
- Tailwind CSS
- Lucide Icons

## Need Help?
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
