# Sunset Detector Frontend

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)

  * [Frontend](#frontend)
  * [Communication](#communication)
  * [Styling](#styling)
* [Project Overview](#project-overview)
* [Application Preview](#application-preview)
* [Folder Structure](#folder-structure)
* [Installation](#installation)

  * [1. Clone the repository](#1-clone-the-repository)
  * [2. Install dependencies](#2-install-dependencies)
  * [3. Configure environment variables](#3-configure-environment-variables)
* [Running the Project](#running-the-project)

  * [Development](#development)
  * [Production Build](#production-build)
  * [Preview Production Build](#preview-production-build)
* [Environment Variables](#environment-variables)
* [Data Format](#data-format)
* [Real-Time MQTT Integration](#real-time-mqtt-integration)

  * [MQTT Workflow](#mqtt-workflow)
* [REST API Integration](#rest-api-integration)
* [LED Control System](#led-control-system)

  * [MQTT Command Topic](#mqtt-command-topic)
  * [Example Payload](#example-payload)
* [Components](#components)

  * [CurrentColor](#currentcolor)
  * [GradientTimeline](#gradienttimeline)
  * [HistoricalChart](#historicalchart)
  * [RGBChart](#rgbchart)
  * [LedControls](#ledcontrols)
* [Custom Hooks](#custom-hooks)

  * [useSensorData](#usesensordata)
* [Styling Philosophy](#styling-philosophy)
* [Performance Considerations](#performance-considerations)
* [Future Improvements](#future-improvements)
* [Deployment](#deployment)
* [Development Scripts](#development-scripts)
* [Dependencies](#dependencies)

  * [Main Dependencies](#main-dependencies)
* [Development Notes](#development-notes)
* [License](#license)
* [Author](#author)
* [Acknowledgements](#acknowledgements)
* [Summary](#summary)

---

# Sunset Detector Frontend

A modern React dashboard for visualizing real-time atmospheric light conditions, sky colors, and sunset transitions using live sensor data from an ESP32-based IoT system.

The application combines historical API data with live MQTT updates to create a responsive and visually rich monitoring interface for environmental sensing.

---

# Features

* Real-time sky color visualization
* Live MQTT sensor updates
* Historical light and color analysis
* Interactive RGB and Lux/CCT charts
* Sunset detection indicators
* LED remote control integration
* Responsive UI
* Gradient timeline visualization for daily sky transitions
* Vite-powered fast development environment

---

# Tech Stack

## Frontend

* React 19
* Vite
* Chart.js
* react-chartjs-2
* Recharts
* MQTT.js

## Communication

* REST API
* MQTT over WebSockets

## Styling

* CSS3
* Responsive layout
* Custom animations and gradients

---

# Project Overview

The dashboard receives environmental sensor data from an external backend/API and visualizes:

* Lux values
* Correlated Color Temperature (CCT)
* RGB sky color data
* Sunset state detection
* Historical atmospheric transitions

The frontend:

1. Fetches historical data from the API
2. Subscribes to MQTT topics for real-time updates
3. Updates the interface live without page refreshes
4. Displays dynamic visualizations and timelines
5. Sends LED control commands back to the IoT device

---

# Application Preview

Main dashboard sections:

* Hero section with dashboard introduction
* Current sky color display
* Today's sky gradient timeline
* Yesterday's sky gradient timeline
* Historical Lux/CCT chart
* RGB color chart
* LED control panel

---

# Folder Structure

```txt
src/
├── api/
│   └── sensorApi.js
│
├── components/
│   ├── CurrentColor.jsx
│   ├── GradientTimeline.jsx
│   ├── HistoricalChart.jsx
│   ├── LedControls.jsx
│   └── RGBChart.jsx
│
├── hooks/
│   └── useSensorData.js
│
├── pages/
│   └── Dashboard.jsx
│
├── styles/
│   └── dashboard.css
│
├── utils/
│   ├── gradientStops.js
│   └── timeUtils.js
│
├── App.jsx
├── main.jsx
├── App.css
└── index.css
```

---

# Installation

## 1. Clone the repository

```bash
git clone <your-repository-url>
cd sunset-detector-frontend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Create a `.env` file in the project root.

Example:

```env
VITE_MQTT_WS_URL=wss://your-broker-url
VITE_MQTT_USER=your-username
VITE_MQTT_PASSWORD=your-password
VITE_MQTT_TOPIC=your/topic/path
```

---

# Running the Project

## Development

```bash
npm run dev
```

The application will start locally using Vite.

Default development URL:

```txt
http://localhost:5173
```

---

## Production Build

```bash
npm run build
```

---

## Preview Production Build

```bash
npm run preview
```

---

# Environment Variables

| Variable             | Description                   |
| -------------------- | ----------------------------- |
| `VITE_MQTT_WS_URL`   | MQTT broker WebSocket URL     |
| `VITE_MQTT_USER`     | MQTT username                 |
| `VITE_MQTT_PASSWORD` | MQTT password                 |
| `VITE_MQTT_TOPIC`    | MQTT topic for sensor updates |

---

# Data Format

The frontend expects sensor data in the following structure:

```json
{
  "timestamp": "2026-05-29T19:30:00Z",
  "lux": 420,
  "cct": 3800,
  "rgb": {
    "r": 255,
    "g": 120,
    "b": 80
  },
  "isSunset": true
}
```

The application automatically normalizes incoming data and generates:

* `skyColor`
* RGB fallback values
* timestamp fallback
* sunset state fallback

---

# Real-Time MQTT Integration

The dashboard uses MQTT over WebSockets for live updates.

## MQTT Workflow

1. Connect to MQTT broker
2. Authenticate using environment variables
3. Subscribe to the configured sensor topic
4. Parse incoming JSON payloads
5. Update UI state instantly

Example MQTT payload:

```json
{
  "lux": 215,
  "cct": 3500,
  "rgb": {
    "r": 255,
    "g": 160,
    "b": 90
  },
  "timestamp": "2026-05-29T20:10:00Z"
}
```

---

# REST API Integration

Historical sensor data is loaded from:

```txt
https://sky-api-production-9cec.up.railway.app/api/data
```

Example request:

```txt
GET /api/data?hours=48
```

The frontend initially fetches historical data before live MQTT updates begin.

---

# LED Control System

The dashboard can send LED commands back to the connected IoT device.

## MQTT Command Topic

```txt
lnu/iot/ss226uk/command/led
```

## Example Payload

Turn LED on:

```json
{
  "state": true
}
```

Turn LED off:

```json
{
  "state": false
}
```

---

# Components

## CurrentColor

Displays:

* Current sky color
* Lux value
* CCT value
* Sunset detection status

Uses dynamic gradient backgrounds for immersive visualization.

---

## GradientTimeline

Visualizes atmospheric color transitions throughout the day.

Features:

* Smooth gradient interpolation
* Today vs yesterday comparison
* Dynamic real-time timeline updates

---

## HistoricalChart

Displays:

* Lux trends
* CCT trends
* Dual-axis chart visualization

Built with Chart.js.

---

## RGBChart

Displays RGB channel changes over time.

Tracks:

* Red channel
* Green channel
* Blue channel

Useful for visual atmospheric analysis.

---

## LedControls

Simple interface for:

* Turning LED on
* Turning LED off

Commands are sent through MQTT.

---

# Custom Hooks

## useSensorData

Handles:

* API fetching
* MQTT connection
* Live updates
* Data normalization
* LED command publishing
* State management

This hook acts as the core data layer of the application.

---

# Styling Philosophy

The UI is designed with:

* Soft gradients
* Glassmorphism effects
* Ambient glow effects
* Smooth transitions
* Minimalist layout
* Atmospheric visual feedback

The goal is to visually mirror the changing sky conditions being measured.

---

# Performance Considerations

The application includes several optimizations:

* Data entry limits (`MAX_ENTRIES`)
* Memoized gradient calculations
* Lightweight chart rendering
* Disabled chart animations for real-time performance
* Efficient MQTT updates

---

# Future Improvements

Potential future features:

* Authentication system
* Device management dashboard
* Multi-sensor support
* Weather API integration
* Dark/light theme toggle
* Mobile PWA support
* Advanced analytics
* Alert system for sunset events
* Historical comparison views

---

# Deployment

The project can be deployed to:

* Vercel
* Netlify
* Railway
* Firebase Hosting
* GitHub Pages

Example Vercel deployment:

```bash
npm run build
```

Deploy the generated `dist/` folder.

---

# Development Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

---

# Dependencies

## Main Dependencies

```json
{
  "chart.js": "^4.5.1",
  "mqtt": "^5.15.1",
  "react": "^19.2.6",
  "react-chartjs-2": "^5.3.1",
  "react-dom": "^19.2.6",
  "recharts": "^3.8.1"
}
```

---

# Development Notes

* Built using functional React components
* Uses React Hooks throughout the application
* Vite provides fast HMR and optimized builds
* MQTT is handled client-side through WebSockets
* Time formatting uses Stockholm timezone utilities

---

# License

This project is licensed under the MIT License.

---

# Author

Developed as an IoT visualization dashboard for atmospheric and sunset sensing.

By Smilla Sollén

---

# Acknowledgements

Libraries and tools used:

* React
* Vite
* Chart.js
* MQTT.js
* Recharts
* ESP32 ecosystem

---

# Summary

Sunset Detector Frontend is a real-time atmospheric visualization dashboard that combines IoT sensing, live MQTT communication, and modern frontend technologies to create an immersive environmental monitoring experience.
