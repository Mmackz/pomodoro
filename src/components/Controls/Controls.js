function Controls({ state, changeSetting }) {
   const { sessionLength, breakLength, running } = state;

   return (
      <section className="controls-container">
         <div className="time-setting">
            <p id="session-label">Session</p>
            <div className="number-box">
               <button
                  aria-label="decrease session time"
                  id="session-decrement"
                  onClick={() => !running && changeSetting("session", -1)}
               >
                  <i className="fas fa-minus"></i>
               </button>
               <p id="session-length">{sessionLength}</p>

               <button
                  aria-label="increase session time"
                  id="session-increment"
                  onClick={() => !running && changeSetting("session", 1)}
               >
                  <i className="fas fa-plus"></i>
               </button>
            </div>
         </div>

         <div className="time-setting">
            <p id="break-label">Break</p>
            <div className="number-box">
               <button
                  aria-label="decrease break time"
                  id="break-decrement"
                  onClick={() => !running && changeSetting("break", -1)}
               >
                  <i className="fas fa-minus"></i>
               </button>
               <p id="break-length">{breakLength}</p>

               <button
                  aria-label="increase break time"
                  id="break-increment"
                  onClick={() => !running && changeSetting("break", 1)}
               >
                  <i className="fas fa-plus"></i>
               </button>
            </div>
         </div>
      </section>
   );
}

export default Controls;
