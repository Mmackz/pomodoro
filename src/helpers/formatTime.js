function formatTimeRemaining(time) {
   let seconds = time / 1000;
   let minutes = seconds / 60;
   seconds = seconds % 60;
   return `${Math.floor(minutes)}:${String(Math.floor(seconds)).padStart(2, "0")}`;
}

export default formatTimeRemaining;
