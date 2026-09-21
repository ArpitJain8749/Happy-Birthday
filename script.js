
/* =====================================================
   BIRTHDAY GIFT WEBSITE
   JavaScript
===================================================== */


/* =====================================================
   SETTINGS
===================================================== */

// Change these values according to your website.

const CORRECT_PIN = "2008";

const PERSON_NAME = "SHRISTI 🎉";

const LETTER_MESSAGE = `
Dear SHRISTI

Today is your special day, and I wanted to create something a little different for you.

I hope every moment of your life is filled
with happiness, laughter and love.

May all your dreams come true.

Keep smiling, keep shining,
and always stay the amazing person you are.

Happy Birthday! 🎂❤️

With lots of love,
`;


/* =====================================================
   SCREEN ELEMENTS
===================================================== */

const screens = document.querySelectorAll(".screen");

const welcomeScreen =
    document.getElementById("welcomeScreen");

const pinScreen =
    document.getElementById("pinScreen");

const birthdayScreen =
    document.getElementById("birthdayScreen");

const memoryScreen =
    document.getElementById("memoryScreen");

const timelineScreen =
    document.getElementById("timelineScreen");

const gameScreen =
    document.getElementById("gameScreen");

const letterScreen =
    document.getElementById("letterScreen");

const finalScreen =
    document.getElementById("finalScreen");


/* =====================================================
   PERSON NAME
===================================================== */

const personName =
    document.getElementById("personName");

if (personName) {
    personName.textContent = PERSON_NAME;
}


/* =====================================================
   BACKGROUND MUSIC
===================================================== */

const backgroundMusic =
    document.getElementById("backgroundMusic");

function playMusic() {

    if (!backgroundMusic) {
        return;
    }

    backgroundMusic.volume = 0.35;

    backgroundMusic.play().catch(() => {
        console.log(
            "Music will start after user interaction."
        );
    });
}


/* =====================================================
   SCREEN CHANGE FUNCTION
===================================================== */

function showScreen(screenId) {

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const target =
        document.getElementById(screenId);

    if (!target) {
        return;
    }

    target.classList.add("active");
}


/* =====================================================
   GIFT OPEN
===================================================== */

const giftBox =
    document.getElementById("giftBox");

if (giftBox) {

    giftBox.addEventListener("click", () => {

        giftBox.classList.add("opening");

        playMusic();

        createConfetti(50);

        setTimeout(() => {

            showScreen("pinScreen");

        }, 1200);

    });

}


/* =====================================================
   PIN INPUTS
===================================================== */

const pinInputs =
    document.querySelectorAll(".pin");


pinInputs.forEach((input, index) => {

    input.addEventListener("input", () => {

        input.value =
            input.value.replace(/\D/g, "");

        if (
            input.value &&
            index < pinInputs.length - 1
        ) {

            pinInputs[index + 1].focus();

        }

    });


    input.addEventListener("keydown", event => {

        if (
            event.key === "Backspace" &&
            !input.value &&
            index > 0
        ) {

            pinInputs[index - 1].focus();

        }

    });

});


/* =====================================================
   PIN UNLOCK
===================================================== */

const unlockBtn =
    document.getElementById("unlockBtn");

const pinError =
    document.getElementById("pinError");


if (unlockBtn) {

    unlockBtn.addEventListener("click", () => {

        let enteredPin = "";

        pinInputs.forEach(input => {
            enteredPin += input.value;
        });


        if (enteredPin === CORRECT_PIN) {

            pinError.textContent = "";

            createConfetti(100);

            setTimeout(() => {

                showScreen("birthdayScreen");

            }, 500);

        } else {

            pinError.textContent =
                "❌ Wrong PIN. Try again!";

            pinInputs.forEach(input => {

                input.style.animation =
                    "shake 0.4s";

            });

            setTimeout(() => {

                pinInputs.forEach(input => {

                    input.style.animation = "";

                });

            }, 500);

        }

    });

}


/* =====================================================
   ENTER KEY FOR PIN
===================================================== */

pinInputs.forEach(input => {

    input.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            unlockBtn.click();

        }

    });

});


/* =====================================================
   NEXT BUTTONS
===================================================== */

const nextButtons =
    document.querySelectorAll(".next-btn");


nextButtons.forEach(button => {

    button.addEventListener("click", () => {

        const nextScreen =
            button.dataset.next;

        if (!nextScreen) {
            return;
        }

        createConfetti(35);

        showScreen(nextScreen);

        if (nextScreen === "letterScreen") {

            startTyping();

        }

    });

});


/* =====================================================
   FLOATING HEARTS
===================================================== */

const heartsContainer =
    document.getElementById("hearts");


