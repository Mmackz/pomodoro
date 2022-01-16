import formatTimeRemaining from "../../helpers/formatTime";

function Display(props) {
   const { remaining, reset, start, timerName } = props;

   return (
      <div className="display-container">
         <p id="timer-label">{timerName}</p>
         <p id="time-left">{formatTimeRemaining(remaining)}</p>
         <div className="start-stop-container">
            <button id="start_stop" onClick={start}>
               start/stop
            </button>
            <button id="reset" onClick={reset}>
               reset
            </button>
         </div>
      </div>
   );
}

export default Display;
