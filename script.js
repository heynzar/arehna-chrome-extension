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

const sounds = [
  {
    icon: "bird-icon",
    src: "https://upbase.io/_assets/pomoup/1_Birds.mp3",
  },
  {
    icon: "coffee-icon",
    src: "https://upbase.io/_assets/pomoup/4_Coffee_Shop.mp3",
  },
  {
    icon: "rain-icon",
    src: "https://upbase.io/_assets/pomoup/2_Rain.mp3",
  },
  {
    icon: "lightning-icon",
    src: "https://upbase.io/_assets/pomoup/3_Thunder.mp3",
  },
  {
    icon: "dam-icon",
    src: "/audios/waterfall2.mp3",
  },
  {
    icon: "droplets-icon",
    src: "/audios/drops.mp3",
  },
  {
    icon: "flame-icon",
    src: "https://upbase.io/_assets/pomoup/6_Fire.mp3",
  },
  {
    icon: "waves-icon",
    src: "https://upbase.io/_assets/pomoup/8_Ocean_Waves.mp3",
  },
  {
    icon: "wind-icon",
    src: "/audios/wind2.mp3",
  },
  {
    icon: "moon-icon",
    src: "/audios/night2.mp3",
  },
];

//subSections
const quranButtons = document.getElementById("quran-buttons");

//Time - Date
const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");

const volumeRangeQuran = document.getElementById("volume-range-quran");
const volumeRangeSounds = document.getElementById("volume-range-sounds");

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

function createAudioButtons(
  quranData,
  quranButtonsElement,
  isRepeating = true
) {
  let currentAudio = null; // To track the currently playing audio
  let currentIndex = -1; // To track the index of the currently playing audio

  // Initialize volume control
  volumeRangeQuran.addEventListener("input", () => {
    if (currentAudio) {
      currentAudio.volume = volumeRangeQuran.value / 10;
    }
  });

  quranData.forEach(({ name, src }, index) => {
    const button = document.createElement("button");
    button.classList.add("quran-button");
    button.textContent = name;

    button.addEventListener("click", () => {
      // Stop the currently playing audio if the same button is clicked
      if (currentAudio && currentIndex === index) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        button.style.backgroundColor = "#18181b"; // Reset button style
        currentAudio = null;
        currentIndex = -1;
        return;
      }

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

    // Set initial volume
    currentAudio.volume = volumeRangeQuran.value / 10;

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

      if (isRepeating) {
        currentAudio.currentTime = 0;
        currentAudio.play();
        button.style.backgroundColor = "#0fa6e9";
      } else {
        currentIndex++;

        // Check if there's a next audio to play, or loop back to the first
        if (currentIndex < quranData.length) {
          const nextSrc = quranData[currentIndex].src;
          const nextButton = quranButtonsElement.children[currentIndex];
          playAudio(nextSrc, nextButton);
        } else {
          currentIndex = 0; // Reset to the first audio
          const firstSrc = quranData[0].src;
          const firstButton = quranButtonsElement.children[0];
          playAudio(firstSrc, firstButton);
        }
      }
    });
  }
}
