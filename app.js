var http = require('http');
var fs = require('fs');
var billboard = require('billboard-top-100').getChart;

var i = 0;
var all;

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./index.html', function(err, data) {
        if(err) {
            res.writeHead(404);
            res.write('Page not Found.');
        } else {
            res.write(data);
            billboard('hot-100', function(songs, err){
                for(i=0; i<100; i++) {
                    if(songs[i].cover == undefined) {
                        songs[i].cover = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/AS-skrzyzowanie-icon.svg/2000px-AS-skrzyzowanie-icon.svg.png";
                    }
                    all = '<div class="card"><img src="http://' + songs[i].cover + '"><div class="card-info"><p id="music">' + songs[i].title + '</p><p id="artist"> ' + songs[i].artist + ' </p></div></div>';
                    res.write(all, function(err) {
                        res.end();
                    });
                }
                
            });        
        }
    })
}).listen(process.env.PORT || 8080);