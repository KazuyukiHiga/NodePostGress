var URL = 'http://weather.yahoo.co.jp/weather/rss/';

var client = require('cheerio-httpcli');

getWeather('沖縄県');

function getWeather(addresName) {

    client.fetch(URL, {}, function (err, $, res) {
        if (err) {
            console.log('error!!');
            return;
        }
        $('td:nth-child(1) > h3 > a').each(function (index) {
            if (addresName === $(this).text()) {
                console.log('選択された都道府県は' + addresName + 'です');
                var url = $(this).attr('href');
                //入力された都道府県のxmlを取得
                client.fetch(url, {}, function(err, $, res){
                    $('item').each(function (index) {
                        var title = $(this).find('title').text();
                        var description = $(this).find('description').text();
                        var pubDate = $(this).find('pubDate').text();
                        console.log('title=' + title);
                        console.log('description=' + description);
                        console.log('pubDate=' + pubDate);
                    })
                })
            }
        });
    });


};

