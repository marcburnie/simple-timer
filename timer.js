/** @format */

//define new timer class
class Timer {
  constructor(duration, startButton, pauseButton, callbacks) {
    //time/duration property
    this.time = duration;
    //pass in pointers to buttons
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }
    //add event listeners to buttons and run corresponding methods
    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }
  //start timer
  start = () => {
    this.startButton.hidden = true;
    this.pauseButton.hidden = false;
    this.time.readOnly = true;

    if (this.onStart) this.onStart(this.timeRemaining);
    this.tick();
    this.interval = setInterval(this.tick, 20);
  };
  //pause timer
  pause = () => {
    this.startButton.hidden = false;
    this.pauseButton.hidden = true;
    this.time.readOnly = false;

    clearInterval(this.interval);
  };
  //update time
  onDurationChange() {
    console.log("Updating the timer");
  }
  //increment timer
  tick = () => {
    if (this.timeRemaining > 0) {
      this.timeRemaining = this.timeRemaining - 0.02;
      this.onTick && this.onTick(this.timeRemaining);
    } else {
      this.onComplete && this.onComplete();
      this.pause();
    }
  };

  get timeRemaining() {
    return parseFloat(this.time.value);
  }

  set timeRemaining(time) {
    return (this.time.value = time.toFixed(2));
  }
}
