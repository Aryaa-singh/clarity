# Clarity

**Clarity** is a privacy-first, offline-capable web application designed to help you think clearly. It helps you reduce mental noise, make complex decisions, and deepen your understanding of difficult topics.

![Clarity App](./public/bg.png)

## ✨ Features

### 1. What Actually Matters? (Filter Mode)
Overwhelmed by tasks or worries? This mode helps you filter them down to the essential few.
- Capture all your thoughts.
- interactively select your **Top 3** priorities.
- Focus only on what moves the needle.

### 2. Decision Decomposer (Decision Mode)
Struggling with a hard choice? Break it down logically.
- Define your options.
- Set weighted criteria (e.g., "Salary" vs. "Commute").
- Rate each option.
- See a visual, data-backed result of your best choice.

### 3. Teach It Back (Feynman Technique)
The best way to learn is to teach.
- Choose a topic you want to understand.
- Explain it at three levels: **Simple** (Level 1), **Practical** (Level 2), and **Expert** (Level 3).
- Identify gaps in your knowledge.

## 🔒 Privacy First
Clarity is designed with a strict privacy-first philosophy:
- **0% Data Collection**: We do not have servers. We do not track you.
- **Local Storage**: All your data is saved locally in your browser's `localStorage`.
- **Offline Capable**: Works perfectly without an internet connection.

## 🛠️ Tech Stack
- **Framework**: React + TypeScript + Vite
- **Styling**: Vanilla CSS (CSS Variables, Glassmorphism)
- **State**: React Hooks + LocalStorage Persistence
- **Icons**: Custom SVG Components

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/clarity.git
    cd clarity
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run locally**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```


## 🚀 How to Host (Free & Fast)

We recommend **Vercel** or **Netlify** for hosting. They are free for personal use and support this tech stack out of the box.

1.  **Create a GitHub Repository**:
    - Go to GitHub and create a new repository named `clarity`.
    - Push your code (see below).

2.  **Deploy on Vercel**:
    - Go to [Vercel.com](https://vercel.com) and sign up.
    - Click **"Add New Project"**.
    - Select "Import from GitHub" and choose your `clarity` repo.
    - Click **"Deploy"**. (Vercel automatically detects the Vite settings).

## 📈 Analytics & Metrics

To track your visitors without compromising user privacy (no cookies, no GDPR banners needed):

1.  **Use Vercel Analytics**:
    - In your Vercel Project Dashboard, go to the "Analytics" tab.
    - Click "Enable".
    - **Metric to watch**: `Unique Visitors`. This tells you how many actual people are using your tool.

## 📄 License
MIT License. Feel free to use this code for your own projects.
