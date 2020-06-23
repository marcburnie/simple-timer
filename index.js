/** @format */

const duration = document.querySelector("#duration");
const start = document.querySelector("#start");
const pause = document.querySelector("#pause");
const circle = document.querySelector("circle");

const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);

let total;
const startColor = 130;
const endColor = 0;
circle.style.stroke = `hsl(${startColor}, 100%, 50%)`;

const timer = new Timer(duration, start, pause, {
  onStart(totalDuration) {
    total = totalDuration;
  },
  onTick(timeRemaining) {
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / total - perimeter
    );
    circle.style.stroke = `hsl(${
      (startColor * timeRemaining) / total + endColor
    }, 100%, 50%)`;
  },
  onComplete() {
    console.log("Timer finished");
  },
});
