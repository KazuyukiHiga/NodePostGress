var TARGET_URL = 'http://b.hatena.ne.jp/';
var CONT_API = 'http://api.b.st-hatena.com/entry.count?url=';


var request = require('request');

var url = CONT_API + escape(TARGET_URL);

request(url, function(err, res, body){
    console.log('ウックマークスう:' + body);
});