/**
 * increment facebook
 * Author: routeFlags.inc
 * Date: 5/8/14
 * License: Under Apache License, Version 2.0.
 */
var Facebook = function () {
    this.res_access_token;
    this.appId = '515770788569378';
};

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
//        document.getElementById('status').innerHTML = 'Please log ' +
//            'into this app.';
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
//        document.getElementById('status').innerHTML = 'Please log ' +
//            'into Facebook.';
    }
}

window.fbAsyncInit = function() {
    FB.init({
        appId      : this.appId,
        cookie     : true,  // enable cookies to allow the server to access
        // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.0' // use version 2.0
    });

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/ja_JP/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}

Facebook.prototype = {
    login: function () {
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
//
//        console.dir(FB);
//        FB.init({
//            appId: this.appId,
//            status: true,
//            cookie: true,
//            xfbml: true
//        });
//        FB.login(function (response) {
//            if (response.authResponse) {
//                this.res_access_token = FB.getAuthResponse()['accessToken'];
//            } else {
//                console.log('User cancelled login or did not fully authorize.');
//            }
//        }, {scope: 'publish_stream'});
    },
    post: function (displayMes, link, picPath) {
        FB.api('/me/feed'
            , 'post'
            , { access_token: this.res_access_token, name: 'P2Pであっち向いてホイッ！！', message: displayMes, picture: picPath, link: link, description: 'P2Pのビデオキャストゲーム☆'}
            , function (response) {
                if (!response || response.error) {
                    console.dir(response.error);
                } else {
                    console.dir(response.id);
                }
            }
        );
    },
    status: function () {
        FB.init({
            appId: this.appId,
            cookie: true,
            xfbml: true,
            status: true
        });
        FB.getLoginStatus(function (response) {
            if (response.authResponse) {
                this.res_access_token = response.authResponse.accessToken;
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    }
};
