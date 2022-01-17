function formatTimeRemaining(time) {
   console.log(time);
   let seconds = time;
   let minutes = seconds / 60;
   seconds = seconds % 60;
   return (
      <p>
         {`${String(Math.floor(minutes)).padStart(2, "0")}:`}
         <span className="seconds">{String(Math.floor(seconds)).padStart(2, "0")}</span>
      </p>
   );
}

export default formatTimeRemaining;
