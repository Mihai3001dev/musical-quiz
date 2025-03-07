
# Musical Quiz - Playlist Generator

Musical Quiz is an interactive web application that helps you find the perfect music playlist based on your mood and favorite music genre. The user answers a few questions, and the app uses the YouTube API to suggest a personalized playlist.



## Features

- A quiz with two questions about your mood and music genre preferences.
- Integration with the YouTube Data API to generate a playlist based on your answers.



## Prerequisites

Before starting, ensure you meet the following requirements:

- [Node.js](https://nodejs.org/) installed on your machine.
- [Google Cloud account](https://cloud.google.com/) to set up YouTube Data API v3.



## 1. Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Mihai3001dev/musical-quiz.git
   ```

2. Navigate to the project directory:
   ```bash
   cd musical-quiz
   ```

3. Install the necessary frontend dependencies:
   ```bash
   npm install
   ```



## 2. Backend Setup

### 2.1 Set up YouTube API

Before running the backend, you need to configure your YouTube API key:

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project.
3. Enable **YouTube Data API v3** for your project.
4. Go to **Credentials** and create an API key.

Add the API key in the `.env` file located in the `backend/` folder:

```env
YOUTUBE_API_KEY=your_youtube_api_key_here
```

### 2.2 Running the Backend Server

1. In your terminal, navigate to the `backend/` directory:
   ```bash
   cd backend
   ```

2. Install the necessary backend dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   node server.js
   ```

   The server will run on `http://localhost:5000`.




## 3. Running the Frontend

1. Navigate back to the frontend directory:
   ```bash
   cd ..
   ```

2. Open the `index.html` file in your browser:
   ```bash
   open index.html
   ```

3. The quiz will be available in the browser, and you can start answering the questions!




## How the App Works

### Frontend:

- The user answers two questions about their mood and music genre preferences.
- After completing the quiz, the app sends the answers to the backend server.

### Backend:

- The backend server takes the answers and creates a query to the YouTube API to find a playlist that matches the criteria.
- The server responds with a link to the YouTube playlist, which the user can open and listen to.



## Troubleshooting

If you encounter issues with fetching the playlist, make sure:

- You have a valid API key in the `.env` file.
- The backend server is running and accessible at `http://localhost:5000`.



## Contributions

If you want to contribute to this project, feel free to fork the repository and submit a pull request. Please make sure to follow the coding standards and write tests if necessary.



