//App Data
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
    name: "🦜",
    src: "https://upbase.io/_assets/pomoup/1_Birds.mp3",
  },
  {
    name: "☕",
    src: "https://upbase.io/_assets/pomoup/4_Coffee_Shop.mp3",
  },
  {
    name: "🌧",
    src: "https://upbase.io/_assets/pomoup/2_Rain.mp3",
  },
  {
    name: "🌩",
    src: "https://upbase.io/_assets/pomoup/3_Thunder.mp3",
  },
  {
    name: "🏞",
    src: "assets/audios/waterfall2.mp3",
  },
  {
    name: "💧",
    src: "assets/audios/drops.mp3",
  },
  {
    name: "🔥",
    src: "https://upbase.io/_assets/pomoup/6_Fire.mp3",
  },
  {
    name: "🌊",
    src: "https://upbase.io/_assets/pomoup/8_Ocean_Waves.mp3",
  },
  {
    name: "🌙",
    src: "assets/audios/night2.mp3",
  },
];
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

//subSections
const quranButtons = document.getElementById("quran-buttons");
const soundsButtons = document.getElementById("sounds-buttons");

//Time - Date
const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");

//volume range input
const volumeRangeQuran = document.getElementById("volume-range-quran");
const volumeRangeSounds = document.getElementById("volume-range-sounds");

let preferencesData = JSON.parse(localStorage.getItem("preferencesData")) || {
  isSurahRepeating: false,
  isHijriDate: false,
  defaultSurah: 1,
  backgroundImage: "/assets/images/bg1.jpeg",
  timer: { hours: 0, minutes: 0, seconds: 0 },
};

function savePreferences() {
  localStorage.setItem("preferencesData", JSON.stringify(preferencesData));
}

function loadPreferences() {
  document.body.style.backgroundImage = `url(${preferencesData.backgroundImage})`;
  isHijriDateCheck.classList.toggle("isChek", preferencesData.isHijriDate);
  isSurahRepeatingCheck.classList.toggle(
    "isChek",
    preferencesData.isSurahRepeating
  );
  selectSurah.value = preferencesData.defaultSurah;
}

const isHijriDateCheck = document.getElementById("isHijriDate");
const isSurahRepeatingCheck = document.getElementById("isSurahRepeating");
const selectSurah = document.getElementById("select-surah");
const backgroundImageInput = document.getElementById("background-image-url");

// Event listeners for preferences
isHijriDateCheck.addEventListener("click", () => {
  preferencesData.isHijriDate = !preferencesData.isHijriDate;
  savePreferences();
  isHijriDateCheck.classList.toggle("isChek", preferencesData.isHijriDate);
});

isSurahRepeatingCheck.addEventListener("click", () => {
  preferencesData.isSurahRepeating = !preferencesData.isSurahRepeating;
  savePreferences();
  isSurahRepeatingCheck.classList.toggle(
    "isChek",
    preferencesData.isSurahRepeating
  );
});

selectSurah.addEventListener("change", (event) => {
  preferencesData.defaultSurah = parseInt(event.target.value, 10);
  savePreferences();
});

const backgroundImages = document.querySelectorAll(".background img");

backgroundImages.forEach((image) => {
  image.addEventListener("click", (event) => {
    const selectedImageUrl = event.target.src;
    document.body.style.backgroundImage = `url(${selectedImageUrl})`;
    savePreferences();
  });
});

backgroundImageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preferencesData.backgroundImage = e.target.result;
      document.body.style.backgroundImage = `url(${preferencesData.backgroundImage})`;
      savePreferences();
    };
    reader.readAsDataURL(file);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  loadPreferences();
  updateTimer();
  setInterval(() => updateTime(preferencesData.isHijriDate), 1000);
  updateTime(preferencesData.isHijriDate);
  createAudioButtons(
    quran,
    quranButtons,
    volumeRangeQuran,
    preferencesData.isSurahRepeating,
    false
  );
  createAudioButtons(sounds, soundsButtons, volumeRangeSounds, true, true);
});

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

