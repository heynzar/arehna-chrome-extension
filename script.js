//subSections
const quranButtons = document.getElementById("quran-buttons");

//Time - Date
const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");

// Toggle Volume Buttons
const volumeBtnQuran = document.getElementById("volume-quran");
const volumeBtnSounds = document.getElementById("volume-sounds");
const volumeRangeQuran = document.getElementById("volume-range-quran");
const volumeRangeSounds = document.getElementById("volume-range-sounds");

function toggleVolume(volumeBtn, volumeRange) {
  if (volumeRange.value === "0") {
    volumeRange.value = volumeRange.max;
    volumeBtn.textContent = "🔊";
  } else {
    volumeRange.value = "0";
    volumeBtn.textContent = "🔈";
  }
}

volumeBtnQuran.addEventListener("click", () =>
  toggleVolume(volumeBtnQuran, volumeRangeQuran)
);
volumeBtnSounds.addEventListener("click", () =>
  toggleVolume(volumeBtnSounds, volumeRangeSounds)
);

document.addEventListener("DOMContentLoaded", () => {
  setInterval(updateTime, 1000);
  updateTime();
  updateTimer();
  createAudioButtons(quran, quranButtons);
});

const sectionMapping = {
  quran: {
    button: ".key__button_1",
    section: "quran",
    close: "x-quran",
  },
  sounds: {
    button: ".key__button_2",
    section: "sounds",
    close: "x-sounds",
  },
  preferences: {
    button: ".key__button_3",
    section: "preferences",
    close: "x-preferences",
  },
  info: {
    button: "info",
    section: "info-section",
    close: "x-info",
  },
};

const showSection = (sectionId) => {
  document.getElementById(sectionId).classList.remove("hidden");
};

const hideSection = (sectionId) => {
  document.getElementById(sectionId).classList.add("hidden");
};

Object.values(sectionMapping).forEach(({ button, section, close }) => {
  const buttonElement = document.querySelector(
    button.startsWith(".") ? button : `#${button}`
  );
  if (buttonElement) {
    buttonElement.addEventListener("click", () => showSection(section));
  }

  const closeElement = document.getElementById(close);
  if (closeElement) {
    closeElement.addEventListener("click", () => hideSection(section));
  }
});

const quran = [
  {
    name: "سورة البقرة",
    src: "https://server6.mp3quran.net/qtm/002.mp3",
  },
  {
    name: "سورة الملك",
    src: "https://server6.mp3quran.net/qtm/067.mp3",
  },
  {
    name: "سورة يوسف",
    src: "https://server6.mp3quran.net/qtm/012.mp3",
  },
  {
    name: "سورة النساء",
    src: "https://server6.mp3quran.net/qtm/004.mp3",
  },
  {
    name: "سورة الكهف",
    src: "https://server6.mp3quran.net/qtm/018.mp3",
  },
  {
    name: "سورة الصافات",
    src: "https://server6.mp3quran.net/qtm/037.mp3",
  },
  {
    name: "سورة الرحمن",
    src: "https://server6.mp3quran.net/qtm/055.mp3",
  },
  {
    name: "سورة  الواقعة",
    src: "https://server6.mp3quran.net/qtm/056.mp3",
  },
  {
    name: "سورة  يس",
    src: "https://server6.mp3quran.net/qtm/036.mp3",
  },
];

function updateTime() {
  const now = new Date();
  const options = { weekday: "short", day: "numeric", month: "short" };
  dateElement.textContent = now.toLocaleDateString("en-US", options);
  timeElement.textContent = now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
}

function updateTimer() {
  let sec = 0;
  let min = 0;
  let hur = 0;

  setInterval(() => {
    sec++;
    if (sec >= 60) {
      sec = 0;
      min++;
    }
    if (min >= 60) {
      min = 0;
      hur++;
    }
    document.getElementById("timer").textContent = `${hur
      .toString()
      .padStart(2, "0")}:${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  }, 1000);
}

function createAudioButtons(quranData, quranButtonsElement) {
  let currentAudio = null; // To track the currently playing audio
  let currentIndex = -1; // To track the index of the currently playing audio

  quranData.forEach(({ name, src }, index) => {
    const button = document.createElement("button");
    button.classList.add("quran-button");
    button.textContent = name;

    button.addEventListener("click", () => {
      // Stop the currently playing audio if a different button is clicked
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        const prevButton = quranButtonsElement.children[currentIndex];
        if (prevButton) {
          prevButton.style.backgroundColor = "#18181b"; // Reset previous button's style
        }
      }

      // Play the selected audio
      currentIndex = index; // Update the current index
      playAudio(src, button);
    });

    quranButtonsElement.appendChild(button);
  });

  // Function to play audio and handle auto-playing the next audio
  function playAudio(src, button) {
    currentAudio = new Audio(src);

    // Handle audio playback error
    currentAudio.addEventListener("error", () => {
      console.error("Error loading audio file:", src);
    });

    // Play the audio
    currentAudio.play();
    button.style.backgroundColor = "#0fa6e9";

    // Handle when the audio ends
    currentAudio.addEventListener("ended", () => {
      button.style.backgroundColor = "#18181b"; // Reset button style
      currentIndex++;

      // Check if there's a next audio to play
      if (currentIndex < quranData.length) {
        const nextSrc = quranData[currentIndex].src;
        const nextButton = quranButtonsElement.children[currentIndex];
        playAudio(nextSrc, nextButton); // Play the next audio
      } else {
        currentAudio = null;
        currentIndex = -1; // Reset when the last audio ends
      }
    });
  }
}
