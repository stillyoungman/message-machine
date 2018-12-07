'use strict'

function handleSend() {
    toastr["success"]("message", "title");
}

function handleNewConnection() {
    toastr["info"]("message", "title")
}

function playSound(filename){
    var mp3Source = '<source src="assets/' + filename + '.mp3" type="audio/mpeg">';
    var oggSource = '<source src="assets/' + filename + '.ogg" type="audio/ogg">';
    var embedSource = '<embed hidden="true" autostart="true" loop="false" src="' + filename +'.mp3">';
    document.getElementById("sound").innerHTML='<audio autoplay="autoplay">' + mp3Source + oggSource + embedSource + '</audio>';
  }