function updateTime(isHijriDate) {
  const now = new Date();
  if (isHijriDate) {
    const hijriOptions = {
      weekday: "short",
      day: "numeric",
      month: "short",
      calendar: "islamic",
    };
    dateElement.textContent = now.toLocaleDateString(
      "en-US-u-ca-islamic",
      hijriOptions
    );
  } else {
    const options = { weekday: "short", day: "numeric", month: "short" };
    dateElement.textContent = now.toLocaleDateString("en-US", options);
  }
  timeElement.textContent = now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Timer update and persistence
function updateTimer() {
  const { hours, minutes, seconds } = preferencesData.timer;
  let timerInterval = setInterval(() => {
    preferencesData.timer.seconds++;
    if (preferencesData.timer.seconds >= 60) {
      preferencesData.timer.seconds = 0;
      preferencesData.timer.minutes++;
    }
    if (preferencesData.timer.minutes >= 60) {
      preferencesData.timer.minutes = 0;
      preferencesData.timer.hours++;
    }
    document.getElementById("timer").textContent = `${String(
      preferencesData.timer.hours
    ).padStart(2, "0")}:${String(preferencesData.timer.minutes).padStart(
      2,
      "0"
    )}:${String(preferencesData.timer.seconds).padStart(2, "0")}`;
    savePreferences();
  }, 1000);
}

function createAudioButtons(
  audioData,
  audioButtonsElement,
  volumeRange,
  isRepeating,
  isMultiplePlaying
) {
  let currentAudio = null;
  let currentIndex = -1;
  const activeAudios = new Map();
  let isPlaying = true;

  // Add space key event listener
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault(); // Prevent space from scrolling the page
      isPlaying = !isPlaying; // Toggle play state

      if (isMultiplePlaying) {
        // Handle multiple playing audios
        if (isPlaying) {
          // Resume all paused audios
          activeAudios.forEach((audio) => {
            audio.play();
          });
        } else {
          // Pause all playing audios
          activeAudios.forEach((audio) => {
            audio.pause();
          });
        }
      } else {
        // Handle single audio
        if (currentAudio) {
          if (isPlaying) {
            currentAudio.play();
          } else {
            currentAudio.pause();
          }
        }
      }
    }
  });

  // Initialize volume control
  volumeRange.addEventListener("input", () => {
    const volume = volumeRange.value / 10;
    if (isMultiplePlaying) {
      activeAudios.forEach((audio) => {
        audio.volume = volume;
      });
    } else if (currentAudio) {
      currentAudio.volume = volume;
    }
  });

  audioData.forEach(({ name, src }, index) => {
    const button = document.createElement("button");
    button.classList.add("audio-button");
    button.textContent = name;

    button.addEventListener("click", () => {
      if (isMultiplePlaying) {
        if (activeAudios.has(index)) {
          const audioToStop = activeAudios.get(index);
          audioToStop.pause();
          audioToStop.currentTime = 0;
          button.style.backgroundColor = "#18181b";
          activeAudios.delete(index);
        } else {
          const audioToPlay = new Audio(src);
          audioToPlay.volume = volumeRange.value / 10;
          if (isPlaying) {
            // Only play if isPlaying is true
            audioToPlay.play();
          }
          audioToPlay.addEventListener("ended", () => {
            button.style.backgroundColor = "#18181b";
            activeAudios.delete(index);
          });
          activeAudios.set(index, audioToPlay);
          button.style.backgroundColor = "#0fa6e9";
        }
      } else {
        if (currentAudio && currentIndex === index) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
          button.style.backgroundColor = "#18181b";
          currentAudio = null;
          currentIndex = -1;
          return;
        }

        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
          const prevButton = audioButtonsElement.children[currentIndex];
          if (prevButton) {
            prevButton.style.backgroundColor = "#18181b";
          }
        }

        currentIndex = index;
        playAudio(src, button);
      }
    });

    audioButtonsElement.appendChild(button);
  });

  function playAudio(src, button) {
    currentAudio = new Audio(src);
    currentAudio.volume = volumeRange.value / 10;

    currentAudio.addEventListener("error", () => {
      console.error("Error loading audio file:", src);
    });

    if (isPlaying) {
      // Only play if isPlaying is true
      currentAudio.play();
    }
    button.style.backgroundColor = "#0fa6e9";

    currentAudio.addEventListener("ended", () => {
      button.style.backgroundColor = "#18181b";

      if (isRepeating) {
        currentAudio.currentTime = 0;
        if (isPlaying) {
          // Only play if isPlaying is true
          currentAudio.play();
        }
        button.style.backgroundColor = "#0fa6e9";
      } else {
        currentIndex++;

        if (currentIndex < audioData.length) {
          const nextSrc = audioData[currentIndex].src;
          const nextButton = audioButtonsElement.children[currentIndex];
          playAudio(nextSrc, nextButton);
        } else {
          currentIndex = 0;
          const firstSrc = audioData[0].src;
          const firstButton = audioButtonsElement.children[0];
          playAudio(firstSrc, firstButton);
        }
      }
    });
  }
}
