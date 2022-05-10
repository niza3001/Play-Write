function saveTextAsFile() {
  var textToWrite = document.getElementsByClassName('trumbowyg-editor')[0].innerText;
  var textFileAsBlob = new Blob([ textToWrite ], { type: 'text/plain' });
  var fileNameToSaveAs = "stories/writtenStory.txt";

  var downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  if (window.webkitURL != null) {
    // Chrome allows the link to be clicked without actually adding it to the DOM.
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  } else {
    // Firefox requires the link to be added to the DOM before it can be clicked.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }

  downloadLink.click();
}

function destroyClickedElement(event) {
  // remove the link from the DOM
  document.body.removeChild(event.target);
}

function CutnPaste() {
    // document.getElementById('popover-editor').style.color = "blue";
    playPauseBtn = document.getElementById('play-pause-button');
    stopBtn = document.getElementById('stop-button');
    var tObj = $("#guide-buttons")
    var content = document.getElementById('popover-editor').value;
    document.getElementsByClassName('trumbowyg-editor')[0].innerHTML += "<span style=\"color:blue\">" + content + "</span><br>"
    document.getElementById('popover-editor').value = "";
    //  document.getElementsByClassName('trumbowyg-editor')[0].style.color = "black";
    $("#popover").hide('slow')
    togglePlayPause();
    playPauseBtn.disabled = false;
    stopBtn.disabled = false;
    tObj.html("");
    $('#popover-submit').addClass("disabled")
    $('#popover-submit').attr('disabled', 'disabled');
//    document.cookie = "writing=" + document.getElementsByClassName('trumbowyg-editor')[0].innerHTML
//    writtenStory = getCookie("writing")
//    console.log(writtenStory)
    }


function paste() {
     if(window.clipboardData) {
       document.getElementById('txtapaste').value = window.clipboardData.getData("Text");
     }
}


function showGuide(){
  arr = videoContent[currentPrompt-1].words
  tObj = $("#guide-buttons")
  mainBtn = $("#showGuide")
  if(!guideState){
    guideState = !guideState
    mainBtn.attr('src', 'assets/media/hideIcon.png');
    tObj.html("");
    // tobj.attr
    $.each(arr, function(k, v){
      var btn = $("<button>", {
        class: "col-sm btn btn-default disabled",
        style: "margin: 5px; cursor:default; opacity: 1;",
        id: v }).html(v).appendTo(tObj);
    });
  }
  else if (guideState){
    guideState = !guideState
    mainBtn.attr('src', 'assets/media/showIcon.png');
    tObj.html("");
  }
}

$('#popover-editor').keyup(function() {
    if($(this).val().length != 0) {
      $('#popover-submit').removeClass("disabled")
      $('#popover-submit').removeAttr('disabled');
    }
    else {
      $('#popover-submit').addClass("disabled")
      $('#popover-submit').attr('disabled', 'disabled');
    }
 });
