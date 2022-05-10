

// Wait for the DOM to be loaded before initialising the media player
document.addEventListener("DOMContentLoaded", function() { initialiseMediaPlayer(); }, false);


// Variables to store handles to various required elements
var mediaPlayer;
var playPauseBtn;
var muteBtn;
var progressBar;
var progress;
var flag=0;




function initialiseMediaPlayer() {
    // Get a handle to the player
    mediaPlayer = document.getElementById('media-video');

    // Get handles to each of the buttons and required elements
    playPauseBtn = document.getElementById('play-pause-button');
    stopBtn = document.getElementById('stop-button');
    muteBtn = document.getElementById('mute-button');
    progressBar = document.getElementById('progress-bar');
    progress=document.getElementById('progress');

    // Hide the browser's default controls
    mediaPlayer.controls = false;

    // Add a listener for the timeupdate event so we can update the progress bar
    mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);

    // Add a listener for the play and pause events so the buttons state can be updated
    mediaPlayer.addEventListener('play', function() {
        // Change the button to be a pause button
        changeButtonType(playPauseBtn, 'pause');
    }, false);
    mediaPlayer.addEventListener('pause', function() {
        // Change the button to be a play button
        changeButtonType(playPauseBtn, 'play');
    }, false);

    // need to work on this one more...how to know it's muted?
    mediaPlayer.addEventListener('volumechange', function(e) {
        // Update the button to be mute/unmute
        if (mediaPlayer.muted) changeButtonType(muteBtn, 'unmute');
        else changeButtonType(muteBtn, 'mute');
    }, false);
    mediaPlayer.addEventListener('ended', function() { this.pause(); }, false);
}

function togglePlayPause() {

    var getIcon = document.getElementById('transportIcon');

    if (getIcon.classList.contains('fa-play')) {
        getIcon.classList.remove('fa-play');
        getIcon.classList.add('fa-pause');
        mediaPlayer.play();
    } else {
        getIcon.classList.remove('fa-pause');
        getIcon.classList.add('fa-play');
        mediaPlayer.pause();
    }
}

function changePos(event) {
    var box = progressBar.getBoundingClientRect();
    var pos = (event.pageX - box.left) / box.width;
    mediaPlayer.currentTime = (pos * mediaPlayer.duration).toString();
    // createClickLog("progBar", (pos * mediaPlayer.duration));
    // createVideoLog("progBar", d3.select("#myModal").select(".modal-title").attr("id"), (pos * mediaPlayer.duration));
}

// Stop the current media from playing, and return it to the start position
function stopPlayer() {
    mediaPlayer.pause();
    mediaPlayer.currentTime = 0;
    var getIcon = document.getElementById('transportIcon');

    if (getIcon.classList.contains('fa-play')) {
        getIcon.classList.remove('fa-play');
        getIcon.classList.add('fa-play');
    } else {
        getIcon.classList.remove('fa-pause');
        getIcon.classList.add('fa-play');
    }
}

// Changes the volume on the media player
// function changeVolume(direction) {
//     if (direction === '+') mediaPlayer.volume += mediaPlayer.volume == 1 ? 0 : 0.1;
//     else mediaPlayer.volume -= (mediaPlayer.volume == 0 ? 0 : 0.1);
//     mediaPlayer.volume = parseFloat(mediaPlayer.volume).toFixed(1);
// }

// Replays the media currently loaded in the player
function replayMedia() {
    resetPlayer();
    mediaPlayer.play();
}

// Update the progress bar
function updateProgressBar() {
    // Work out how much of the media has played via the duration and currentTime parameters
    var percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);
    // Update the progress bar's value
    progressBar.value = percentage;
    $("#dynamic")
        .css("width", percentage + "%")
        .attr("aria-valuenow", percentage);

}

