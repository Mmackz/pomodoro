const accurateInterval = function (func, time) {
   let nextAt = new Date().getTime() + time;
   let timeout = null;
   const wrapper = () => {
      nextAt += time;
      timeout = setTimeout(wrapper, nextAt - new Date().getTime());
      return func();
   };
   const cancel = () => clearTimeout(timeout);
   timeout = setTimeout(wrapper, nextAt - new Date().getTime());
   return { cancel };
};

export default accurateInterval;

//http://stackoverflow.com/questions/8173580/setinterval-timing-slowly-drifts-away-from-staying-accurate