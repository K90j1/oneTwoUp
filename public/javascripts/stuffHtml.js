/**
 * Author: Coronet Internet Service
 * Date: 11/9/13
 * License: Under Apache License, Version 2.0.
 */

/**
 * Login form for Top page
 * @return String
 */
function championLoginForm(){
	return "<div class='row'>" +
		"<div class='page-header'>" +
		"<h1>ライブジェスチャーゲーム　あっち向いてホイ！！<br>" +
		"</h1>" +
		"</div>" +
		"</div>" +
		"<div class=\"row\">\n    <div class=\"col-md-9 col-md-offset-2\">\n        <script async src=\"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js\"></script>\n        <!-- generator -->\n        <ins class=\"adsbygoogle\"\n             style=\"display:inline-block;width:250px;height:250px\"\n             data-ad-client=\"ca-pub-6004984342861741\"\n             data-ad-slot=\"7259625202\"></ins>\n        <script>\n            (adsbygoogle = window.adsbygoogle || []).push({});\n        </script>\n        <script async src=\"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js\"></script>\n        <!-- generator -->\n        <ins class=\"adsbygoogle\"\n             style=\"display:inline-block;width:250px;height:250px\"\n             data-ad-client=\"ca-pub-6004984342861741\"\n             data-ad-slot=\"7259625202\"></ins>\n        <script>\n            (adsbygoogle = window.adsbygoogle || []).push({});\n        </script>\n        <script async src=\"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js\"></script>\n        <!-- generator -->\n        <ins class=\"adsbygoogle\"\n             style=\"display:inline-block;width:250px;height:250px\"\n             data-ad-client=\"ca-pub-6004984342861741\"\n             data-ad-slot=\"7259625202\"></ins>\n        <script>\n            (adsbygoogle = window.adsbygoogle || []).push({});\n        </script>\n    </div>\n</div>\n<div class=\'row\'>" +
		"<div class='col-md-6 col-md-offset-3'>" +
		"<form id='createRoom'>" +
		"<h2 class='form-signin-heading'><i class='fa fa-globe'></i> ゲームをはじめます</h2>" +
		"<div class='form-group'>" +
        "<label for=''>1. カメラを利用を許可してください <span class='label label-danger'>必須</span></label><br>" +
        "<label for='nickname'>2. ニックネームを入力してください <span class='label label-danger'>必須</span></label>" +
		"<input type='text' id='sessionInput' class='form-control' placeholder='ニックネームを入力' required='true' autofocus=''>" +
		"</div>" +
		"<button class='btn btn-lg btn-primary btn-block' type='submit'>入場</button>" +
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

/**
 * Stuff for Second Page
 * @return String
 */
function championWaiting(){
	return "<div class='row'>" +
        "<div class='page-header'>" +
        "<h1>ジェスチャーゲーム「あっち向いてホイ！！」</h1>" +
        "</div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col-md-10 col-md-offset-1'>" +
        "<div class='alert alert-success' id='alert'>Deployed your ring ''</div>" +
        "<div class='alert alert-warning' id='approaching'><h2>Challenger is approaching!!</h2></div>" +
        "<h2 id='waitingMessage'>対戦者を待っています...</h2> <!-- challenger sets a arrow -->" +
        "</div>" +
        "</div>" +
        "<div class='row'>" +
        "<div id='battleArea'>" +
        "<div class='col-md-4 col-md-offset-1'>" +
        "<h3 id='localTitle'>" + CHAMPION + " </h3>" +
        "<div id='localVideoArea' class='media'></div>" +
        "</div>" +
        "<div class='col-md-2'>" +
        "<h3>VS</h3>" +
        "<h4 id='status'></h4>" +
        "</div>" +
        "<div class='col-md-4' id='remoteArea'>" +
        "<h3 id='remoteTitle'>" + CHALLENGER + " </h3>" +
        "<div id='remotes' class='media'></div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='row' id='tutorial'>" +
        "<div class='col-md-10 col-md-offset-1'>" +
        "<h3>チュートリアル</h3>" +
        "<p>1. URLをお友達に教えてましょう。</p>" +
        "<p>2. URLにアクセスしてきたお友達はチャレンジャーになります。</p>" +
        "<p>3. あなたはチャレンジャーに上下左右のうち一つの罠をセットすることができます</p>" +
        "<p>4. チャレンジャーは上下左右のどれかに頭を向けて罠を回避しようとします</p>" +
        "<p>5. もしあなたのトラップにチャレンジャーが引っかかったらあなたはスクリーンショットを手にできます (開発中...)</p>" +
        "<div id='invite'><h4>紹介URL</h4>" +
        "<div class='well' id='url'></div>" +
        "<button class='btn btn-facebook' type='submit' id='facebook'>" +
        "<i class='fa fa-facebook-square'></i> FacebookにURLを投稿する</button>" +
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
        "</div>\n<div class=\"row\">\n    <div class=\"col-md-9 col-md-offset-2\">\n        <script async src=\"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js\"></script>\n        <!-- generator -->\n        <ins class=\"adsbygoogle\"\n             style=\"display:inline-block;width:250px;height:250px\"\n             data-ad-client=\"ca-pub-6004984342861741\"\n             data-ad-slot=\"7259625202\"></ins>\n        <script>\n            (adsbygoogle = window.adsbygoogle || []).push({});\n        </script>\n        <script async src=\"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js\"></script>\n        <!-- generator -->\n        <ins class=\"adsbygoogle\"\n             style=\"display:inline-block;width:250px;height:250px\"\n             data-ad-client=\"ca-pub-6004984342861741\"\n             data-ad-slot=\"7259625202\"></ins>\n        <script>\n            (adsbygoogle = window.adsbygoogle || []).push({});\n        </script>\n        <script async src=\"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js\"></script>\n        <!-- generator -->\n        <ins class=\"adsbygoogle\"\n             style=\"display:inline-block;width:250px;height:250px\"\n             data-ad-client=\"ca-pub-6004984342861741\"\n             data-ad-slot=\"7259625202\"></ins>\n        <script>\n            (adsbygoogle = window.adsbygoogle || []).push({});\n        </script>\n    </div>\n</div>" +
        "<div id='scene'>" +
        "<div id='finger' class='cube finger'>" +
        "<div class='face tp'></div>" +
        "<div class='face lt'></div>" +
        "<div class='face rt'></div>" +
        "<div class='face ft'></div>" +
        "<div class='face bk'></div>" +
        "</div>" +
        "</div>" +
        "<canvas id='battleCanvas'></canvas>" +
        "<img id='screenShot' src='' />" +
        "<input type='hidden' value='' id='hostId'>" +
        "<input type='hidden' value='' id='visitorId'>" +
		"<hr>" +
		"COPYRIGHT routeFlags.inc 2013";
}