// Updates a button's title, innerHTML and CSS class to a certain value
function changeButtonType(btn, value) {
    btn.title = value;
    // btn.innerHTML = value;
    // btn.className = value;

    var getIcon = document.getElementById('transportIcon');

    if(value=='pause'){
        if (getIcon.classList.contains('fa-play')) {
            getIcon.classList.remove('fa-play');
            getIcon.classList.add('fa-pause');
        } else {
            getIcon.classList.remove('fa-pause');
            getIcon.classList.add('fa-pause');
        }
    }

    if(value=='play'){
        if (getIcon.classList.contains('fa-play')) {
            getIcon.classList.remove('fa-play');
            getIcon.classList.add('fa-play');
        } else {
            getIcon.classList.remove('fa-pause');
            getIcon.classList.add('fa-play');
        }
    }

}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

  // Loads a video item into the media player
  function loadVideo() {
      var sourceVideo = 'assets/media/vid.mp4'
      mediaPlayer.src = sourceVideo;
      mediaPlayer.load();
  }

  function format(s) {
      m = Math.floor(s / 60);
      m = (m >= 10) ? m : "0" + m;
      s = Math.floor(s % 60);
      s = (s >= 10) ? s : "0" + s;
      return m + ":" + s;
    }

    function parseJSON(id){
//        console.log(id)
      var json = null;
//      console.log("assets/data/video" + (id).toString() + "-" + StudyCondition.toString() + ".json");
        StudyCondition = getCookie("StudyCondition")
        console.log(StudyCondition);
      $.ajax({
        'type': "Get",
        'async': false,
        'global': false,
        'url': "assets/data/video1" + "-" + StudyCondition.toString() + ".json",
        'dataType': "json",
        'success': function(data) {
          json = data;
        }
      });
      return json;
    }

    function onTrackedVideoFrameFirstPage(currentTime, duration){
        $("#current").text(format(currentTime)); //Change #current to currentTime
        $("#duration").text(format(duration))

    }

//this is the function that shows prompts
    function onTrackedVideoFrame(currentTime, duration){
        $("#current").text(format(currentTime)); //Change #current to currentTime
        $("#duration").text(format(duration))
        console.log(videoContent[currentPrompt])
        targetTime = videoContent[currentPrompt].time.end
//        question = videoContent[currentPrompt].label
        imgSource = videoContent[currentPrompt].src
//        console.log(question);
        if (currentTime > targetTime && currentTime < targetTime+1 && !popoverState){
          $("#popover").show('slow')
          togglePlayPause();
          playPauseBtn.disabled = true;
          stopBtn.disabled = true;
            //show prompt question here
            //document.getElementById('popoverQuestion').innerHTML = question;
          document.getElementById('signalThumbnail').src = imgSource;
          currentPrompt +=1
        }
    }

    function pausing_function(previousPrompt){
      endTime = videoContent[previousPrompt].time.end
      console.log(endTime);
      console.log(popoverState);
      if (mediaPlayer.currentTime > endTime && mediaPlayer.currentTime < endTime+1 && popoverState) {
        togglePlayPause();
        // remove the event listener after you paused the playback
        mediaPlayer.removeEventListener("timeupdate",pausing_function());
        }

    }

    function replaySection(){
      if (currentPrompt > 0){
        previousPrompt = currentPrompt-1;
      }
      else {
        previousPrompt = currentPrompt;
      }
      startTime = videoContent[previousPrompt].time.start
      console.log(startTime);
      mediaPlayer.currentTime =startTime;
      togglePlayPause();
      if (currentPrompt > 0){
        currentPrompt-=1;
      }
    }


function onVideoLoaded() {
    console.log("Video is loaded!");
};

// Resets the media player
function resetPlayer() {
    // Reset the progress bar to 0
    progressBar.value = 0;
    // Move the media back to the start
    mediaPlayer.currentTime = 0;
    // Ensure that the play pause button is set as 'play'
    // changeButtonType(playPauseBtn, 'play');
    var getIcon = document.getElementById('transportIcon');

    if (getIcon.classList.contains('fa-play')) {
        getIcon.classList.remove('fa-play');
        getIcon.classList.add('fa-pause');
    } else {
        getIcon.classList.remove('fa-pause');
        getIcon.classList.add('fa-pause');
    }
}


function jumpTo(){
      currentPrompt = document.getElementById("quantity").value;
      startTime = videoContent[currentPrompt].time.start
      console.log(startTime);
      mediaPlayer.currentTime =startTime;
      targetTime = videoContent[currentPrompt].time.end
      }

