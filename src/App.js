import { useEffect, useState, useReducer } from "react";
import reducer from "./helpers/reducers";
import formatTimeRemaining from "./helpers/formatTime";

function App() {
   const [timeLimit, setTimeLimit] = useState(0.1);
   const [breakTime, setBreaktime] = useState(0.2);

   const initialState = {
      timeLimitMs: timeLimit * 60 * 1000,
      timeRemaining: timeLimit * 60 * 1000,
      startTimestamp: null,
      running: false,
      isBreakTime: false
   };

   const [state, dispatch] = useReducer(reducer, initialState);

   useEffect(() => {
      let timerId;
      if (state.running) {
         if (state.isBreakTime && state.timeRemaining <= 0) {
            dispatch({ type: "running", payload: false });
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
   }, [state, breakTime]);

   function resetTimer() {
      dispatch([
         { type: "timeLimitMs", payload: timeLimit * 60 * 1000 },
         { type: "timeRemaining", payload: timeLimit * 60 * 1000 },
         { type: "running", payload: false },
         { type: "isBreakTime", payload: false }
      ]);
   }

   function changeTimerSetting(limit, amount) {
      if (limit === "main") {
         if (timeLimit + amount > 0 && timeLimit + amount <= 60) {
            setTimeLimit((state) => state + amount);
            dispatch([
               {
                  type: "timeLimitMs",
                  payload: (timeLimit + amount) * 60 * 1000
               },
               {
                  type: "timeRemaining",
                  payload: (timeLimit + amount) * 60 * 1000
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
         <p>{formatTimeRemaining(state.timeRemaining)}</p>
         <button
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
         <button onClick={resetTimer}>reset</button>
         <p>{timeLimit}</p>
         <button
            onClick={() => !state.running && changeTimerSetting("main", -1)}
         >
            -
         </button>
         <button
            onClick={() => !state.running && changeTimerSetting("main", 1)}
         >
            +
         </button>

         <p>{breakTime}</p>
         <button
            onClick={() => !state.running && changeTimerSetting("break", -1)}
         >
            -
         </button>
         <button
            onClick={() => !state.running && changeTimerSetting("break", 1)}
         >
            +
         </button>
      </section>
   );
}

export default App;
