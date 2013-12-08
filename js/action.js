/**
 * Created with JetBrains PhpStorm.
 * User: bookair
 * Date: 11/9/13
 * Time: 4:18 PM
 * To change this template use File | Settings | File Templates.
 */

// grab the room from the URL
var room = location.search && location.search.split('?')[1];
// Challenger is needed
var token = room.split('&')[1];
room = room.split('&')[0];
var arrow;

if(token == 'token'){
    // Challenger is coming
    location.href = location.origin + '/challenger.html?'+ room;
    return false;
}
var webrtc = new SimpleWebRTC({
	// the id/element dom element that will hold "our" video
	localVideoEl: 'localVideo',
	// the id/element dom element that will hold remote videos
	remoteVideosEl: 'remotes',
	// immediately ask for camera access
	autoRequestMedia: true,
	debug: false,
	detectSpeakingEvents: false,
	autoAdjustMic: true,
//    url: 'http://routeflags.2013.nodeknockout.com:8888'
});

// when it's ready, join if we got a room from the URL
webrtc.on('readyToCall', function () {
	//@todo Display details for invited
	//@todo Display 乱入！ for champion
	// submit to other page
	//@todo Then get another key to move invited user to room
	//@todo VIDEOタグの数を数えて２なら待機

	// you can name it anything
	// Challenger or reload Champion
		webrtc.joinRoom(room);
});


if (room) {
	_setRoom(room);
} else {
	jQuery("#workArea").append(championLoginForm());
	console.log('01 - Load championLoginForm()');
	jQuery('form').submit(function () {
		if(jQuery('#localVideo').attr('src') == undefined){
			alert('Please let using your camera. Thanks :)');
			return false;
		}
		var val = jQuery('#sessionInput').val().toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
		webrtc.createRoom(val, function (err, name) {
			console.log(' create room cb', arguments);
            console.log(name);
			var newUrl = location.pathname + '?' + name + '&first';
			if (!err) {
				history.replaceState({foo: 'bar'}, null, newUrl);
				_setRoom(name);
			} else {
				console.log(err);
			}
		});
		return false;
	});
}


//@todo arrange a timeing for update element
function videoCasting(){
//    if(jQuery('#visitorId').val() == ""){
//        jQuery('#visitorId').val(jQuery('#remotes video').attr('id'));
//    }else{
//        location.href = location.origin + '/busy.html';
//        return;
//    }
    //@todo  How to know new user or exiting one
    if(token == 'first'){
        return;
    }
    var arrowArea = jQuery('#arrowArea');
    arrowArea.css('display','block');
    var localVideo = jQuery('#localVideo');
    localVideo.css('display','block');
    jQuery('#alert').css('display','none');
    // Champion
    if(token == undefined){
        webrtc.mute();
        console.log('03 - Load VideoCasting');
        jQuery('#functionality').fadeOut("slow",function(){
            jQuery('#functionality').css('display','none');
        });
        jQuery('#tutorial').css('display','none');
        jQuery('#waitingMessage').html('Please SET your arrow. UP, RIGHT, DOWN or LEFT.');

        jQuery('.arrow').click(function (){
            console.log(jQuery(this).attr('name'));
            arrow = jQuery(this).attr('name');
            console.log('05 - Result (will be here disp of judge)');
            //@todo add arrow on remote video
            _countDown(1);
        });
        return true;
    }

    console.log('08 - Load challengerVideoCasting');
    webrtc.mute();
    jQuery('#battleArea').css('display','block');
    jQuery('#tutorial').css('display','none');
    jQuery('#localTitle').text('Challenger ' + token);
    jQuery('#remoteTitle').text('Champion ' + room);
    localVideo.load();
    arrowArea.css('display','none');
    jQuery('#waitingMessage').html('Champion ' + room + ' is setting an arrow...<i class="fa fa-refresh fa-spin"></i>');
}


// Since we use this twice we put it here
function _setRoom(name) {
    // Champion
    if(token == undefined){
        console.log('02 - Load championWaiting()');
        var videoVal = jQuery('#localVideo');
        jQuery('body').addClass('active');
        jQuery('#workArea').empty().append(championWaiting());
        jQuery('#alert').html('Deployed your ring <strong>"' + name + '"</strong>');
//        jQuery('#status').text('Champion 0 Wins NOW!');

        var locationString = location.href;
        locationString = locationString.replace("&first", "");

        jQuery('#url').text(locationString + '&token');
        jQuery('#localVideoArea').html(videoVal);
        videoVal.load();
        videoVal.css('display','block');
        jQuery('#hostId').val(webrtc.connection.socket.sessionid);
        webrtc.mute();
        setTimeout(function() {
            jQuery('#alert').fadeOut("slow",function(){
                jQuery('#functionality').css('display','none');
            });
        }, 3000);

        jQuery('#facebook').click(function(){
            var linkUrl = location.href + '&token';
            var imgSrc = 'https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-frc3/p480x480/1394195_10201139872958743_665625604_n.jpg';
            fbLogin();
            postFeed('This game for nko4, challenge it ?',linkUrl,imgSrc);
        });
        return true;
    }
    // Challenger
    jQuery('body').addClass('active');
    jQuery('#workArea').empty().append(championWaiting());
    jQuery('#localVideoArea').html('<video id="localVideo"></video>');
    console.log('07 - Load challengerWaiting');
    jQuery('#alert').css('display','none');
    jQuery('#battleArea').css('display','none');
    jQuery('#invite').css('display','none');
    jQuery('#status').css('display','none');

    jQuery('#functionality').fadeOut("slow",function(){
        jQuery('#functionality').css('display','none');
    });


    jQuery('#waitingMessage').html("<div class='panel panel-warning'>" +
        "<div class='panel-heading'>" +
        "<h2>Functionality notice.</h2></div>" +
        "<div class='panel-body'>" +
        "<i class='fa fa-video-camera'></i> Please let using your camera. Thanks :)" +
        "<br><small>if game can not start, maybe host has gone. Please " +
        "<a href='http://routeflags.2013.nodeknockout.com/'>restart it.</a></small>" +
        "</div>" +
        "</div>");
    webrtc.mute();
    return true;
}

