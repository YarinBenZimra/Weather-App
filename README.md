# Weather App

Welcome to the **Weather App**! This project is a full-stack application consisting of a server and a React-based frontend UI. Follow the instructions below to install and run the project.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
  - [Step 1: Clone the Repository](#step-1-setup-the-project)
  - [Step 2: Setup the Server](#step-2-setup-the-server)
  - [Step 3: Setup the weather-app-UI](#step-3-setup-the-weather-app-UI)
  - [Step 4: Run the Server and the UI](#step-4-run-the-server-and-the-ui)
- [Logs](#logs)
- [Notes](#notes)
- [Troubleshooting](#troubleshooting)
- [Summary](#Summary-Of-The-Commands-To-Run-The-App)

---

## Prerequisites

Make sure you have the following installed on your system:

1. [Node.js](https://nodejs.org/) (version 14 or later)
2. [Git](https://git-scm.com/)

---

## Installation and Setup

### Step 1: Setup the Project

#### Clone the Repository

To get started, clone the project from GitHub using the following command:

```bash
   git clone https://github.com/YarinBenZimra/Weather-App.git
```

#### Navigate to the project folder:

```bash
  cd Weather-App
```

Inside the Weather-App folder, you'll find two subfolders:
server (backend)
weather-app-UI (frontend)

### Step 2: Setup the Server

#### Navigate to the server folder:

```bash
  cd server
```

##### Install the dependencies:

```bash
 npm install
```

#### Create a .env and Add the following line to the .env file: WEATHER_API_KEY=4697756525714ec3bbb123718242711:

```bash
  echo WEATHER_API_KEY=4697756525714ec3bbb123718242711 > .env
```

### Step 3: Setup the weather-app-UI

#### Navigate to the weather-app-UI folder:

```bash
 cd ../weather-app-UI
```

##### Install the dependencies:

```bash
 npm install
```

### Step 4: Run the Server and the UI

Now you're ready to start the server and the frontend UI.

#### Open a terminal window and navigate to the project folder.

##### Navigate to the server folder and start the server

```bash
  cd server
  node server.js
```

The server will run at: http://localhost:5000

#### Open a **new** terminal window (keep the server running in the previous one), and navigate to the project folder.

##### Navigate to the weather-app-UI folder and start the react-app:

```bash
  cd weather-app-UI
  npm start
```

The frontend will run at: http://localhost:3000

## Logs

All server logs, including requests and errors, will be saved in the server/logs directory. Check this directory if you want to debug or monitor server activity.

## Notes

### Running Server and UI Simultaneously:

Since the server and the UI are separate applications, you need two terminal windows to run them:

- One for the server.
- One for the UI.

### Environmental Variables:

Ensure the .env file is correctly set up in the server folder. Without the WEATHER_API_KEY, the app will not function.

## Troubleshooting:

If the app doesn't start, make sure:

- Node.js and npm are installed.
- Check the server/logs folder for any error logs.
- Verify the .env file in the server folder has the correct API key.

## Summary Of The Commands To Run The App:

```bash
    # Clone the repository
    git clone https://github.com/YarinBenZimra/Weather-App.git
    cd Weather-App

    # Setup and run the server
    cd server
    npm install
    touch .env
    echo WEATHER_API_KEY=4697756525714ec3bbb123718242711 > .env
    node server.js

    # Open a ***new*** terminal- Nevigate to the project folder and setup/run the frontend
    cd weather-app-UI
    npm install
    npm start
```
