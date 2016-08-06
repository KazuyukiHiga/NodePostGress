//モジュールの読み込み
var cheerio = require('cheerio-httpcli');
var pg = require('pg');

var conf = 'tcp://w-_-waaa1:admin@localhost:5432/my_db';

var URL = 'http://www.city.yokohama.lg.jp/somu/org/kikikanri/data/hinanjo.xml';

var pool = new pg.Pool(conf);

var items = [];
var DbConectFunction = function () {
    pg.connect(conf, function (err, client) {
        if (err) {
            console.log('DB Conect Error!!!');
            client.end.bind(client);
        }
        console.log('DB Connect!!!');
        client.query('SELECT * FROM public."Product"', function (err, result) {
            if (err) {
                console.log('DB ERROR!!');
                client.on('drain', client.end.bind(client));
            }

            console.log('DB Select!!!' + result.rows[0]);
            if (result.rows[0] === undefined) {

                cheerio.fetch(URL, {}, function (err, $, res) {
                    $('LocationInformation').each(function (index, data) {
                        var name = $(data).children('Name').text();
                        var address = $(data).children('Address').text();
                        var data = {name: name, address: address};
                        //console.log(name + address + data);
                        items.push(data);
                        if (index === 10) {
                            main();
                        }
                    })
                });
            }

            console.log('enb');
        });
    });
};


(function () {
    DbConectFunction();
})();

var main = function () {

    items.forEach(function (item, index) {

        pg.connect(conf, function (err, client) {

            console.log(item.name);
            console.log(item.address);


            var sql = 'INSERT INTO public."Product" (name, address) VALUES(' + " ' " + item.name +  " ' " + ','
                +  " ' " + item.address + " ' " +  ');';
            client.query(sql, function (err, result) {
                if (err) {
                    console.log('Insert Error!!!');
                    console.log(err);
                    client.end.bind(client);
                } else {
                    console.log('DB INSERT OK!!');
                }
            });
        })
    })
};

var getXml = function () {
    var list = [];
    //xmlデータを取得
    cheerio.fetch(URL, {}, function (err, $, res) {
        $('LocationInformation').each(function (index, data) {
            var name = $(data).children('Name').text();
            var address = $(data).children('Address').text();
            var data = {name: name, address: address};
            //console.log(name + address + data);
            list.push(data);
        })
        return list;
    })
};
