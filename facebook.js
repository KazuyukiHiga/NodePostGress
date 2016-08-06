var FB = require('fb');

FB.setAccessToken('EAACEdEose0cBAFVEovVl4qvIPTc9YtlRRxEOWZBAmH8M6yueY84o2eqA5mylejfcala2Pygv6KH0NZAV1mN2ZCFSK5ud0EgjFHsJyeDZCqx8LdeUHhbuS8Pocoecy9oZBEmC1n9mTDlphZAAafblRGgmnveZB5EJOno8ERB7lLXXaWuPPeBfTC3BQgLkbRk3BAZD');

FB.api('me/feed', 'get', {}, function(feed){
    if (!feed){
        console.log('error');
    }

    var datas = feed.data;

    datas.forEach(function(data){
        console.log(data);
    })

});
//
// FB,api('me/feed', 'get', {}, function(feed){
//     if(!feed) {
//         console.log('error');
//     }
//
//     var datas = feed.data;
//     datas.each(function(data){
//         console.log(data);
//     })
//
// });