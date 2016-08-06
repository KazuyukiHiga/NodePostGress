var twit = require('twit');

var T = new twit({
    consumer_key: 'udlj8K58IK8spfnMkPSyg4d9Q',
    consumer_secret: 'yuO0hXHHae09PalcC86b94iUfl2J6tF96dbmXsDwlIhjcvA8gM',
    access_token: '97418042-MojE6MFk0TNyvwgnC2aIxfSOzq99Q0foNU1rjRC72',
    access_token_secret: '8trLLjQFmNARX1w1F62Gx4j4NdL2pPnu2q9Tbik7m7hxK'
});

var stream = T.stream('statuses/filter', {track: '沖縄'});

stream.on('tweet', function (tw) {
    console.log(tw);
    var text = tw.text;
    var user_name = tw.user.name;
    console.log(user_name + '>' + text);
});