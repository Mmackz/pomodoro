import { useEffect, useState } from "react";

function App() {
   const [sessionLength, setSessionLength] = useState(25);
   const [breakLength, setBreakLength] = useState(5);
   const [timeRemaining, setTimeRemaining] = useState(sessionLength * 60);
   const [currentTimer, setCurrentTimer] = useState("session");
   const [running, setRunning] = useState(false);
   const [timerId, setTimerId] = useState(null);

   function startTimer() {
      clearInterval(timerId)
      if (!running) {
         setRunning(true);
         setTimerId(setInterval(() => {
            setTimeRemaining(state => state - 1)
         }, 1000));
      } else {
         setRunning(false);
      }
      
   }

   return (
      <section className="timer-container">
         {timerId}
         <p id="timer-label">{currentTimer}</p>
         <p id="time-left">{timeRemaining}</p>
         <button id="start_stop" onClick={startTimer}>start/stop</button>
         <button id="reset">reset</button>

         <div className="time-setting">
            <p id="session-label">Session Length:</p>
            <p id="session-length">{sessionLength}</p>
            <button id="session-decrement">-</button>
            <button id="session-increment">+</button>
         </div>

         <div className="time-setting">
            <p id="break-label">Break Length:</p>
            <p id="break-length">{breakLength}</p>
            <button id="break-decrement">-</button>
            <button id="break-increment">+</button>
         </div>
      </section>
   );
}

export default App;
