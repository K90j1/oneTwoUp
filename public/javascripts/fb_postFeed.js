var res_access_token;

/**
 * Login FB Auth
 *
 */
function fbLogin() {
	FB.init({
		appId: '515770788569378',
		status: true,
		cookie: true,
		xfbml: true
	});

	FB.login(function (response) {
		if (response.authResponse) {
			res_access_token = FB.getAuthResponse()['accessToken'];
//			console.log('access_token ' + res_access_token);
//			location.href = 'index_02.html';
		} else {
			console.log('User cancelled login or did not fully authorize.');
		}
	}, {scope: 'publish_stream'});
}

/**
 * Login status
 *
 */
function fbGetLoginStatus() {
	FB.init({
		appId: '628717840508281',
		cookie: true,
		xfbml: true,
		status: true
	});

	FB.getLoginStatus(function (response) {
		if (response.authResponse) {
			res_access_token = response.authResponse.accessToken;
		} else {
			console.log('User cancelled login or did not fully authorize.');
		}
	});
}

/**
 * Login status
 *
 */
function postFeed(displayMes, link, picPath) {
	FB.api('/me/feed'
		, 'post'
		, { access_token: res_access_token, name: 'P2Pであっち向いてホイッ！！', message: displayMes, picture: picPath, link: link, description: 'P2Pのビデオキャストゲームです☆'}
		, function (response) {
			if (!response || response.error) {
				console.dir(response.error);
			} else {
//				console.dir(response.id);
			}
		}
	);
}