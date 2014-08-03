/**
 * Author: Coronet Internet Service
 * Date: 11/9/13
 * License: Under Apache License, Version 2.0.
 */

var webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'localVideo',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remotes',
    // immediately ask for camera access
    autoRequestMedia: true,
    debug: true,
    detectSpeakingEvents: false,
    autoAdjustMic: true
});
var CHALLENGER = "挑戦者:";
var CHAMPION = "王者:";
var ALERT = "カメラの利用を許可してください";
var ANSWER_MES = "結果は、";
var arrow;
var urlPrams = location.search && location.search.split('?')[1];

// for Challenger
if (urlPrams.split('&')[1] == 'token') {
    // Challenger is coming
    location.href = location.origin + '/challenger.html';
    localStorage['storeEntryChallenger'] = JSON.stringify({roomName: urlPrams.split('&')[0], token: 'token'});
// for Champion
} else if (!localStorage['storeEntryChallenger']) {
    jQuery("#workArea").append(championLoginForm());
    console.log('01 - Load championLoginForm()');
    jQuery('form').submit(function () {
        if (jQuery('#localVideo').attr('src') == undefined) {
            alert(ALERT);
            return false;
        }
        var roomName = jQuery('#sessionInput').val().toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
        webrtc.createRoom(roomName, function (err, name) {
            var storeData = {roomName: name};
            localStorage['storeChampion'] = JSON.stringify(storeData);
            if (!err) {
                _setRoom(name);
            } else {
                console.log(err);
            }
        });
        return false;
    });
// for Challenger
} else if (localStorage['storeChallenger']) {
    localStorage.removeItem('storeEntryChallenger');
    var storeChallenger = JSON.parse(localStorage['storeChallenger']);
    _setRoomChallenger();
    webrtc.on('readyToCall', function () {
        webrtc.joinRoom(JSON.parse(localStorage['storeChallenger']).roomName);
    });
    _mute();
}

function _setRoom(name) {
    // Champion
    console.log('02 - Load championWaiting()');
    var videoVal = jQuery('#localVideo');
    jQuery('body').addClass('active');
    jQuery('#workArea').empty().append(championWaiting());
    jQuery('#alert').html('<strong>"' + name + '"</strong>のリングが用意できました');
//        jQuery('#status').text('Champion 0 Wins NOW!');
    jQuery('#url').text(location.href + "?" + name + '&token');
    jQuery('#localVideoArea').html(videoVal);
    jQuery('#localTitle').text(CHAMPION + ' ' + name);
    videoVal.load();
    videoVal.css('display', 'block');
    _mute();
    setTimeout(function () {
        jQuery('#alert').fadeOut("slow", function () {
            jQuery('#functionality').css('display', 'none');
        });
    }, 3000);
    jQuery('#facebook').click(function () {
        var linkUrl = location.href + '&token';
        var imgSrc = 'https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-frc3/p480x480/1394195_10201139872958743_665625604_n.jpg';
        fbLogin();
        postFeed('This game for nko4, challenge it ?', linkUrl, imgSrc);
    });
    return true;
}

function _setRoomChallenger() {
    jQuery('body').addClass('active');
    jQuery('#workArea').empty().append(championWaiting());
    jQuery('#localVideoArea').html('<video id="localVideo"></video>');
    console.log('07 - Load challengerWaiting');
    jQuery('#alert').css('display', 'none');
    jQuery('#battleArea').css('display', 'none');
    jQuery('#invite').css('display', 'none');
    jQuery('#status').css('display', 'none');
    jQuery('#functionality').fadeOut("slow", function () {
        jQuery('#functionality').css('display', 'none');
    });
    jQuery('#waitingMessage').html("<div class='panel panel-warning'>" +
        "<div class='panel-heading'>" +
        "<h2>案内</h2></div>" +
        "<div class='panel-body'>" +
        "<i class='fa fa-video-camera'></i> " + ALERT +
        "<br><small>ゲームが始まりませんか？もしかしたらホストはどこかに行ってしまったかもしれないです　" +
        "<a href='http://routeflags.2013.nodeknockout.com/'>再スタートはこちら</a></small>" +
        "</div>" +
        "</div>");
    return true;
}


