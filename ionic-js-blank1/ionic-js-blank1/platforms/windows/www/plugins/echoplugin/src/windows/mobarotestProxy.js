cordova.define("echoplugin.MobaroProxy", function(require, exports, module) {
var server = "https://api.ionic.io";
var snapshot = "616bee74-2f17-11e7-8d6e-fa54ca00d05b";
var app_id = "7e4ab2f8";
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MGE4Mjg4NS1kNjhjLTQyNzktYjAyMy01MTRjOWM0MzgwNDIifQ.44qzbHmUSc85yo6KDAkXPbyJeZ-I2zRKWkMKvfsr6vM";

function networkCall(endpoint, data, type, success, error) {
    WinJS.xhr({
        type: type,
        url: endpoint,
        responseType: "json",
        data: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json; charset=utf-8"
        }
    }).done(
        function completed(result) {
            if (result.status === 200) {
                //success(result.response);
                console.log("Testing!");
                success(result.response.meta);
            } else {
                error(result.response);
            }
        },
        function error(result) {
            console.log(result);
        },
        function progress(result) {
            //console.log(result);
        }
    );
}

function DownloadFile(uriString, fileName) {
    try {
        console.log("started");

        var applicationData = Windows.Storage.ApplicationData.current;
        console.log("applicationData", applicationData.localFolder.path);

        applicationData.localFolder
            .createFileAsync(fileName, Windows.Storage.CreationCollisionOption.generateUniqueName)
            .done(function (newFile) {
                console.log("test")
                var uri = Windows.Foundation.Uri(uriString);
                var downloader = new Windows.Networking.BackgroundTransfer.BackgroundDownloader();
                download = downloader.createDownload(uri, newFile);
                promise = download.startAsync()
                    .then(function () {
                        console.log("success");
                    }, error, function () {
                        console.log("progress");
                    });
            }, error);
    } catch (err) {
        error("error", err);
    }
};


function error(err) {
    console.log('err', err);
}

cordova.commandProxy.add("Echo",{
    echo:function(successCallback,errorCallback,strInput) {
        WinJS.Utilities.startLog("test");
        WinJS.log("Testing WinJS", "test", "custom");
        if(!strInput || !strInput.length) {
            errorCallback("Error, something was wrong with the input string. =>" + strInput);
        }
        else {
            successCallback(strInput + "echo");
        }
    },
    getChannels:function(success, error) {
        var page_size = 10;
        var page = 0;
        var endpoint = server + "/deploy/channels" + "?page_size=" + page_size + "&page=" + page

        WinJS.Utilities.startLog("test");
        WinJS.log("Testing another function", "test", "custom");

        networkCall(endpoint, {}, "GET", success, error);
    },
    check: function(success, error, input) {
        var channel_tag = input[1];
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

        networkCall(endpoint, json, "post", success, error);
    }
});
});