function createFloatingHeart() {

    if (!heartsContainer) {
        return;
    }

    const heart =
        document.createElement("span");

    heart.className =
        "floating-heart";

    const heartSymbols = [
        "❤️",
        "🎉",
        "🎊",
        "🎁",
        "🎈",
        "✨"
    ];

    heart.textContent =
        heartSymbols[
            Math.floor(
                Math.random() *
                heartSymbols.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        (12 + Math.random() * 22) + "px";


    const duration =
        5 + Math.random() * 7;


    heart.style.animationDuration =
        duration + "s";


    heartsContainer.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, duration * 1000);

}


setInterval(
    createFloatingHeart,
    700
);


/* =====================================================
   CONFETTI
===================================================== */

function createConfetti(amount = 50) {

    const symbols = [
        "✨",
        "💖",
        "💕",
        "🎉",
        "🎊",
        "❤️"
    ];


    for (let i = 0; i < amount; i++) {

        const confetti =
            document.createElement("div");

        confetti.className =
            "confetti";


        confetti.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        confetti.style.left =
            Math.random() * 100 + "vw";


        confetti.style.fontSize =
            (10 + Math.random() * 15) + "px";


        const duration =
            2 + Math.random() * 3;


        confetti.style.animationDuration =
            duration + "s";


        document.body.appendChild(confetti);


        setTimeout(() => {

            confetti.remove();

        }, duration * 1000);

    }

}


/* =====================================================
   SIMPLE CLICK SOUND
===================================================== */

let audioContext;


function playClickSound() {

    try {

        if (!audioContext) {

            audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

        }


        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();


        oscillator.connect(gain);

        gain.connect(
            audioContext.destination
        );


        oscillator.frequency.value =
            700;


        gain.gain.setValueAtTime(
            0.05,
            audioContext.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + 0.15
        );


        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.15
        );

    } catch (error) {

        console.log(
            "Audio not available."
        );

    }

}


/* =====================================================
   GAME VARIABLES
===================================================== */

const gameArea =
    document.getElementById("gameArea");

const scoreElement =
    document.getElementById("score");

const timerElement =
    document.getElementById("timer");

const startGameBtn =
    document.getElementById("startGameBtn");

const gameNextBtn =
    document.getElementById("gameNextBtn");


let score = 0;

let timeLeft = 15;

let gameInterval;

let heartInterval;

let gameRunning = false;


/* =====================================================
   START GAME
===================================================== */

if (startGameBtn) {

    startGameBtn.addEventListener(
        "click",
        startGame
    );

}


function startGame() {

    if (gameRunning) {
        return;
    }

    gameRunning = true;

    score = 0;

    timeLeft = 15;


    scoreElement.textContent =
        score;


    timerElement.textContent =
        timeLeft;


    startGameBtn.classList.add(
        "hidden"
    );


    gameNextBtn.classList.add(
        "hidden"
    );


    gameArea.innerHTML = "";


    playClickSound();


    /* Timer */

    gameInterval =
        setInterval(() => {

            timeLeft--;

            timerElement.textContent =
                timeLeft;


            if (timeLeft <= 0) {

                endGame();

            }

        }, 1000);


    /* Create hearts */

    heartInterval =
        setInterval(() => {

            createGameHeart();

        }, 600);


    /* First hearts */

    for (let i = 0; i < 3; i++) {

        createGameHeart();

    }

}


/* =====================================================
   CREATE GAME HEART
===================================================== */

function createGameHeart() {

    if (!gameRunning) {
        return;
    }


    const heart =
        document.createElement("span");

    heart.className =
        "game-heart";

    heart.textContent =
        "🎈";


    const maxX =
        gameArea.clientWidth - 45;

    const maxY =
        gameArea.clientHeight - 45;


    heart.style.left =
        Math.max(
            5,
            Math.random() * maxX
        ) + "px";


    heart.style.top =
        Math.max(
            5,
            Math.random() * maxY
        ) + "px";


    heart.addEventListener(
        "click",
        catchHeart
    );


    gameArea.appendChild(heart);


    setTimeout(() => {

        if (heart.parentElement) {

            heart.remove();

        }

    }, 1200);

}


/* =====================================================
   CATCH HEART
===================================================== */

function catchHeart(event) {

    if (!gameRunning) {
        return;
    }


    score++;

    scoreElement.textContent =
        score;


    playClickSound();


    event.target.remove();


    createMiniConfetti(
        event.clientX,
        event.clientY
    );

}


/* =====================================================
   END GAME
===================================================== */

function endGame() {

    gameRunning = false;


    clearInterval(
        gameInterval
    );


    clearInterval(
        heartInterval
    );


    gameArea.innerHTML = "";


    const result =
        document.createElement("div");

    result.style.position =
        "absolute";

    result.style.inset =
        "0";

    result.style.display =
        "flex";

    result.style.alignItems =
        "center";

    result.style.justifyContent =
        "center";

    result.style.flexDirection =
        "column";

    result.style.fontSize =
        "22px";


    result.innerHTML = `
        <div style="font-size:50px;">
            🎈
        </div>

        <strong>
            You caught ${score} Baloon!
        </strong>

        <p style="
            margin-top:10px;
            opacity:0.7;
            font-size:14px;
        ">
            You win a Iphone 18 pro 📱
        </p>
    `;


    gameArea.appendChild(
        result
    );


    createConfetti(70);


    gameNextBtn.classList.remove(
        "hidden"
    );

}


