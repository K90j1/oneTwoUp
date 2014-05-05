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
//    url: 'http://routeflags.2013.nodeknockout.com:8888'
});
webrtc.joinRoom(room);