function _videoCasting() {
    webrtc.on('message', function (data) {
        if (data.nickName) {
            jQuery('#localTitle').text(CHALLENGER + ' ' + data.nickName);
        }
        if (data.arrow) {
            arrow = data.arrow;
            jQuery('#waitingMessage').html(CHAMPION + ' ' + JSON.parse(localStorage['storeChallenger']).roomName + ' が方向をセットしました！？　上下左右を向いてください');
            _countDown(0)
        }
        console.dir(data);
    });
    if (!localStorage['storeChampion']) {
        return;
    }
    var arrowArea = jQuery('#arrowArea');
    arrowArea.css('display', 'block');
    var localVideo = jQuery('#localVideo');
    localVideo.css('display', 'block');
    jQuery('#alert').css('display', 'none');
    // Challenger
    if (location.search.split('?')[1]) {
        console.log('08 - Load challengerVideoCasting');
        _mute();
        jQuery('#battleArea').css('display', 'block');
        jQuery('#tutorial').css('display', 'none');
        console.dir(localStorage['storeChallenger']);
        var nickName = JSON.parse(localStorage['storeChallenger']).nickName;
        jQuery('#localTitle').text(CHALLENGER + ' ' + nickName);
        jQuery('#remoteTitle').text(CHAMPION + ' ' + JSON.parse(localStorage['storeChallenger']).roomName);
        localVideo.load();
        arrowArea.css('display', 'none');
        jQuery('#waitingMessage').html(CHAMPION + ' ' + JSON.parse(localStorage['storeChallenger']).roomName + ' が準備中...<i class="fa fa-refresh fa-spin"></i>');
        webrtc.webrtc.sendToAll('message', {nickName: nickName});
        return;
    }
    // Champion
    _mute();
    console.log('03 - Load VideoCasting');
    jQuery('#functionality').fadeOut("slow", function () {
        jQuery('#functionality').css('display', 'none');
    });
    jQuery('#tutorial').css('display', 'none');
    var message = "UP, RIGHT, DOWN, LEFTからひとつ選んでください";
    jQuery('#waitingMessage').html(message);
    jQuery('#localTitle').text(CHALLENGER + ' ');
    jQuery('#remoteTitle').text(CHAMPION + ' ' + JSON.parse(localStorage['storeChampion']).roomName);

    jQuery('.arrow').click(function () {
        console.log(jQuery(this).attr('name'));
        arrow = jQuery(this).attr('name');
        console.log('05 - Result (will be here disp of judge)');
        //@todo add arrow on remote video
        webrtc.webrtc.sendToAll('message', {arrow: arrow});
        _countDown(1)
    });
    _callLeapMotion();
}

// Champion
function _snapShot() {
    console.log('_snapShot');
    //@todo add effect about white out
    var battleCanvas = jQuery('#battleCanvas');
    battleCanvas.attr('width', 640);
    battleCanvas.attr('height', 480);
    var canvasCtx = jQuery('#battleCanvas')[0].getContext('2d');
    canvasCtx.drawImage(jQuery('#remotes video')[0], 0, 0);
    jQuery('#screenShot').attr('src', battleCanvas[0].toDataURL('image/png'));
    var arrowArea = document.getElementById('arrowArea');
    arrowArea.parentNode.removeChild(arrowArea);
    jQuery('#waitingMessage').html('');

    setResultArrow();
}

