var MabaroTest = {
    // the echo function calls successCallback with the provided text in strInput
    // if strInput is empty, it will call the errorCallback
    echo:function(successCallback, errorCallback, strInput) {
        cordova.exec(successCallback,errorCallback,"EchoPlugin","echo",[strInput]);
    },
    getChannels:function(successCallback, errorCallback) {
        cordova.exec(successCallback,errorCallback,"EchoPlugin","getChannels");
    },
    check: function(app_id, channel_tag, success, failure) {
        cordova.exec(
            success,
            failure,
            'EchoPlugin',
            'check',
            [app_id, channel_tag]
        );
    }
}

window.echo = function(str, callback) {
    cordova.exec(callback, function(err) {
        callback('Nothing to echo.');
    }, "Echo", "echo", [str]);
};

window.getChannels = function(success, error) {
    cordova.exec(success, error, "Echo", "getChannels");
}

window.check = function(app_id, channel_tag, success, failure) {
    cordova.exec(success, failure, "Echo", "check", [app_id, channel_tag]);
}