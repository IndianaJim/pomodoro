$(document).ready(function () {
  var workTime = 25;
  var minutes = 0;
  var seconds = 0;
  var breakTime = 5;
  var running = 0;
  var output1 = document.getElementById("output");
  
  function reset(){
   //console.log("reset ran");
   running = 0;
   seconds = 0;
   minutes = workTime;
   output1.innerHTML = minutes + ":00";
   document.getElementById("startPause").innerHTML = 'Start';
  }  
  
  function increment(){
    if (running === 1){
      var timer = setTimeout(function(){
        if (seconds === 0){
          if (minutes != 0) {
            minutes = minutes - 1;
          }
          seconds = 59;
        }else{
          seconds = seconds - 1;
        }
        
        if ((seconds <= 0 && minutes <= 0) || running === 0){
          running = 0;
        }else{
          output1.innerHTML = minutes + ":" + seconds;
          increment();
        } 
        
      }, 1000);
    }
  }//end increment function
  function startPause(){
    //console.log("start pushed");
    if (running === 0){
      running = 1;
      document.getElementById("startPause").innerHTML = 'Pause';
      increment();
    }else{
      running = 0;
      document.getElementById("startPause").innerHTML = 'Resume';
    }
    
  }
  reset();
  $('#startPause').on('click', function(){
     startPause();
  })
  $('#reset').on('click', function(){
    if (running == 1)startPause();
    reset();
  })
  
});//end doc ready function