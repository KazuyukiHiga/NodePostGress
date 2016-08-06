var URL_RANKING = 'http://www.aozora.gr.jp/access_ranking/2014_xhtml.html';
var SAVE_DIR = __dirname + '/aozora';

var client = require('cheerio-httpcli');
var fs = require('fs');
var url = require('c');
var DB_PATH = __dirname + "/aozora.sqlite";



var sqllite3 = require('sqlite3').verbose();

var db = new sqllite3.Database(DB_PATH);

var itemList = [];

if (!fs.existsSync(SAVE_DIR)) {
    fs.mkdirSync(SAVE_DIR);
}

client.fetch(URL_RANKING, {}, function (err, $, res, body) {

    var trList = $('table.list tr');

    for (var i = 1; i < trList.length; i++) {
        var cells = trList.eq(i).children();
        var rank = cells.eq(0).text();
        var link = cells.eq(1);
        var bookName = link.text();
        var bookNameLink = link.children('a').attr('href');
        var link2 = cells.eq(2);
        var humanName = link2.text();
        var humanNameLink = link2.children('a').attr('href');

        var item = {
            rank: rank,
            bookName: bookName,
            bookNameLink: bookNameLink,
            humanName: humanName,
            humanNameLink: humanNameLink
        }
        //downloadCard(item);
        insertItem(item);
    }
});

function insertItem(item){
    // db.serialize(function(){
    //    db.run('CREATE TABLE IF NOT EXISTS items(item_id INTEGER PRIMARY KEY, human_name Text)');
    //    var ins_stmt = db.prepare('INSERT INTO items(item_id, human_name) VALUES(?, ?)');
    //     ins_stmt.run(item.rank, item.humanName);
    //     ins_stmt.finalize();
    // });
    db.each('SELECT * FROM items', function(err, row){
       console.log(row);
    });
};

function downloadCard(item) {
    var path = SAVE_DIR + item.bookName + '.html';

    console.log('ダウンロード開始');
    fs.writeFileSync(path, item.bookNameLink, 'utf-8');
    console.log('ダウンロード完了');
};

