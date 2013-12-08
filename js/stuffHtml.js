/**
 * Created with JetBrains PhpStorm.
 * User: bookair
 * Date: 11/9/13
 * Time: 4:20 PM
 * To change this template use File | Settings | File Templates.
 */


//var ChampionLoginForm = '<button id='screenShareButton'></button>' +
//	'<p id='subTitle'></p>' +
//	'<form id='createRoom'>' +
//	'<input id='sessionInput'/>' +
//	'<button type='submit'>Create it!</button>' +
//	'</form>';

function championLoginForm(){
	return "<div class='row'>" +
		"<div class='page-header'>" +
		"<h1>Live gesture game Attimuite hoi !!<br>" +
		"<small>the Attimuite hoi(1, 2 UP!!) is typical japanese game.</small></h1>" +
		"</div>" +
		"</div>" +
		"<div class='row'>" +
		"<div class='col-md-6 col-md-offset-3'>" +
		"<form id='createRoom'>" +
		"<h2 class='form-signin-heading'><i class='fa fa-globe'></i> Please deploy your ring.</h2>" +
		"<div class='form-group'>" +
        "<label for=''>1. Allow using your camera <span class='label label-danger'>required</span></label><br>" +
        "<label for='nickname'>2. Input Nick Name <span class='label label-danger'>required</span></label>" +
		"<input type='text' id='sessionInput' class='form-control' placeholder='Nick Name' required='true' autofocus=''>" +
		"</div>" +
		"<button class='btn btn-lg btn-primary btn-block' type='submit'>Go</button>" +
		"</form>" +
		"</div>" +
		"</div>" +
		"<div class='row'>" +
		"<div class='col-md-6 col-md-offset-3'>" +
		"<video id='localVideo'></video>" +
		"</div>" +
        "<input type='hidden' value='' id='hostId'>" +
		"<hr>" +
		"COPYRIGHT 2013 routeFlags.inc All RIGHTS RESERVED.";
}

function championWaiting(){
	return "<div class='row'>" +
        "<div class='page-header'>" +
        "<h1>Live gesture game Attimuite hoi !!<br>" +
        "<small>the Attimuite hoi(1, 2 UP!!) is typical japanese game.</small></h1>" +
        "</div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col-md-10 col-md-offset-1'>" +
        "<div class='alert alert-success' id='alert'>Deployed your ring ''</div>" +
        "<div class='alert alert-warning' id='approaching'><h2>Challenger is approaching!!</h2></div>" +
        "<h2 id='waitingMessage'>Waiting for a challenger...</h2> <!-- challenger sets a arrow -->" +
        "</div>" +
        "</div>" +
        "<div class='row'>" +
        "<div id='battleArea'>" +
        "<div class='col-md-4 col-md-offset-1'>" +
        "<h3 id='localTitle'>Champion: </h3>" +
        "<div id='localVideoArea' class='media'></div>" +
        "</div>" +
        "<div class='col-md-2'>" +
        "<h3>VS</h3>" +
        "<h4 id='status'></h4>" +
        "</div>" +
        "<div class='col-md-4' id='remoteArea'>" +
        "<h3 id='remoteTitle'>Challenger: </h3>" +
        "<div id='remotes' class='media'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='row' id='tutorial'>" +
        "<div class='col-md-10 col-md-offset-1'>" +
        "<h3>Tutorial is here.</h3>" +
        "<p>1. You can tell to URL for invite your friend below.</p>" +
        "<p>2. When your friend get here, Your friend will be Challenger for this gesture game.</p>" +
        "<p>3. You will set the an arrow of up, right, left and down for trap for Challenger.</p>" +
        "<p>4. The Challenger is needed about overdose turning one's head very quickly for dodging a trap.</p>" +
        "<p>5. When will you be win, you can get screen shot. (Sorry, this is just under construction..)</p>" +
        "<div id='invite'><h4>Invite URL</h4>" +
        "<div class='well' id='url'></div>" +
        "<button class='btn btn-facebook' type='submit' id='facebook'>" +
        "<i class='fa fa-facebook-square'></i> | Post to Facebook</button>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='row' id='arrowArea'>" +
        "<div class='col-md-6 col-md-offset-3'>" +
        "<div class='btn-group btn-group-justified'>" +
        "<a class='btn btn-default btn-success arrow' name='top'>UP</a>" +
        "<a class='btn btn-default btn-warning arrow' name='right'>RIGHT</a>" +
        "<a class='btn btn-default btn-info arrow' name='bottom'>DOWN</a>" +
        "<a class='btn btn-default btn-danger arrow' name='left'>LEFT</a>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<canvas id='battleCanvas'></canvas>" +
        "<img id='screenShot' src=''></img>" +
        "<input type='hidden' value='' id='hostId'>" +
        "<input type='hidden' value='' id='visitorId'>" +
		"<hr>" +
		"COPYRIGHT routeFlags.inc 2013";
}
