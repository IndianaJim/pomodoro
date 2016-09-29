$(document).ready(function() {
  var minutes = 0;
  var seconds = 0;
  var running = 0;
  var output1 = document.getElementById("outputW");
  var breakTime = document.getElementById("breakTime");
  var workTime = document.getElementById("workTime");
  
  function reset() {
    //console.log("reset ran");
    running = 0;
    seconds = 0;
    minutes = workTime.innerHTML;
    output1.style.color = "#70C1B3";
    output1.innerHTML = minutes + ":00";
    document.getElementById("startPause").innerHTML = 'Start';
  }
   
  function increment() {
    if (running === 1) {
      var timer = setTimeout(function() {
        if (seconds === 0) {
          if (minutes != 0) {
            minutes = minutes - 1;
          }
          seconds = 59;
        } else {
          seconds = seconds - 1;
        }
        if (running === 0){
          //bail out of increment loop...
        }else if (seconds <= 0 && minutes <= 0) {
          //change color of text to other type via css id
          console.log(output1.style.color);
          if (output1.style.color == "rgb\(112, 193, 179\)") {
            output1.style.color = "#F25F5C";
            minutes = breakTime.innerHTML;
            seconds = 0;
          } else {
            output1.style.color = "#70C1B3";
            minutes = workTime.innerHTML;
            seconds = 0;
          }
          output1.innerHTML = minutes + ":00";
          running = 1;
          increment();
        } else {
          if (seconds < 10){
            output1.innerHTML = minutes + ":0" + seconds;
          }else{
            output1.innerHTML = minutes + ":" + seconds;
          }
          increment();
        }

      }, 1000);
    }
  } //end increment function
  
  function startPause() {
    //console.log("start pushed");
    if (running === 0) {
      running = 1;
      document.getElementById("startPause").innerHTML = 'Pause';
      increment();
    } else {
      running = 0;
      document.getElementById("startPause").innerHTML = 'Resume';
    }

  }

  //initialize timer on page load
  reset();

  $('#startPause').on('click', function() {
    startPause();
  })
  $('#reset').on('click', function() {
    if (running == 1) startPause();
    reset();
  })
  $('#breakMinus').on('click', function() {
    if (breakTime.innerHTML > 0) {
      breakTime.innerHTML = Number(breakTime.innerHTML) - 1;
    }
  })
  $('#breakPlus').on('click', function() {
    breakTime.innerHTML = Number(breakTime.innerHTML) + 1;
  })
  $('#workMinus').on('click', function() {
    if (workTime.innerHTML > 0) {
      workTime.innerHTML = Number(workTime.innerHTML) - 1;
      if (running == 1){
       startPause();
       reset();
      }else{
        reset();
      }
    }
  })
  $('#workPlus').on('click', function() {
    workTime.innerHTML = Number(workTime.innerHTML) + 1;
     if (running == 1){
       startPause();
       reset();
      }else{
        reset();
      }
  })

}); //end doc ready function