function formatTimeRemaining(time) {
   let seconds = time / 1000;
   let minutes = seconds / 60;
   seconds = seconds % 60;
   return `${String(Math.floor(minutes)).padStart(2, "0")}:${String(Math.floor(seconds)).padStart(2, "0")}`;
}

export default formatTimeRemaining;
