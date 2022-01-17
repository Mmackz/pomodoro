import { useEffect, useState } from "react";
import { useRef } from "react/cjs/react.development";
import Display from "./components/Display/Display";
import accurateInterval from "./helpers/interval";

const MS = 60 * 1000;

function App() {
   const [sessionLength, setSessionLength] = useState(25);
   const [breakLength, setBreakLength] = useState(5);
   const [timeRemaining, setTimeRemaining] = useState(1500000);
   const [currentTimer, setCurrentTimer] = useState("session");
   const [running, setRunning] = useState(false);
   const [timerId, setTimerId] = useState(null);

   const audioRef = useRef();

   useEffect(() => {
      if (timeRemaining === 0) {
         audioRef.current.play();
         setTimeRemaining(
            currentTimer === "session" ? breakLength * MS : sessionLength * MS
         );
         setCurrentTimer(currentTimer === "session" ? "break" : "session");
      }
   }, [breakLength, sessionLength, currentTimer, timeRemaining, audioRef]);

   function changeTimerSetting(timer, amount) {
      if (timer === "session") {
         if (sessionLength + amount > 0 && sessionLength + amount <= 60) {
            setSessionLength((state) => state + amount);
            if (currentTimer === "session") {
               setTimeRemaining((sessionLength + amount) * MS);
            }
         }
      }

      if (timer === "break") {
         if (breakLength + amount > 0 && breakLength + amount <= 60) {
            setBreakLength((state) => state + amount);
            if (currentTimer === "break") {
               setTimeRemaining((breakLength + amount) * MS);
            }
         }
      }
   }

   function calculatePercent() {
      const timer = currentTimer === "session" ? sessionLength : breakLength;
      const percent = timeRemaining / (timer * MS) * 100
      console.log(percent)
      return percent
   }

   function startTimer() {
      timerId && timerId.cancel();
      if (!running) {
         setRunning(true);
         setTimerId(
            accurateInterval(() => {
               setTimeRemaining((state) => state - 100);
            }, 100)
         );
      } else {
         setRunning(false);
      }
   }

   function resetTimer() {
      timerId && timerId.cancel();
      setRunning(false);
      setSessionLength(25);
      setBreakLength(5);
      setTimeRemaining(1500000);
      setCurrentTimer("session");
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
   }

   return (
      <section className="main-container">
         <Display
            timerName={currentTimer}
            remaining={timeRemaining}
            running={running}
            start={startTimer}
            reset={resetTimer}
            percent={calculatePercent()}
         />

         <div className="time-setting">
            <p id="session-label">Session Length:</p>
            <p id="session-length">{sessionLength}</p>
            <button
               id="session-decrement"
               onClick={() => !running && changeTimerSetting("session", -1)}
            >
               -
            </button>
            <button
               id="session-increment"
               onClick={() => !running && changeTimerSetting("session", 1)}
            >
               +
            </button>
         </div>

         <div className="time-setting">
            <p id="break-label">Break Length:</p>
            <p id="break-length">{breakLength}</p>
            <button
               id="break-decrement"
               onClick={() => !running && changeTimerSetting("break", -1)}
            >
               -
            </button>
            <button
               id="break-increment"
               onClick={() => !running && changeTimerSetting("break", 1)}
            >
               +
            </button>
         </div>

         <audio
            id="beep"
            ref={audioRef}
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
         ></audio>
      </section>
   );
}

export default App;
