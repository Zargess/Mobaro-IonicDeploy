// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
var active = false;

$(document).ready(function () {
    if (active) return;
    document.getElementById("btn").addEventListener("click", check);
    document.getElementById("extract-btn").addEventListener("click", function () {
        window.extract("test", console.log, console.log);
    });
    active = true;
});

var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MGE4Mjg4NS1kNjhjLTQyNzktYjAyMy01MTRjOWM0MzgwNDIifQ.44qzbHmUSc85yo6KDAkXPbyJeZ-I2zRKWkMKvfsr6vM"

function check() {
    console.log("Clicked")
    var deployed_version = "";
    var channel_tag = "production";
    //postDeviceDetails(deployed_version, channel_tag);
    //window.echo("Test", console.log);
    //window.getChannels(function success(response) {
    //    console.log(response);
    //}, console.log);

    window.check("test", channel_tag, console.log, console.log);
}

function postDeviceDetails(uuid, channel_tag) {
    var server = "https://api.ionic.io";
    var app_id = "7e4ab2f8";
    var endpoint = server + "/deploy/channels/" + channel_tag + "/check-device";
    window.getChannels();
    var device_details = {
        binary_version: "0.0.1",
        platform: "android"
    };

    var json = {
        channel_tag: channel_tag,
        app_id: app_id,
        device: device_details
    };

    $.ajax({
        type: "POST",
        url: endpoint,
        data: JSON.stringify(json),
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + token
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            window.echo(data, console.log);
        },
        failure: function (error) { console.log(error); }
    });
}



function Log(message) {
    var textare = getid("outputField");
    textare.innerHTML += message + "\r\n";
    textare.style.height = textare.scrollHeight + 'px';
}

function getid(elementId) {
    return document.getElementById(elementId);
}