// Champion
function _snapShot(){
    console.log('_snapShot');
    //@todo add effect about white out
    var battleCanvas = jQuery('#battleCanvas');
    battleCanvas.attr('width',640);
    battleCanvas.attr('height',480);

    var canvasCtx = jQuery('#battleCanvas')[0].getContext('2d');
    canvasCtx.drawImage(jQuery('#remotes video')[0], 0, 0);
    jQuery('#screenShot').attr('src',battleCanvas[0].toDataURL('image/png'));
//    document.getElementById("huhu").src = canvas.toDataURL('image/webp');

}


function _countDown(role){
    var status = jQuery('#status');
    status.html('5');
    status.css('font-size','38px');
    setTimeout(function() {
        status.fadeIn("fast",function(){
            status.fadeOut("slow",function(){
                status.html('4');
                status.css('font-size','38px');
                setTimeout(function() {
                    status.fadeIn("fast",function(){
                        status.fadeOut("slow",function(){
                            status.html('3');
                            status.css('font-size','38px');
                            setTimeout(function() {
                                status.fadeIn("fast",function(){
                                    status.fadeOut("slow",function(){
                                        status.html('2');
                                        status.css('font-size','38px');
                                        setTimeout(function() {
                                            status.fadeIn("fast",function(){
                                                status.fadeOut("slow",function(){
                                                    status.html('1');
                                                    status.css('font-size','38px');
                                                    setTimeout(function() {
                                                        status.fadeIn("fast",function(){
                                                            status.fadeOut("slow",function(){
                                                                status.html('Fight!!');
                                                                status.css('font-size','38px');
                                                                setTimeout(function() {
                                                                    status.fadeIn("fast",function(){
                                                                        if(role == 1){
                                                                            status.fadeOut("slow",function(){
                                                                                _snapShot();
                                                                                // disabled
                                                                                jQuery('#waitingMessage').text('SCREEN SHOT!!!');
                                                                                setTimeout(function() {
                                                                                    location.href = jQuery('#screenShot').attr('src');
                                                                                }, 400);
                                                                            });
                                                                        }else{
                                                                            status.fadeOut("slow",function(){
                                                                                setTimeout(function() {
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



function _snapShot2(){
    imgSrc = jQuery('#localVideo')[0];
    console.log('_snapShot2');
    //@todo add effect about white out
    var battleCanvas = jQuery('#battleCanvas');
    battleCanvas.attr('width',640);
    battleCanvas.attr('height',480);

    var canvasCtx = battleCanvas[0].getContext('2d');
    canvasCtx.drawImage(jQuery('#localVideo')[0], 0, 0);
    jQuery('#screenShot').attr('src',battleCanvas[0].toDataURL('image/png'));

    switch (arrow){
        case 'top':
            jQuery('#battleArea').html('' +
                '<div class="alert alert-info">' +
                '<h3>Answer is <i class="fa-arrow-circle-o-up bigIcon"></h3>' +
                '</div>');
            break;
        case 'right':
            jQuery('#battleArea').html('' +
                '<div class="alert alert-info">' +
                '<h3>Answer is <i class="fa-arrow-circle-o-right bigIcon"></h3>' +
                '</div>');
            break;
        case 'left':
            jQuery('#battleArea').html('' +
                '<div class="alert alert-info">' +
                '<h3>Answer is <i class="fa-arrow-circle-o-left bigIcon"></h3>' +
                '</div>');
            break;
        case 'bottom':
            jQuery('#battleArea').html('' +
                '<div class="alert alert-info">' +
                '<h3>Answer is <i class="fa-arrow-circle-o-down bigIcon"></h3>' +
                '</div>');
            break;
        default :
            break;
    }
}

function showResult(){
    _countDown(2);
    jQuery('#waitingMessage').text('SCREEN SHOT!!');
    webrtc.stopLocalVideo();

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


function _postImageToFacebook( authToken, filename, mimeType, imageData, message )
{
    // this is the multipart/form-data boundary we'll use
    var boundary = '----ThisIsTheBoundary1234567890';
    // let's encode our image file, which is contained in the var
    var formData = '--' + boundary + '\r\n'
    formData += 'Content-Disposition: form-data; name="source"; filename="' + filename + '"\r\n';
    formData += 'Content-Type: ' + mimeType + '\r\n\r\n';
    for ( var i = 0; i < imageData.length; ++i )
    {
        formData += String.fromCharCode( imageData[ i ] & 0xff );
    }
    formData += '\r\n';
    formData += '--' + boundary + '\r\n';
    formData += 'Content-Disposition: form-data; name="message"\r\n\r\n';
    formData += message + '\r\n'
    formData += '--' + boundary + '--\r\n';

    var xhr = new XMLHttpRequest();
    xhr.open( 'POST', 'https://graph.facebook.com/me/photos?access_token=' + authToken, true );
    xhr.onload = xhr.onerror = function() {
        console.log( xhr.responseText );
    };
    xhr.setRequestHeader( "Content-Type", "multipart/form-data; boundary=" + boundary );
    xhr.sendAsBinary( formData );
}


