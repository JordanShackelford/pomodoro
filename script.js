//TODO: DRY code off. Create and use more functions e.g. one function that handles all the timer buttons, one function to update the timer screens

$(document).ready(function() {
  var alarmSound = new Audio();
  alarmSound.src = "http://www.orangefreesounds.com/wp-content/uploads/2015/04/Loud-alarm-clock-sound.mp3";
  var currentMode = "work";
  var defaultWorkTime = 25;
  var defaultBreakTime = 5;
  var time;
  var intervalID;
  var workTime = defaultWorkTime;
  var breakTime = defaultBreakTime;
  var timeLeft = 0;
  var paused = false;
  var isRunning = false;
  updateWorkTime();
  updateBreakTime();

  $("#start").click(function() {
    $(".timerButton").addClass("disabled");
    if (currentMode === "work") {
      $("#workContainer .marching-ants").addClass("marching-ants-active");
      time = workTime;
    } else if (currentMode === "break") {
      $("#breakTimer").addClass("selectedTimer");
      time = breakTime;
    }

    if (!isRunning) {
      isRunning = true;
      var timeStarted = Date.now();
      if (paused) {       
        timeStarted -= (time * 60000) - timeLeft;
        paused = false;
      }
      intervalID = setInterval(function() {
        if (isRunning) {
          timeSinceStarting = Date.now() - timeStarted;
          timeLeftFromLastSession = timeLeft;
          paused = false;
          timeLeft = (time * 60000) - timeSinceStarting;
          if(timeLeft > 1000){
            if (currentMode === "work") {
              $("#workTime").text(millisToMinutesAndSeconds(timeLeft));
            } else if (currentMode === "break") {
              $("breakTime").text(millisToMinutesAndSeconds(timeLeft));
            }
          } else {
            stop();
          }
        } else {
          stop();
        }
      },1000);
    }
  });
  $("#stop").click(function() {
    paused = true;
    stop();
  });
  
  $("#workPlus").click(function() {
    if (!isRunning && timeLeft === 0) { 
      workTime += 1;
      defaultWorkTime += 1;
      updateWorkTime();
      $("#workMinus").removeClass("disabled");
    }
  });
  $("#workMinus").click(function() {
    if (!isRunning && timeLeft === 0 && workTime > 1) {
      workTime -= 1;
      defaultWorkTime -= 1;
      updateWorkTime();
      if(workTime === 1){
        $("#workMinus").addClass("disabled");
      }
    }
  });
  $("#breakPlus").click(function() {
    if (!isRunning && timeLeft === 0) {
      breakTime += 1;
      defaultBreakTime += 1;
      updateBreakTime();
      $("#breakMinus").removeClass("disabled");
    }
  });
  $("#breakMinus").click(function() {
    if (!isRunning  && timeLeft === 0 && breakTime > 1) {
      breakTime -= 1;
      defaultBreakTime -=1;
      updateBreakTime();
      if(breakTime === 1){
        $("#breakMinus").addClass("disabled");
      }
    }
  });

  $("#reset").click(function() {
    stop();
    $(".timerButton").removeClass("disabled");
    currentMode = "work";
    workTime = defaultWorkTime;
    breakTime = defaultBreakTime;
    isRunning = false;
    timeLeft = 0;
    paused = false;
    updateWorkTime();
    updateBreakTime();
  });
  
  function stop(){
    $(".marching-ants-active").removeClass("marching-ants-active");
    clearInterval(intervalID);
    isRunning = false;
  }
  
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  function updateWorkTime() {
    $("#workTime").text(workTime + ":00");
  }

  function updateBreakTime() {
    $("#breakTime").text(breakTime + ":00");
  }
  
  
  //not being used yet. not tested yet.
  function updateTime(timerID,time){
    $(timerID).text(time + ":00"); 
  }
});