/* =====================================
   TRAILMATE
   Outdoor AI Companion
===================================== */


/* =====================================
   STATE
===================================== */

let missionsCompleted = 0;

let discoveries = 0;

let seconds = 0;

let timerInterval = null;

let timerRunning = false;

let missionIndex = 0;


/* =====================================
   MISSIONS
===================================== */

const missions = [

    {
        title: "Take a 20-minute walk.",

        description:
        "Find two different trees and one thing you've never noticed before."
    },

    {
        title: "Find three different leaves.",

        description:
        "Look around your surroundings and find three leaves that look different."
    },

    {
        title: "Listen for five minutes.",

        description:
        "Put your phone away and identify three different sounds around you."
    },

    {
        title: "Find something moving.",

        description:
        "Look for a bird, insect, animal or anything else moving naturally."
    },

    {
        title: "Find a hidden detail.",

        description:
        "Look closely at your surroundings and discover something most people miss."
    },

    {
        title: "Find something beautiful.",

        description:
        "Stop for a moment and find something in nature that you normally walk past."
    }

];


/* =====================================
   START ADVENTURE
===================================== */

function startAdventure() {

    const hero =
        document.getElementById("hero");

    const dashboard =
        document.getElementById("dashboard");


    hero.style.display = "none";

    dashboard.classList.add("active");


    generateMission();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


    startTimer();

}


/* =====================================
   GENERATE MISSION
===================================== */

function generateMission() {

    const mission =
        missions[
            missionIndex %
            missions.length
        ];


    document.getElementById(
        "missionNumber"
    ).innerText =
        String(missionIndex + 1)
        .padStart(2, "0");


    document.getElementById(
        "missionTitle"
    ).innerText =
        mission.title;


    document.getElementById(
        "missionDescription"
    ).innerText =
        mission.description;

}


/* =====================================
   COMPLETE MISSION
===================================== */

function completeMission() {

    missionsCompleted++;

    discoveries +=
        Math.floor(
            Math.random() * 2
        ) + 1;


    missionIndex++;


    document.getElementById(
        "missions"
    ).innerText =
        missionsCompleted;


    document.getElementById(
        "discoveries"
    ).innerText =
        discoveries;


    generateMission();

    updateScore();

}


/* =====================================
   TIMER
===================================== */

function startTimer() {

    if (timerRunning) {

        return;

    }


    timerRunning = true;


    document.getElementById(
        "timerButton"
    ).innerText =
        "PAUSE";


    timerInterval =
        setInterval(function () {

            seconds++;

            updateTimer();

            updateScore();

        }, 1000);

}


function toggleTimer() {

    if (timerRunning) {

        clearInterval(
            timerInterval
        );

        timerRunning = false;


        document.getElementById(
            "timerButton"
        ).innerText =
            "RESUME";

    }

    else {

        startTimer();

    }

}


function resetTimer() {

    clearInterval(
        timerInterval
    );


    seconds = 0;

    timerRunning = false;


    document.getElementById(
        "timerButton"
    ).innerText =
        "START";


    updateTimer();

    updateScore();

}


function updateTimer() {

    const minutes =
        Math.floor(
            seconds / 60
        );


    const secs =
        seconds % 60;


    document.getElementById(
        "timer"
    ).innerText =

        String(minutes)
        .padStart(2, "0")

        +

        ":"

        +

        String(secs)
        .padStart(2, "0");

}


/* =====================================
   TOUCH GRASS SCORE
===================================== */

function updateScore() {

    const minutes =
        Math.floor(
            seconds / 60
        );


    let calculatedScore =

        (minutes * 2)

        +

        (missionsCompleted * 12)

        +

        (discoveries * 5);


    calculatedScore =
        Math.min(
            calculatedScore,
            100
        );


    document.getElementById(
        "score"
    ).innerText =
        calculatedScore;


    const message =
        document.getElementById(
            "scoreMessage"
        );


    if (calculatedScore < 20) {

        message.innerText =
            "Keep going. The outside world is waiting.";

    }

    else if (calculatedScore < 50) {

        message.innerText =
            "Nice. You're officially touching grass.";

    }

    else if (calculatedScore < 80) {

        message.innerText =
            "Solid adventure. Keep exploring.";

    }

    else {

        message.innerText =
            "Excellent. Your phone barely got to see you today.";

    }

}


