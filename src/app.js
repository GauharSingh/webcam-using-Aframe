const webcamElement = document.getElementById("webcam");
const canvasElement = document.getElementById("canvas");
//const canvasElement = document.querySelector("a-scene").canvas;

//document.querySelector("a-scene").canvas.getContext("webgl");
//document.getElementById("canvas").getContext("2d");

const snapSoundElement = document.getElementById("snapSound");

const webcam = new Webcam(
  webcamElement,
  "user",
  canvasElement,
  snapSoundElement
);

let flag = true;

$("#webcam-switch").on("click", function () {
  if (flag) {
    $(".md-modal").addClass("md-show");
    flag = false;
    webcam
      .start()
      .then((result) => {
        cameraStarted();

        console.log("webcam started");
      })
      .catch((err) => {
        displayError(err);
      });
  } else {
    cameraStopped();
    webcam.stop();
    console.log("webcam stopped");
    flag = true;
  }
});
function displayError(err) {
  console.log(err.message);
}

function cameraStarted() {
  $(".flash").hide();
  $("#scene").removeClass("d-none");
  $("#controls").removeClass("d-none");
}

function cameraStopped() {
  $(".md-modal").removeClass("md-show");
  $("#scene").addClass("d-none");
  $("#controls").addClass("d-none");
}

$("#take-photo").click(function () {
  beforeTakePhoto();
  let picture = webcam.snap();
  document.querySelector("#download-photo").href = picture;
  afterTakePhoto();
});

function beforeTakePhoto() {
  $(".flash")
    .show()
    .animate({ opacity: 0.3 }, 500)
    .fadeOut(500)
    .css({ opacity: 0.7 });
}

function afterTakePhoto() {
  webcam.stop();
  $("#canvas").removeClass("d-none");
  $("#take-photo").addClass("d-none");
  $("#exit-app").removeClass("d-none");
  $("#download-photo").removeClass("d-none");
  $("#resume-camera").removeClass("d-none");
}

function removeCapture() {
  $("#canvas").addClass("d-none");
  $("#take-photo").removeClass("d-none");
  $("#exit-app").addClass("d-none");
  $("#download-photo").addClass("d-none");
  $("#resume-camera").addClass("d-none");
}

$("#resume-camera").click(function () {
  webcam.stream().then((facingMode) => {
    removeCapture();
  });
});

$("#exit-app").click(function () {
  removeCapture();
  $("#webcam-switch").prop("href", "#").click();
});
