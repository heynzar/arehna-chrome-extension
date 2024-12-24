document.addEventListener("DOMContentLoaded", () => {
  const timeElement = document.getElementById("time");
  const dateElement = document.getElementById("date");
  const timerElement = document.getElementById("timer");

  // Update time and date dynamically
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

  // Update timer countdown (example static value)
  function updateTimer() {
    timerElement.textContent = "12:15:30"; // Update this logic if needed
  }

  setInterval(updateTime, 1000);
  updateTime();
  updateTimer();
});