//function segment_buttons(start,end,explanations,associations) {
//
//    var elmnt = document.getElementById("progress-bar");
//    // var w= elmnt.offsetWidth;
//    var w = 410;
//    var h = 50;
//
//    var data=[];
//    var mPlayer = document.getElementById("media-video");
//    // console.log("video length: " + mPlayer.duration);
//    if (!mPlayer.duration)
//        console.log("ERROR: video has not been loaded yet !!")
//
//    for(var i=0; i<start.length; i++){
//
//        var obj={};
//        var startPercentage = start[i] / mPlayer.duration;
//        var startPosition = Math.floor(startPercentage * w);
//        // console.log(startPosition);
//
//        var endPercentage = end[i] / mPlayer.duration;
//        var endPosition = Math.floor(endPercentage * w);
//        var sequenceDuration = endPosition - startPosition;
//        if (sequenceDuration < 1) {
//            sequenceDuration = 1;
//        }
//
//        if (start[i] == 0 && end[i] == 1)
//            sequenceDuration = 0;
//
//        obj.pos = startPosition;
//        obj.width = sequenceDuration;
//        obj.start = start[i];
//        obj.end = end[i];
//        data.push(obj);
//    }
//
//    // console.log(data);
//
//    var svg= d3.select("#segment")
//        .append("svg")
//        .attr("width",w)
//        .attr("height",h)
//
//
//
//    //container for all buttons
//    var allButtons= svg.append("g")
//        .attr("id","allButtons")
//
//    //colors for different button states
//    var defaultColor = "#bfc7ff"; /*"#4dcee4";*/
//    var hoverColor = "#919ce0"; /*"#357487";*/
//    var pressedColor = "#80002a"; /*"#f3aea1";*/
//    var doubleColor ="#80002a";
//
//    //groups for each button (which will hold a rect and text)
//    var buttonGroups = allButtons.selectAll("g.button")
//        .data(data)
//        .enter()
//        .append("g")
//        .attr("class","button")
//        .style("cursor","pointer")
//        .on("click",function(d,i) {
//            d3.selectAll('image').attr("width","16").attr("height","16");
//            updateButtonColors(d3.select(this), d3.select(this.parentNode));
//            change_segment(d.start,d.end,explanations[i],associations[i]);
//            // createClickLog("segment", i);
//            createVideoLog("segm", d3.select("#myModal").select(".modal-title").attr("id"), i);
//
//            // d3.select("#numberToggle").text(i+1)
//        })
//        .on("mouseover", function() {
//            flag=false;
//            if ((d3.select(this).select("rect").attr("fill") != pressedColor)){
//                d3.select(this)
//                    .select("rect")
//                    .attr("fill",hoverColor);
//                    // .attr("width", function () {
//                    //     return d3.select(this).select("rect").attr("width")+5;
//                    // })
//                    // .attr("height", function () {
//                    //     return d3.select(this).select("rect").attr("height")+5;
//                    // });
//            }
//        })
//        .on("mouseout", function() {
//            if ((d3.select(this).select("rect").attr("fill") != pressedColor)) {
//                d3.select(this)
//                    .select("rect")
//                    .attr("fill",defaultColor);
//                    // .attr("width", function () {
//                    //     return d3.select(this).select("rect").attr("width")-5;
//                    // })
//                    // .attr("height", function () {
//                    //     return d3.select(this).select("rect").attr("height")-5;
//                    // });
//            }
//        });
//
//    console.log(explanations);
//    console.log("association" + associations);
//    loadData(explanations[0],associations[0]);
//
//
//    var bWidth= 20; //button width
//    var bHeight= 50; //button height
//    var bSpace= 10; //space between buttons
//    var x0= 20; //x offset
//    var y0= 0; //y offset
//
//
//    var Rect_buttons=buttonGroups.append("rect")
//        .attr("class","buttonRect")
//        .attr("width",function(d){return d.width;})
//        .attr("height",bHeight)
//        .attr("x",function(d) {return d.pos;})
//        .attr("y",y0)
//        .attr("rx",3) //rx and ry give the buttons rounded corners
//        // .attr("ry",3)
//        .attr("fill",function(d,i) {
//            // The first button is always pressed!
//            return (i!=0) ? defaultColor: pressedColor;
//        });
//
//    function updateButtonColors(button, parent) {
//        parent.selectAll("rect")
//            .attr("fill",defaultColor)
//
//        button.select("rect")
//            .attr("fill",pressedColor)
//    }
//
//    function updateButtonColors2(button, parent) {
//        parent.selectAll("rect")
//            .attr("fill",defaultColor)
//
//        button.select("rect")
//            .attr("fill",doubleColor)
//    }
//
//    // If no explanation or isPredictionTask, the progress bar should not move!;
//    if (localStorage.getItem("condition") == "0" || localStorage.getItem("condition") == "1") {
//        // console.log("hello");
//        mPlayer.currentTime = 0;
//    }
//    else
//        mediaPlayer.currentTime=start[0];
//
//    // mediaPlayer.currentTime = (pos * mediaPlayer.duration);
//
//    // if (localStorage.getItem("condition") == "4") {
//    //     createDropDownForNoSegmentConditions(data, explanations, associations);
//    // }
//
//}
//
//function change_segment(time,end,explanations,associations){
//    var t1=0;
//    var t2=0;
//    var t3=0;
//    var t4=0;
//    var t=0;
//    var timer_return_value=false;
//    var vid=document.getElementById("media-video");
//
//    t1=(time-Math.floor(time))*100;
//    t2=Math.floor(time)*60;
//    t2=t2+t1;
//
//
//    // if(time<1)
//    // {
//    // vid.currentTime=time*100;
//
//    // }
//    // else
//    // {
//    //   vid.currentTime=t2;
//
//    // }
//    vid.currentTime=time-0.20; //this -0.20 is for lagging the cursor a little bit if you want to play it automatically
//
//    // this block is for playing the segment automatically
//
//    if(vid.play());
//    else
//        vid.play();
//
//    // if you don't want it to play automatically just remove the block avobe and comment out the line below
//    // vid.pause();
//
//    // t=d3.timer(timeOut); //if you want the segment playing to stop, comment this line out
//
//    clear_list();
//    loadData(explanations, associations);
//}
//
//
//function clear_segment(){
//    d3.select('#segment').selectAll("svg").remove();
//}
//
//function createDropDownForNoSegmentConditions(dataToChangeTime, explanations, associations) {
//
//    // console.log(explanations);
//    d3.select("#segment").remove();
//    d3.select("#dropdown-div").remove();
//    var mainDiv =
//        d3.select("#segments-control")
//            .append("div")
//                .style("width", "100%")
//                .style("height", "50px")
//                .attr("id", "dropdown-div")
//            .append("div")
//                .classed("dropdown", true);
//    mainDiv.append("button")
//            .classed("btn btn-primary dropdown-toggle", true)
//            .attr("id", "dropdown-btn")
//            .attr("value", "0")
//            .attr("type", "button")
//            .attr("data-toggle", "dropdown")
//            .html("Explanation Set #1 ")
//            .append("span")
//            .classed("caret", true);
//
//    var dropdownMenu =
//        mainDiv.append("ul")
//        .classed("dropdown-menu", true);
//
//    dropdownMenu.selectAll("li")
//        .data(explanations)
//        .enter()
//        .append("li")
//        .append("a")
//        .html(function (d, i) {
//            // console.log("here! " + d);
//            return "Explanation Set #" + parseInt(i+1) + " ";
//        })
//        .on("click", function (d, i) {
//            d3.select("#dropdown-btn")
//                .attr("value", function () {
//                    return i;
//                })
//                .html(function () {
//                    return "Explanation Set #" + parseInt(i+1) + " ";
//                })
//                .append("span")
//                .classed("caret", true);
//
//            clear_list();
//            // mediaPlayer.currentTime=dataToChangeTime[i].start-0.20;
//            createClickLog ("rev", "dropdown");
//            loadData(explanations[i], associations[i]);
//        });
//}



