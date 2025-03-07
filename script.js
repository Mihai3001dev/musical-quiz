// Array of questions for quiz
const questions = [
    {
        question: "What is your mood?",
        options: ["Happy", "Relaxed", "Energetic", "Bored"],
    },
    {
        question: "What kind of music do you like?",
        options: ["Pop", "Rap", "Hip-Hop", "Dance"],
    },
];

let currentQuestionIndex = 0;
let userAnswers = [];


// Manipulating elements in DOM
const modal = document.getElementById("quizModal");
const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");

// Open quiz modal

function openModal() {
    modal.style.display = "flex";
    setTimeout(() => {
        modal.style.opacity = "1";
    }, 100);
    loadQuestion();
}
// Creating new class to map mood and genre to images
class ImageMap {
    constructor() {
        this.map = {
            "Happy": "assets/images/happy.png",
            "Relaxed": "assets/images/relaxed.png",
            "Energetic": "assets/images/energetic.png",
            "Bored": "assets/images/bored.png",
            "Pop": "assets/images/pop-music.png",
            "Rap": "assets/images/rap-music.png",
            "Hip-Hop": "assets/images/hip-hop-music.png",
            "Dance": "assets/images/dance-music.png"
        };
    }

    getImage(option) {
        return this.map[option] || "images/default.png";
    }
}

const imageMap = new ImageMap();


// Loads current question and options
function loadQuestion() {
    questionText.style.opacity = 0;
    optionsContainer.style.opacity = 0;

    setTimeout(() => {
        const currentQuestion = questions[currentQuestionIndex];

        questionText.textContent = currentQuestion.question;
        optionsContainer.innerHTML = "";

        currentQuestion.options.forEach((option) => {
            const button = document.createElement("button");
            button.classList.add("optionButton");

            const img = document.createElement("img");
            img.src = imageMap.getImage(option);
            img.alt = option;
            img.classList.add("optionImage");

            const text = document.createElement("span");
            text.textContent = option;

            button.appendChild(img);
            button.appendChild(text);

            button.onclick = function () {
                handleAnswer(option);
            };

            optionsContainer.appendChild(button);
        });

        questionText.style.opacity = 1;
        optionsContainer.style.opacity = 1;
    }, 300);
}
// Close modal
function closeModal() {
    modal.style.opacity = "0";
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
    currentQuestionIndex = 0;
    userAnswers = [];
}
// Close modal when "Esc" key is presssed
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});
// Processes user's answer and moves to next question or fetches playlist
function handleAnswer(answer) {
    userAnswers.push(answer);

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        fetchYouTubePlaylist();
    }
}
// Fetch YouTybe playlist based on user's answers
function fetchYouTubePlaylist() {
    const mood = userAnswers[0];
    const genre = userAnswers[1];

    const url = `http://localhost:5000/youtube-playlist?mood=${encodeURIComponent(mood)}&genre=${encodeURIComponent(genre)}`;

    console.log('Fetching playlist for:', mood, genre);  

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.playlistUrl) {
                showFinalMessage(data.playlistUrl);
            } else {
                console.warn("No playlist found!");
                showFinalMessage(null);
            }
        })
        .catch((error) => {
            console.error("Error fetching YouTube data:", error);
            showFinalMessage(null);
        });
}

// Shows the user final message after finishing quiz
function showFinalMessage(playlistUrl) {
    questionText.style.opacity = 0;
    optionsContainer.style.opacity = 0;

    setTimeout(() => {
        questionText.innerHTML = "Looking for your playlist!";
        optionsContainer.innerHTML = `<img src="assets/images/loading.gif" alt="Loading..." class="loadingImage">`;

        questionText.style.opacity = 1;
        optionsContainer.style.opacity = 1;
    }, 300);

    setTimeout(() => {
        questionText.innerHTML = "Quiz Completed!";
        optionsContainer.innerHTML = "";

        if (playlistUrl) {
            optionsContainer.innerHTML = `
                <p>Your recommended playlist:</p>
                <a href="${playlistUrl}" target="_blank" class="playlistLink">Listen Now</a>
            `;
        } else {
            optionsContainer.innerHTML = `<p>Sorry, no playlist found! Try again later.</p>`;
        }
    }, 3000);
}