/* =====================================
   IMAGE / AI DISCOVERY
===================================== */

function analyzeImage(event) {

    const file =
        event.target.files[0];


    if (!file) {

        return;

    }


    const preview =
        document.getElementById(
            "preview"
        );


    const result =
        document.getElementById(
            "aiResult"
        );


    const aiText =
        document.getElementById(
            "aiText"
        );


    const reader =
        new FileReader();


    reader.onload =
        function (e) {

            preview.src =
                e.target.result;


            preview.style.display =
                "block";


            result.style.display =
                "block";


            /*
             =================================
             AI MODEL CONNECTION
             =================================

             This is where the open-source
             vision model will be connected.

             Example future flow:

             image
                 ↓
             open-weight model
                 ↓
             plant / bird / object
                 ↓
             AI explanation
             */

            aiText.innerText =
                "Your discovery has been captured. Connect an open-weight vision model here to identify plants, birds, objects and other discoveries.";

            
            discoveries++;


            document.getElementById(
                "discoveries"
            ).innerText =
                discoveries;


            updateScore();

        };


    reader.readAsDataURL(file);

}


/* =====================================
   GEOLOCATION
===================================== */

function getLocation() {

    const status =
        document.getElementById(
            "locationStatus"
        );


    if (!navigator.geolocation) {

        status.innerText =
            "Geolocation is not supported by your browser.";

        return;

    }


    status.innerText =
        "Finding your location...";


    navigator.geolocation.getCurrentPosition(

        function (position) {

            const latitude =
                position.coords.latitude
                .toFixed(4);


            const longitude =
                position.coords.longitude
                .toFixed(4);


            status.innerHTML =

                "📍 Location detected.<br><br>" +

                "Latitude: " +
                latitude +

                "<br>" +

                "Longitude: " +
                longitude +

                "<br><br>" +

                "<strong>You're outside. Good.</strong>";

        },


        function () {

            status.innerText =
                "Location permission was denied or unavailable.";

        }

    );

}


/* =====================================
   END SESSION
===================================== */

function endAdventure() {

    clearInterval(
        timerInterval
    );


    timerRunning = false;


    const finalScore =
        document.getElementById(
            "score"
        ).innerText;


    alert(

        "🌿 Adventure Complete!\n\n" +

        "Outside time: " +

        document.getElementById(
            "timer"
        ).innerText +

        "\n\nMissions: " +

        missionsCompleted +

        "\nDiscoveries: " +

        discoveries +

        "\n\nTouch Grass Score: " +

        finalScore +

        "\n\nNow put your phone away."

    );

}


/* =====================================
   SAVE SESSION
===================================== */

function saveSession() {

    const data = {

        missionsCompleted:
            missionsCompleted,

        discoveries:
            discoveries,

        seconds:
            seconds

    };


    localStorage.setItem(

        "trailmate",

        JSON.stringify(data)

    );

}


/* =====================================
   LOAD SESSION
===================================== */

function loadSession() {

    const saved =
        localStorage.getItem(
            "trailmate"
        );


    if (!saved) {

        return;

    }


    try {

        const data =
            JSON.parse(saved);


        missionsCompleted =
            data.missionsCompleted || 0;


        discoveries =
            data.discoveries || 0;


        seconds =
            data.seconds || 0;


        document.getElementById(
            "missions"
        ).innerText =
            missionsCompleted;


        document.getElementById(
            "discoveries"
        ).innerText =
            discoveries;


        updateTimer();

        updateScore();

    }

    catch (error) {

        console.log(
            "Could not load TrailMate session."
        );

    }

}


/* =====================================
   AUTO SAVE
===================================== */

setInterval(

    saveSession,

    5000

);


/* =====================================
   LOAD ON START
===================================== */

window.addEventListener(

    "load",

    loadSession

);