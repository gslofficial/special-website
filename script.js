/* =========================================
   ANSWERS
========================================= */

const answers = {
    food: "",
    place: "",
    vibe: "",
    color: ""
};


/* =========================================
   SCREEN CONTROL
========================================= */

function nextScreen(screenId) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(screenId);

    if (target) {
        target.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   ENVELOPE
========================================= */

const envelope = document.getElementById("envelope");

envelope.addEventListener("click", () => {

    envelope.classList.add("open");

    setTimeout(() => {
        nextScreen("welcomeScreen");
    }, 1100);

});


/* =========================================
   FAVORITE CHOICES
========================================= */

function selectChoice(type, value, currentScreen, nextScreenId) {

    answers[type] = value;

    showToast(`${value}... cute choice 💕`);

    setTimeout(() => {
        nextScreen(nextScreenId);
    }, 500);
}


/* =========================================
   QUIZ
========================================= */

const quizQuestions = [

    "Would you go for a cute food date with me? 🍕💕",

    "If I remembered your favorite song, would that earn me a smile? 🎧😊",

    "Would you let me try to make you laugh on a bad day? 🌸",

    "If I asked you to hang out sometime, would you be up for it? 👀",

    "Do you think we could have a little something special? 💗",

    "Would you give me a chance to get to know you better? 🥺💕"

];

const quizImages = [

    "https://cdn.pixabay.com/photo/2022/10/13/14/05/anime-7516341_1280.jpg",

    "https://cdn.pixabay.com/photo/2024/02/09/18/10/ai-generated-8568796_1280.jpg",

    "https://cdn.pixabay.com/photo/2022/10/13/14/05/anime-7516341_1280.jpg",

    "https://cdn.pixabay.com/photo/2024/02/09/18/10/ai-generated-8568796_1280.jpg",

    "https://cdn.pixabay.com/photo/2022/10/13/14/05/anime-7516341_1280.jpg",

    "https://cdn.pixabay.com/photo/2024/02/09/18/10/ai-generated-8568796_1280.jpg"

];

let currentQuestion = 0;
let yesAnswers = 0;


function startQuiz() {

    currentQuestion = 0;
    yesAnswers = 0;

    nextScreen("quizScreen");

    showQuestion();
}


function showQuestion() {

    const question = document.getElementById("quizQuestion");
    const number = document.getElementById("quizNumber");
    const image = document.getElementById("quizImage");
    const reaction = document.getElementById("quizReaction");

    question.textContent = quizQuestions[currentQuestion];

    number.textContent =
        `Question ${currentQuestion + 1} / ${quizQuestions.length}`;

    image.src = quizImages[currentQuestion];

    reaction.textContent = "";

    question.style.animation = "none";

    setTimeout(() => {
        question.style.animation = "screenIn .4s ease";
    }, 20);
}


/* =========================================
   QUIZ ANSWER
========================================= */

function answerQuiz(isYes) {

    const reaction = document.getElementById("quizReaction");

    if (isYes) {

        yesAnswers++;

        const reactions = [
            "Awww... I was hoping for that answer 💕",
            "Okayyy, that made me smile 😭💗",
            "Noted... very interesting 👀💕",
            "You're making this little website worth it 🌸",
            "Okay, now I'm blushing 😂💗",
            "That answer is going straight into my heart 💕"
        ];

        reaction.textContent =
            reactions[currentQuestion];

    } else {

        const reactions = [
            "Fair enough 😄💕",
            "Haha, I had to ask! 🌸",
            "No worries, honest answers are cute too 😊",
            "Okay okay, I respect that 💗",
            "That's completely okay 🌷",
            "Still glad you played along 💕"
        ];

        reaction.textContent =
            reactions[currentQuestion];
    }

    currentQuestion++;

    setTimeout(() => {

        if (currentQuestion < quizQuestions.length) {

            showQuestion();

        } else {

            finishQuiz();

        }

    }, 900);
}


/* =========================================
   FINISH QUIZ
========================================= */

function finishQuiz() {

    document.getElementById("summaryFood").textContent =
        answers.food || "Not chosen";

    document.getElementById("summaryPlace").textContent =
        answers.place || "Not chosen";

    document.getElementById("summaryVibe").textContent =
        answers.vibe || "Not chosen";

    document.getElementById("summaryColor").textContent =
        answers.color || "Not chosen";

    nextScreen("finalScreen");

    createCelebration();
}


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 1500);
}


/* =========================================
   CELEBRATION
========================================= */

function createCelebration() {

    const emojis = [
        "💕",
        "💗",
        "💖",
        "🌸",
        "✨",
        "🦋",
        "🌷"
    ];

    for (let i = 0; i < 28; i++) {

        const item = document.createElement("div");

        item.textContent =
            emojis[Math.floor(Math.random() * emojis.length)];

        item.style.position = "fixed";
        item.style.left = Math.random() * 100 + "%";
        item.style.top = "-30px";
        item.style.fontSize =
            18 + Math.random() * 18 + "px";
        item.style.zIndex = "99";
        item.style.pointerEvents = "none";

        document.body.appendChild(item);

        const duration =
            2500 + Math.random() * 2500;

        item.animate(
            [
                {
                    transform: "translateY(0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform:
                        `translateY(110vh) rotate(${Math.random() * 720 - 360}deg)`,
                    opacity: 0
                }
            ],
            {
                duration: duration,
                easing: "ease-in"
            }
        );

        setTimeout(() => {
            item.remove();
        }, duration);
    }
}


/* =========================================
   RESTART
========================================= */

function restart() {

    answers.food = "";
    answers.place = "";
    answers.vibe = "";
    answers.color = "";

    currentQuestion = 0;
    yesAnswers = 0;

    nextScreen("envelopeScreen");

    document
        .getElementById("envelope")
        .classList.remove("open");
}


/* =========================================
   BACKGROUND FLOATING EFFECT
========================================= */

const floatingSymbols = [
    "💕",
    "✨",
    "🌸",
    "🦋",
    "💗",
    "🌷"
];

setInterval(() => {

    const item = document.createElement("div");

    item.textContent =
        floatingSymbols[
            Math.floor(Math.random() * floatingSymbols.length)
        ];

    item.style.position = "fixed";
    item.style.left = Math.random() * 100 + "%";
    item.style.bottom = "-30px";
    item.style.fontSize =
        14 + Math.random() * 14 + "px";
    item.style.opacity = ".3";
    item.style.pointerEvents = "none";
    item.style.zIndex = "-1";

    document.body.appendChild(item);

    const duration = 5000 + Math.random() * 4000;

    item.animate(
        [
            {
                transform: "translateY(0)",
                opacity: .3
            },
            {
                transform:
                    `translateY(-${window.innerHeight + 100}px)`,
                opacity: 0
            }
        ],
        {
            duration: duration,
            easing: "linear"
        }
    );

    setTimeout(() => {
        item.remove();
    }, duration);

}, 900);