function _countDown(role) {
    var status = jQuery('#status');
    status.html('5');
    status.css('font-size', '38px');
    setTimeout(function () {
        status.fadeIn("fast", function () {
            status.fadeOut("slow", function () {
                status.html('4');
                status.css('font-size', '38px');
                setTimeout(function () {
                    status.fadeIn("fast", function () {
                        status.fadeOut("slow", function () {
                            status.html('3');
                            status.css('font-size', '38px');
                            setTimeout(function () {
                                status.fadeIn("fast", function () {
                                    status.fadeOut("slow", function () {
                                        status.html('2');
                                        status.css('font-size', '38px');
                                        setTimeout(function () {
                                            status.fadeIn("fast", function () {
                                                status.fadeOut("slow", function () {
                                                    status.html('1');
                                                    status.css('font-size', '38px');
                                                    setTimeout(function () {
                                                        status.fadeIn("fast", function () {
                                                            status.fadeOut("slow", function () {
                                                                status.html('Fight!!');
                                                                status.css('font-size', '38px');
                                                                setTimeout(function () {
                                                                    status.fadeIn("fast", function () {
                                                                        if (role == 1) {
                                                                            status.fadeOut("slow", function () {
                                                                                _snapShot();
                                                                                jQuery('#waitingMessage').text('SCREEN SHOT!!!');
                                                                                setTimeout(function () {
//                                                                                    location.href = jQuery('#screenShot').attr('src');
                                                                                }, 400);
                                                                            });
                                                                        } else {
                                                                            status.fadeOut("slow", function () {
                                                                                setTimeout(function () {
                                                                                    _snapShot2();
                                                                                }, 400);
                                                                            });
                                                                        }
                                                                    });
                                                                }, 50);
                                                            });
                                                        });
                                                    }, 50);
                                                });
                                            });
                                        }, 50);
                                    });
                                });
                            }, 50);
                        });
                    });
                }, 50);
            });
        });
    }, 50);
}


function _snapShot2() {
    //@todo add effect about white out
    var battleCanvas = jQuery('#battleCanvas');
    battleCanvas.attr('width', 640);
    battleCanvas.attr('height', 480);
    var canvasCtx = battleCanvas[0].getContext('2d');
    canvasCtx.drawImage(jQuery('#localVideo')[0], 0, 0);
    jQuery('#screenShot').attr('src', battleCanvas[0].toDataURL('image/png'));
    jQuery('#waitingMessage').html('');
    setResultArrow();
}

function setResultArrow(){
    var videoArea = document.getElementById('localVideo');
    videoArea.parentNode.removeChild(videoArea);
    var remoteVideoArea = document.getElementById('remotes');
    remoteVideoArea.parentNode.removeChild(remoteVideoArea);
    switch (arrow) {
        case 'top':
            jQuery('#battleArea').html('' +
                '<div class="alert alert-info">' +
                '<h3>' + ANSWER_MES + ' <i class="fa fa-arrow-circle-o-up fa-4x"></i></h3>' +
                '</div>');
            break;
        case 'right':
            jQuery('#battleArea').html('' +
                '<div class="alert alert-info">' +
                '<h3>' + ANSWER_MES + ' <i class="fa fa-arrow-circle-o-right fa-4x"></i></h3>' +
                '</div>');
            break;
        case 'left':
            jQuery('#battleArea').html('' +
                '<div class="alert alert-info">' +
                '<h3>' + ANSWER_MES + ' <i class="fa fa-arrow-circle-o-left fa-4x"></i></h3>' +
                '</div>');
            break;
        case 'bottom':
            jQuery('#battleArea').html('' +
                '<div class="alert alert-info">' +
                '<h3>' + ANSWER_MES + ' <i class="fa fa-arrow-circle-o-down fa-4x"></i></h3>' +
                '</div>');
            break;
        default :
            break;
    }
}

function _showResult() {
    _countDown(2);
    jQuery('#waitingMessage').text('SCREEN SHOT!!');
//
//    jQuery('#battleArea').html("<button class='btn btn-07' type='submit' id='postFb'>" +
//        "<i class='fa fa-facebook-square'></i> | Post to Facebook</button>");
//    jQuery('#postFb').click(function(){
//        fbLogin();
//        var data = jQuery('#screenShot').attr('src');
//        var encodedPng = data.substring(data.indexOf(',') + 1, data.length);
//        var decodedPng = Base64Binary.decode(encodedPng);
//        FB.init({
//            appId: '628717840508281',
//            cookie: true,
//            xfbml: true,
//            status: true
//        });
//
//        FB.getLoginStatus(function (response) {
//            if (response.authResponse) {
//                res_access_token = response.authResponse.accessToken;
//                _postImageToFacebook(response.authResponse.accessToken, "atttititit", "image/png", decodedPng, "routeflags.2013.nodeknockout.com");
//            } else {
//                console.log('User cancelled login or did not fully authorize.');
//            }
//        });
//    });
}


