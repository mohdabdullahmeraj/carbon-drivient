# 🌱 DRIVIENT – Track Your Carbon. Drive Change.

> A web-based carbon footprint tracker that empowers individuals and communities to reduce emissions through real-time data, social challenges, and habit-forming nudges.

## 🛠️ Tech Stack

### 🔹 Front-End
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-000000?style=for-the-badge&logo=figma&logoColor=white)

### 🔹 Back-End
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-%231572B6?style=for-the-badge&logo=lock&logoColor=white)

### 🔹 Database
![MySQL](https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)

### 🔹 API Integration
![Carbon Interface](https://img.shields.io/badge/Carbon_Interface_API-0A0A0A?style=for-the-badge&logo=data&logoColor=white)

---

## 📌 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [How It Works](#how-it-works)
- [Feasibility & Challenges](#feasibility--challenges)
- [Getting Started](#getting-started)
- [API Integration](#api-integration)
- [Future Scope](#future-scope)

---

## 🌍 Introduction

People often underestimate the carbon impact of their daily travel. Especially in urban areas, short trips add up — and so do their emissions. **Drivient** bridges the awareness gap with a solution designed for **impact, engagement, and growth**.

<details>
  <summary><strong>🧠 Innovation Highlights</strong></summary>

- 💬 **Community-Based Challenges** – Foster collective action through shared eco-goals.
- ⏱️ **Real-Time Carbon Tracking** – Instant feedback on the environmental impact of every trip.
- 🎯 **Collaborative Goal Setting** – Set and join community challenges for motivation and accountability.
- 🔔 **Habit-Building Nudges** – Get reminders, eco-tips, and milestone celebrations.
- 🧘 **Eco-Inspired UI** – Minimalist and calming design that reflects sustainability values.
- 🔧 **Modular Architecture** – Built to scale with future integrations and evolving user needs.
- 🌱 **Empowering Action** – Shift from “my actions don’t matter” to “every small step counts.”
</details>

---

## ✨ Features

| Feature                     | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| 🌿 Carbon Tracking         | Uses real-time data via Carbon Interface API to calculate emissions.       |
| 📊 Dashboard               | Visualize daily, weekly, and trip-based emissions.                         |
| 🧑‍🤝‍🧑 Community Challenges | Join or create eco-goals and track collective progress.                     |
| 🔔 Habit Nudges            | Get tips, reminders, and motivation to stay consistent.                    |
| 🧘 Eco UI                  | Minimal, nature-inspired design focused on clarity and calm.               |
| 📈 Trip History            | Compare and reflect on past journeys to improve your eco habits.           |

---

## 🛠️ Tech Stack

| Layer        | Technologies Used                                                                 |
|--------------|-------------------------------------------------------------------------------------|
| **Front-End**| React.js, Vite, Figma (for prototyping)                                             |
| **Back-End** | Node.js, Express.js, JWT (httpOnly cookies), Bcrypt                                 |
| **Database** | MySQL, Sequelize ORM                                                                |
| **APIs**     | [Carbon Interface API](https://www.carboninterface.com/) for real-world emission data|

---

## ⚙️ How It Works

1. **Trip Entry:** Users log their vehicle trips.
2. **Emission Calculation:** Data is sent to the Carbon Interface API.
3. **Real-Time Feedback:** Users get immediate insight into their carbon footprint.
4. **Community Challenges:** Users can join public or private goals to stay motivated.
5. **Behavioral Nudging:** The system sends milestone rewards, eco-reminders, and trends.

---

## 🔍 Feasibility & Challenges

<details>
  <summary><strong>Click to View</strong></summary>

### ✅ Feasibility

- Backed by existing, accessible technology.
- Simple onboarding and intuitive UI for easy adoption.
- High alignment with eco-conscious user interests and trends.

### ⚠️ Challenges & Solutions

| Challenge                         | Strategy                                                                 |
|----------------------------------|--------------------------------------------------------------------------|
| Drop in user engagement          | Introduce streaks, rewards, gamified UI                                  |
| Inaccurate input data            | Use dropdowns, default values, and validations                           |
| Internet/device accessibility    | Optimize for low-bandwidth and offline usage                             |
| Behavior change resistance       | Provide tips, education, and positive reinforcement                      |
| Cross-device compatibility       | Conduct thorough responsive and cross-platform testing                   |
| Monetization                     | Offer premium features, sponsor integration, or branded community events |

</details>

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- MySQL
- Carbon Interface API Key

---

## 🔗 API Integration

> **Carbon Interface API** is used to calculate emissions based on real-world vehicle data.

- 📄 **Docs:** [carboninterface.com/docs](https://www.carboninterface.com/docs)
- 🔐 API secured with server-side requests only
- 🔑 Access controlled via **JWT tokens** stored in **httpOnly cookies**

---

## 🌱 Future Scope

- 📱 Mobile App (React Native or Flutter)
- 🌍 Public Impact Leaderboard
- 🗺️ Integration with Maps for auto-logging trips
- 🎁 Rewards through partnerships (eco-points, discounts)
- 💳 Carbon Offset Donations via Stripe or Plaid
