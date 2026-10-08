# 🌿 TrailMate

### Go Outside. AI Will Wait.

TrailMate is an AI-powered outdoor companion built for the **Hacktoberfest Open-Source AI Challenge — Touch Grass**.

Instead of keeping people glued to an AI chatbot, TrailMate uses AI to encourage users to **leave the screen, explore their surroundings, complete outdoor missions, and discover something new.**

> 🌎 The goal is simple: **make the screen the shortest part of the experience.**

---

## 🚀 What is TrailMate?

Most AI applications are designed to keep you on your screen.

TrailMate does the opposite.

It gives you an outdoor mission, starts an adventure timer, lets you document discoveries, and calculates a **Touch Grass Score** based on how much time you spend exploring.

### Example mission

> 🌳 Take a 20-minute walk.  
> Find two different trees.  
> Find something you've never noticed before.

The user completes the mission in the real world and only returns to the app when necessary.

---

## ✨ Features

### 🌿 Outdoor Missions

TrailMate generates simple real-world challenges such as:

- Find three different leaves
- Take a 20-minute walk
- Listen for five minutes
- Find something moving
- Find a hidden detail
- Find something beautiful

---

### ⏱️ Outdoor Timer

Track how long you've been outside.

The timer is designed to encourage users to spend more time exploring and less time interacting with the application.

---

### 📷 Discovery Scanner

Users can photograph something interesting they discover outside.

The current version provides the interface for connecting an AI vision model.

The planned AI pipeline is:

```text
Photo
   ↓
Open-Weight Vision Model
   ↓
Object / Plant / Bird Recognition
   ↓
Interesting Explanation
   ↓
New Outdoor Mission