/* =====================================================
   GAME NEXT BUTTON
===================================================== */

if (gameNextBtn) {

    gameNextBtn.addEventListener(
        "click",
        () => {

            showScreen(
                "letterScreen"
            );

            startTyping();

        }
    );

}


/* =====================================================
   MINI CONFETTI
===================================================== */

function createMiniConfetti(x, y) {

    for (let i = 0; i < 6; i++) {

        const particle =
            document.createElement("span");

        particle.textContent =
            "✨";


        particle.style.position =
            "fixed";

        particle.style.left =
            x + "px";

        particle.style.top =
            y + "px";

        particle.style.pointerEvents =
            "none";

        particle.style.zIndex =
            "9999";


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            30 + Math.random() * 50;


        particle.animate(
            [
                {
                    transform:
                        "translate(0,0) scale(1)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            ${Math.cos(angle) * distance}px,
                            ${Math.sin(angle) * distance}px
                        )
                        scale(0)`,
                    opacity: 0
                }
            ],
            {
                duration: 600,
                easing: "ease-out"
            }
        );


        document.body.appendChild(
            particle
        );


        setTimeout(() => {

            particle.remove();

        }, 650);

    }

}


/* =====================================================
   TYPING LETTER
===================================================== */

const typingText =
    document.getElementById(
        "typingText"
    );

const finalBtn =
    document.getElementById(
        "finalBtn"
    );


let typingStarted = false;


function startTyping() {

    if (typingStarted) {
        return;
    }


    typingStarted = true;


    if (!typingText) {
        return;
    }


    typingText.textContent = "";


    let index = 0;


    const typingSpeed = 35;


    function typeCharacter() {

        if (
            index <
            LETTER_MESSAGE.length
        ) {

            typingText.textContent +=
                LETTER_MESSAGE[index];


            index++;


            setTimeout(
                typeCharacter,
                typingSpeed
            );

        } else {

            if (finalBtn) {

                finalBtn.classList.remove(
                    "hidden"
                );

            }

            createConfetti(50);

        }

    }


    typeCharacter();

}


/* =====================================================
   FINAL BUTTON
===================================================== */

if (finalBtn) {

    finalBtn.addEventListener(
        "click",
        () => {

            showScreen(
                "finalScreen"
            );

            createConfetti(120);

        }
    );

}


/* =====================================================
   RESTART
===================================================== */

/* =====================================================
   RESTART
===================================================== */

const restartBtn =
    document.getElementById("restartBtn");

if (restartBtn) {

    restartBtn.addEventListener("click", () => {

        /* Reset PIN */

        pinInputs.forEach(input => {
            input.value = "";
        });

        if (pinError) {
            pinError.textContent = "";
        }


        /* Reset game */

        clearInterval(gameInterval);
        clearInterval(heartInterval);

        gameRunning = false;

        score = 0;
        timeLeft = 15;

        if (scoreElement) {
            scoreElement.textContent = "0";
        }

        if (timerElement) {
            timerElement.textContent = "15";
        }

        if (gameArea) {
            gameArea.innerHTML = "";
        }

        if (startGameBtn) {
            startGameBtn.classList.remove("hidden");
        }

        if (gameNextBtn) {
            gameNextBtn.classList.add("hidden");
        }


        /* Reset letter */

        typingStarted = false;

        if (typingText) {
            typingText.textContent = "";
        }

        if (finalBtn) {
            finalBtn.classList.add("hidden");
        }


        /* Reset gift */

        if (giftBox) {
            giftBox.classList.remove("opening");
        }


        showScreen("welcomeScreen");

    });

} // ⭐ यह missing था



/* =====================================================
   BUTTON CLICK EFFECT
===================================================== */

document
    .querySelectorAll(".main-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            playClickSound
        );

    });


/* =====================================================
   KEYBOARD SHORTCUT
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        /*
         Press Escape to return
         to the welcome screen.
        */

        if (event.key === "Escape") {

            showScreen(
                "welcomeScreen"
            );

        }

    }
);


/* =====================================================
   SHAKE ANIMATION
===================================================== */

const shakeStyle =
    document.createElement("style");


shakeStyle.textContent = `

@keyframes shake {

    0%, 100% {
        transform: translateX(0);
    }

    20% {
        transform: translateX(-8px);
    }

    40% {
        transform: translateX(8px);
    }

    60% {
        transform: translateX(-6px);
    }

    80% {
        transform: translateX(6px);
    }

}

`;


document.head.appendChild(
    shakeStyle
);


/* =====================================================
   STARTUP
===================================================== */

showScreen(
    "welcomeScreen"
);

console.log(
    "🎁 Birthday Gift Website Loaded!"
);

console.log(
    "🔐 Demo PIN:",
    CORRECT_PIN
);