function _postImageToFacebook(authToken, filename, mimeType, imageData, message) {
    // this is the multipart/form-data boundary we'll use
    var boundary = '----ThisIsTheBoundary1234567890';
    // let's encode our image file, which is contained in the var
    var formData = '--' + boundary + '\r\n';
    formData += 'Content-Disposition: form-data; name="source"; filename="' + filename + '"\r\n';
    formData += 'Content-Type: ' + mimeType + '\r\n\r\n';
    for (var i = 0; i < imageData.length; ++i) {
        formData += String.fromCharCode(imageData[ i ] & 0xff);
    }
    formData += '\r\n';
    formData += '--' + boundary + '\r\n';
    formData += 'Content-Disposition: form-data; name="message"\r\n\r\n';
    formData += message + '\r\n';
    formData += '--' + boundary + '--\r\n';

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://graph.facebook.com/me/photos?access_token=' + authToken, true);
    xhr.onload = xhr.onerror = function () {
        console.log(xhr.responseText);
    };
    xhr.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + boundary);
    xhr.sendAsBinary(formData);
}

function moveFinger(Finger, posX, posY, posZ, dirX, dirY, dirZ) {
    Finger.style.webkitTransform = Finger.style.mozTransform =
        Finger.style.transform = "translateX(" + posX + "px) translateY(" + posY + "px) translateZ(" + posZ + "px) rotateX(" + dirX + "deg) rotateY(0deg) rotateZ(" + dirZ + "deg)";
}

function _mute() {
//    webrtc.mute();
}


function _callLeapMotion() {
    var controllerOptions = {enableGestures: true};
    var fingers = {};
    Leap.loop(controllerOptions, function (frame) {
        var fingerIds = {};
        // Display Pointable (finger and tool) object data
        var pointableString = "";
        if (frame.pointables.length > 0) {
            for (var pointableId = 0, pointableCount = frame.pointables.length; pointableId != pointableCount; pointableId++) {
                var pointable = frame.pointables[pointableId];
                var posX = (pointable.tipPosition[0] * 3);
                var posY = (pointable.tipPosition[2] * 3) - 200;
                var posZ = (pointable.tipPosition[1] * 3) - 400;
                var height = document.body.clientHeight / 2;
                var width = document.body.clientWidth / 2;

                var dirX = -(pointable.direction[1] * 90);
                var dirY = -(pointable.direction[2] * 90);
                var dirZ = (pointable.direction[0] * 90);
                var finger = fingers[pointable.id];
                if (!finger) {
                    var fingerDiv = document.getElementById("finger").cloneNode(true);
                    fingerDiv.setAttribute('id', pointable.id);
                    fingerDiv.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    document.getElementById('scene').appendChild(fingerDiv);
                    fingers[pointable.id] = pointable.id;
                } else {
                    var fingerDiv = document.getElementById(pointable.id);
                    if (typeof(fingerDiv) != 'undefined' && fingerDiv != null) {
                        moveFinger(fingerDiv, posX, posY, posZ, dirX, dirY, dirZ);
                        console.log(height);
                        console.log(posY);
                        if (width < (-posX + 20)) {
                            // left
                            console.log('left');
                            arrow = 'left';
                            _countDown(1);
                        } else if (width < (posX + 20)) {
                            //right
                            console.log('right');
                            arrow = 'right';
                            _countDown(1);
                        } else if (height < (posY + 20)) {
                            //top
                            console.log('top');
                            arrow = 'top';
                            _countDown(1);
                        } else if (20 > (posY)) {
                            //bottom
                            arrow = 'bottom';
                            _countDown(1);
                            console.log('bottom');
                        }
                    }
                }
                fingerIds[pointable.id] = true;
            }
            for (var fingerId in fingers) {
                if (!fingerIds[fingerId]) {
                    var fingerDiv = document.getElementById(fingers[fingerId]);
                    fingerDiv.parentNode.removeChild(fingerDiv);
                    delete fingers[fingerId];
                }
            }
        }
    });

}
