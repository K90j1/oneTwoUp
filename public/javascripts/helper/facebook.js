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

Facebook.prototype = {
    login: function () {
        FB.init({
            appId: this.appId,
            status: true,
            cookie: true,
            xfbml: true
        });

        FB.login(function (response) {
            if (response.authResponse) {
                this.res_access_token = FB.getAuthResponse()['accessToken'];
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'publish_stream'});
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
