# Nomi - AI Food Companion

Your AI food companion that tracks nutrition, ranks restaurants, and knows exactly what you'll love.

## Features

### 🍽️ Diet Tracker
- Set daily calorie and protein goals
- Log meals with quick-add from saved favorites
- Track remaining budget in real-time

### 🏆 Restaurant Ranking
- Add restaurants you've visited
- Compare to rank ("Is this better than your #1?")
- View ranked list with scores

### 🤖 AI Recommendations
- Enter your location
- Get personalized suggestions based on:
  - Calories remaining
  - Your taste profile
  - Cuisine preferences
- Powered by Claude API

### ❤️ Taste Profile
- Auto-generated from your rankings
- Shows top cuisines, average price preference, return rate

## Setup

### Option 1: Deploy to Vercel (Recommended)

1. **Push to GitHub**
   - Create a new repo at github.com/new
   - Upload all files (ensure `app/` folder is at root level)
   - Commit

2. **Deploy on Vercel**
   - Go to vercel.com
   - Sign in with GitHub
   - Import your repository
   - Click Deploy

3. **Done!** Your site will be live at `your-repo.vercel.app`

### Option 2: Run Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## AI Features Setup

To use AI recommendations:

1. Get an API key from [console.anthropic.com](https://console.anthropic.com)
2. In the app, go to Settings
3. Paste your API key
4. Your key is stored locally and never sent to any server

## Tech Stack

- **Framework:** Next.js 14
- **UI:** React 18, Tailwind CSS
- **Icons:** Lucide React
- **Storage:** localStorage (all data stays on device)
- **AI:** Anthropic Claude API

## Privacy

All your data is stored locally in your browser:
- Meal logs
- Restaurant rankings
- Diet goals
- API key

Nothing is sent to any server except AI recommendation requests (which go directly to Anthropic's API).

## License

MIT
