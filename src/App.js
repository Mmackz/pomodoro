import { useEffect, useState } from "react";
import { useRef } from "react/cjs/react.development";
import Controls from "./components/Controls/Controls";
import Display from "./components/Display/Display";
import accurateInterval from "./helpers/interval";

const MS = 60;

function App() {
   const [sessionLength, setSessionLength] = useState(25);
   const [breakLength, setBreakLength] = useState(5);
   const [timeRemaining, setTimeRemaining] = useState(1500);
   const [currentTimer, setCurrentTimer] = useState("session");
   const [running, setRunning] = useState(false);
   const [timerId, setTimerId] = useState(null);
   const [percentMeter, setPercentMeter] = useState(null);
   const [meterTime, setMeterTime] = useState(15000);

   const audioRef = useRef();

   useEffect(() => {
      if (timeRemaining === 0) {
         audioRef.current.play();
         setTimeRemaining(
            currentTimer === "session" ? breakLength * MS : sessionLength * MS
         );
         setMeterTime(
            currentTimer === "session"
               ? breakLength * MS * 10
               : sessionLength * MS * 10
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
               setMeterTime((sessionLength + amount) * MS * 10);
            }
         }
      }

      if (timer === "break") {
         if (breakLength + amount > 0 && breakLength + amount <= 60) {
            setBreakLength((state) => state + amount);
            if (currentTimer === "break") {
               setTimeRemaining((breakLength + amount) * MS);
               setMeterTime((sessionLength + amount) * MS * 10);
            }
         }
      }
   }

   function calculatePercent() {
      const timer = currentTimer === "session" ? sessionLength : breakLength;
      const percent = (meterTime / (timer * MS)) * 10;
      return percent;
   }

   function startTimer() {
      timerId && timerId.cancel();
      percentMeter && percentMeter.cancel();
      if (!running) {
         setRunning(true);
         setTimerId(
            accurateInterval(() => {
               setTimeRemaining((state) => state - 1);
            }, 1000)
         );
         setMeterTime(timeRemaining * 10);
         setPercentMeter(
            accurateInterval(() => {
               setMeterTime((state) => state - 1);
            }, 100)
         );
      } else {
         setRunning(false);
      }
   }

   function resetTimer() {
      timerId && timerId.cancel();
      percentMeter && percentMeter.cancel();
      setRunning(false);
      setSessionLength(25);
      setBreakLength(5);
      setTimeRemaining(1500);
      setCurrentTimer("session");
      setMeterTime(15000);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
   }

   return (
      <main className="main-container">
         <h1>pomodoro</h1>
         <Display
            timerName={currentTimer}
            remaining={timeRemaining}
            running={running}
            start={startTimer}
            reset={resetTimer}
            percent={calculatePercent()}
         />

         <Controls
            state={{ sessionLength, breakLength, running }}
            changeSetting={changeTimerSetting}
         />

         <audio
            id="beep"
            ref={audioRef}
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
         ></audio>
      </main>
   );
}

export default App;
