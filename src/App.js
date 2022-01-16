import { useEffect, useState, useReducer } from "react";
import reducer from "./helpers/reducers";
import formatTimeRemaining from "./helpers/formatTime";

const DEFAULT_SESSION_TIME = 25;
const DEFAULT_BREAK_TIME = 5;

function App() {
   const [sessionTime, setSessionTime] = useState(DEFAULT_SESSION_TIME);
   const [breakTime, setBreaktime] = useState(DEFAULT_BREAK_TIME);

   const initialState = {
      timeLimitMs: DEFAULT_SESSION_TIME * 60 * 1000,
      timeRemaining: DEFAULT_SESSION_TIME * 60 * 1000,
      startTimestamp: null,
      running: false,
      isBreakTime: false
   };

   const [state, dispatch] = useReducer(reducer, initialState);

   useEffect(() => {
      let timerId;
      if (state.running) {
         if (state.isBreakTime && state.timeRemaining <= 0) {
            dispatch([
               { type: "isBreakTime", payload: false },
               { type: "startTimestamp", payload: Date.now() },
               { type: "timeLimitMs", payload: sessionTime * 60 * 1000 },
               { type: "timeRemaining", payload: sessionTime * 60 * 1000 }
            ]);
         }

         if (!state.isBreakTime) {
            if (state.timeRemaining <= 0) {
               dispatch([
                  { type: "isBreakTime", payload: true },
                  { type: "startTimestamp", payload: Date.now() },
                  { type: "timeLimitMs", payload: breakTime * 60 * 1000 },
                  { type: "timeRemaining", payload: breakTime * 60 * 1000 }
               ]);
            }
         }

         timerId = setTimeout(() => {
            const timeElapsed = Date.now() - state.startTimestamp;
            const payload = state.timeLimitMs - timeElapsed;
            dispatch({
               type: "timeRemaining",
               payload: payload > 0 ? payload : 0
            });
         }, 10);
      }
      return () => clearTimeout(timerId);
   }, [state, breakTime, sessionTime]);

   function resetTimer() {
      dispatch([
         { type: "timeLimitMs", payload: DEFAULT_SESSION_TIME * 60 * 1000 },
         { type: "timeRemaining", payload: DEFAULT_SESSION_TIME * 60 * 1000 },
         { type: "running", payload: false },
         { type: "isBreakTime", payload: false }
      ]);
      setSessionTime(25);
      setBreaktime(5);
   }

   function changeTimerSetting(limit, amount) {
      if (limit === "main") {
         if (sessionTime + amount > 0 && sessionTime + amount <= 60) {
            setSessionTime((state) => state + amount);
            dispatch([
               {
                  type: "timeLimitMs",
                  payload: (sessionTime + amount) * 60 * 1000
               },
               {
                  type: "timeRemaining",
                  payload: (sessionTime + amount) * 60 * 1000
               }
            ]);
         }
      } else if (limit === "break") {
         if (breakTime + amount > 0 && breakTime + amount <= 60) {
            setBreaktime((state) => state + amount);
         }
      }
   }

   return (
      <section className="timer-container">
         <p id="timer-label">{state.isBreakTime ? "break" : "session"}</p>
         <p id="time-left">{formatTimeRemaining(state.timeRemaining)}</p>
         <button
            id="start_stop"
            onClick={() => {
               dispatch([
                  { type: "running" },
                  { type: "startTimestamp", payload: Date.now() },
                  { type: "timeLimitMs", payload: state.timeRemaining }
               ]);
            }}
         >
            start/stop
         </button>
         <button id="reset" onClick={resetTimer}>
            reset
         </button>

         <div className="time-setting">
            <p id="session-label">Sessoin Length:</p>
            <p id="session-length">{sessionTime}</p>
            <button
               id="session-decrement"
               onClick={() => !state.running && changeTimerSetting("main", -1)}
            >
               -
            </button>
            <button
               id="session-increment"
               onClick={() => !state.running && changeTimerSetting("main", 1)}
            >
               +
            </button>
         </div>

         <div className="time-setting">
            <p id="break-label">Break Length:</p>
            <p id="break-length">{breakTime}</p>
            <button
               id="break-decrement"
               onClick={() => !state.running && changeTimerSetting("break", -1)}
            >
               -
            </button>
            <button
               id="break-increment"
               onClick={() => !state.running && changeTimerSetting("break", 1)}
            >
               +
            </button>
         </div>
      </section>
   );
}

export default App;
