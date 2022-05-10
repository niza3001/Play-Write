//This file contains all the global variables used in the app.

//ID of current prompt. It is set to 0 at start time.
var currentPrompt = 0;

//State of the popover (visible or hidden)
popoverState = $("#popover").is(':visible');

//current video ID. defaults to 0 -- the first video.
var videoID = 1;

//variable to hold the JSON file content corresponding to current video. It is empty at start time.
var videoContent;

var guideState = false;

//default condition - currently set to time-based prompts
var StudyCondition;

function initStudyCondition(radioValue){
    if(radioValue){
        console.log("Your are a - " + radioValue);
        switch(radioValue) {
          case "Group 1":
                //Segmenting prompt group
            StudyCondition = 1;
            document.cookie = "StudyCondition=1";
            break;
                //Signalling prompt group
          case "Group 2":
            StudyCondition = 2;
            document.cookie = "StudyCondition=2";
            break;
                //Signalling prompt group
//                      case "Group 3":
//                        StudyCondition = 3;
//                        break;
        }
     }
    console.log(StudyCondition)
}

                