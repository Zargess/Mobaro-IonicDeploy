$( document ).ready(function() {
    document.getElementById("btn").addEventListener("click", check);
});

var server = "https://api.ionic.io";
var snapshot = "616bee74-2f17-11e7-8d6e-fa54ca00d05b";
var app_id = "7e4ab2f8";
//var app_id = "7dfc895c";

var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MGE4Mjg4NS1kNjhjLTQyNzktYjAyMy01MTRjOWM0MzgwNDIifQ.44qzbHmUSc85yo6KDAkXPbyJeZ-I2zRKWkMKvfsr6vM";
//var token = "a82d34b880101d16526ee19505b9f496835a2c41695f8c3c";

function check() {
    
    var production = "75f2d410-0a3a-44d0-8240-08637eb5d2f8";
    //getSnapshot(snapshot);
    postDeviceDetails("", production);
    //getChannels();
}

function postDeviceDetails(uuid, channel_tag) {
    var endpoint = server + "/deploy/channels/" + channel_tag + "/check-device";

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
        success: function (data) { console.log(data); },
        failure: function (error) { console.log(error);}
    });
}

function getChannels() {
    var endpoint = server + "/deploy/channels";
    var page_size = 10;
    var page = 0;

    $.ajax({
        type: "GET",
        url: endpoint,
        data: JSON.stringify({
            page_size: page_size,
            page: page
        }),
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + token
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) { console.log(data); },
        failure: function (error) { console.log(error);}
    });
}

function getProductionChannel() {
    var production = "75f2d410-0a3a-44d0-8240-08637eb5d2f8";
    var endpoint = server + "/deploy/channels/" + production;

    $.ajax({
        type: "GET",
        url: endpoint,
        data: JSON.stringify({
        }),
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + token
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) { console.log(data); },
        failure: function (error) { console.log(error);}
    });
}

function getChannelByTag(channel_tag) {
    var endpoint = server + "/deploy/channels/" + channel_tag;

    $.ajax({
        type: "GET",
        url: endpoint,
        data: JSON.stringify({
        }),
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + token
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) { console.log(data); },
        failure: function (error) { console.log(error);}
    });
}

function getDeploysOnTag(channel, page_size, page) {
    var endpoint = server + "/deploys?channel=" + channel + "&page_size=" + page_size + "&page=" + page;

    $.ajax({
        type: "GET",
        url: endpoint,
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + token
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) { console.log(data); },
        failure: function (error) { console.log(error);}
    });
}

function getSnapshots(page_size, page, fields) {
    var endpoint = server + "/deploy/snapshots/";

    $.ajax({
        type: "GET",
        url: endpoint,
        data: JSON.stringify({
            page_size: page_size,
            page: page,
            fields: fields
        }),
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + token
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) { console.log(data); },
        failure: function (error) { console.log(error);}
    });
}

function getSnapshot(id) {
    var endpoint = server + "/deploy/snapshots/" + id;

    $.ajax({
        type: "GET",
        url: endpoint,
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + token
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) { console.log(data); },
        failure: function (error) { console.log(error);}
    });
}