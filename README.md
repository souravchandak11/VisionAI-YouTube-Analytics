
# 📊 VisionAI: YouTube Engagement Prediction & Analytics

VisionAI is a premium data analysis product designed to empower YouTube content creators. It combines comprehensive historical analytics with a predictive machine learning engine to simulate video performance before you hit "Upload."

![Live Demo](https://img.shields.io/badge/Live-Demo-red?style=for-the-badge) ![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Recharts%20%7C%20FramerMotion-blue?style=for-the-badge)

## 🎯 Project Objective
The goal of this project is to demonstrate **High-Agency Data Analysis**: moving beyond static charts to create an interactive tool that provides actionable ROI. It solves the problem of "Content Uncertainty" by using historical data patterns to predict future engagement.

---

## 🚀 Key Features

### 1. Machine Learning Prediction Engine
*   **Weighted Scoring Model**: Uses a custom multivariate algorithm to predict an engagement score (0-100).
*   **Feature Importance Visualization**: Transparently shows how each variable (category, duration, thumbnail, etc.) impacts the prediction.
*   **Real-time Optimization Tips**: Generates dynamic feedback (e.g., "Increase title length to 40-60 characters for better CTR").

### 2. Comprehensive Analytics Dashboard
*   **KPI Visualization**: Real-time tracking of Views, Likes, Comments, Engagement %, and Retention %.
*   **Trend Identification**: Automated detection of "Optimal Upload Times" and "Best Performing Categories."
*   **Multidimensional Analysis**: 
    *   **Bar Charts**: Category performance benchmarking.
    *   **Line Charts**: Day-of-week engagement trends.
    *   **Scatter Plots**: Visualizing the correlation between Video Duration and Engagement Rate.

### 3. Data Engineering
*   **Synthetic Dataset**: Powered by 1,000 programmatically generated records with realistic Gaussian-distributed metrics and intentional correlations (e.g., Evening uploads perform +12% better).
*   **Data Export**: Integrated CSV export functionality for further analysis in Python/SQL.

---

## 🧪 Methodology & Statistical Model

### Data Generation Philosophy
The dataset replicates real-world YouTube niche dynamics.
*   **Base Multipliers**: Categories like "Tech Review" and "Tutorial" are weighted with a +30% higher reach.
*   **Interaction Decay**: Likes and Comments are modeled as a percentage of views, with decay factors based on video duration.

### Model Coefficients
| Feature | Weight (Coefficient) |
| :--- | :--- |
| **Custom Thumbnail** | +25.0 |
| **Category (Tech/Tutorial)** | +15.0 to +12.0 |
| **Upload Time (Evening)** | +12.0 |
| **Duration (8-12 min)** | +8.0 |
| **End Screens** | +5.0 |

---

## 🛠️ Technical Implementation

*   **Frontend**: React.js with Vite for high-performance rendering.
*   **Visualizations**: Recharts (Custom SVG-based responsive charts).
*   **Styling**: Modern CSS with Glassmorphism and UI/UX best practices.
*   **Animations**: Framer Motion for smooth state transitions.

---

## 📈 Portfolio Impact
This project demonstrates skills critical for **Data Analyst** and **Data Product Manager** roles:
1.  **Exploratory Data Analysis (EDA)**: Visualizing complex relationships.
2.  **Predictive Modeling**: Building a functional forecasting tool.
3.  **Communication**: Turning technical data into actionable business insights.
4.  **Full-Stack Thinking**: Building a tool that users actually want to interact with.

---

## 🚦 Getting Started

1.  Clone the repository
2.  Install dependencies: `npm install`
3.  Run the development server: `npm run dev`
4.  Export the data: Use the "Export Data" button in the dashboard to get the raw CSV for your own SQL/Python analysis.

---
Created with ❤️ for the Data Analysis Community.
