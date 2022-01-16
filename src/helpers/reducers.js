function reducer(state, action) {
   if (Array.isArray(action)) {
      let newState = { ...state };
      action.forEach((item) => {
         newState = reducer(newState, item);
      });
      return newState;
   }

   const { type, payload } = action;

   if (type === "running" && payload !== false) {
      return { ...state, running: !state.running };
   }
   return { ...state, [type]: payload };
}

export default reducer;
