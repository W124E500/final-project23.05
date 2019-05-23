var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

//kapum em classner@
var Grass = require("./modules/grass.js")
var GrassEater = require("./modules/grasseater.js")
var Predator = require("./modules/predator.js")
var Xotaqayl = require("./modules/xotaqayl.js")
var XotaqaylEater = require("./modules/xotaqayleater.js")

//haytararum em arrayner
grassArr = [];
geArr = [];
predatorArr = [];
xotaqaylArr = [];
xotaqaylEaterArr = [];
//haytararum enq popoxakan exanaki masin
Weather = "Summer";
//
//haytararum enq popoxakanner voronq hashvelu en qanak@ kerparneri
//
Weatherinit = 1;
//cnvacneri qanak
Grassinit = 0;
GrassEaterinit = 0;
Predatorinit = 0;
Xotaqaylinit = 0
XotaqaylEaterinit = 0
//stexcum en matrix generacnox function
var w = 50;
var h = 60;

function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.floor(Math.random() * 100);
            if (r < 20) r = 0;
            else if (r < 30) r = 1;
            else if (r < 55) r = 2;
            else if (r < 75) r = 3;
            else if (r < 85) r = 4;
            else if (r < 100) r = 5;
            matrix[y][x] = r;
        }
    }
    return matrix;
}
//haytararum em matrix popoxakan@ vor kanchi getmatrix funcian
matrix = genMatrix(w, h)
//pttvel matrix-i vrayov stexcum enq objectner
for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x] == 1) {
            grassArr.push(new Grass(x, y, 1));
            Grassinit++;
        }
        else if (matrix[y][x] == 2) {
            geArr.push(new GrassEater(x, y, 2));
            GrassEaterinit++;
        }
        else if (matrix[y][x] == 3) {
            predatorArr.push(new Predator(x, y, 3));
            Predatorinit++;
        }
        else if (matrix[y][x] == 4) {
            xotaqaylArr.push(new Xotaqayl(x, y, 4));
            Xotaqaylinit++;
        }
        else if (matrix[y][x] == 5) {
            xotaqaylEaterArr.push(new XotaqaylEater(x, y, 5));
            XotaqaylEaterinit++;
        }

    }
}
//stexcum enq functia vor@ exanak e poxancelu Script.js 
function draw_weather() {
    Weatherinit++;
    if (Weatherinit == 5) {
        Weatherinit = 1;
    }
    else if (Weatherinit == 4) {
        Weather = "Autumn";
    }
    else if (Weatherinit == 3) {
        Weather = "Winter";
    }
    else if (Weatherinit == 2) {
        Weather = "Spring";
    }
    else if (Weather == 1) {
        Weather = "Summer";
    }

    //uxarkum e exanak@ clientin
    io.sockets.emit("exanak", Weather)
}
function drawserver() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in geArr) {
        geArr[i].move();
        geArr[i].eat();
        geArr[i].mul();
        geArr[i].die();
    }
    for (var i in predatorArr) {
        predatorArr[i].move();
        predatorArr[i].eat();
        predatorArr[i].mul();
        predatorArr[i].die();
    }
    for (var i in xotaqaylArr) {
        xotaqaylArr[i].move();
        xotaqaylArr[i].eat();
        xotaqaylArr[i].mul();
        xotaqaylArr[i].die();
    }
    for (var i in xotaqaylEaterArr) {
        xotaqaylEaterArr[i].move();
        xotaqaylEaterArr[i].eat();
        xotaqaylEaterArr[i].mul();
        xotaqaylEaterArr[i].die();
    }
    //matrixy uxarkum en clientin
    io.sockets.emit("matrix", matrix);
}
var obj = { "info": [] };

function main() {
    var file = "Statistics.json";
    obj.info.push({ "cnvac xoteri qanak@": Grassinit, "cnvac xotakerneri qanak@": GrassEaterinit, "cnvac gishatichneri qanak@": Predatorinit, "cnvac xotaqaylneri qanak@": Xotaqaylinit, "cnvac xotaqaylnerin utoxneri qanak@": XotaqaylEaterinit })
    fs.writeFileSync(file, JSON.stringify(obj, null, 3))
}

    



//interval vor popoxivi 3 vrk mek
setInterval(drawserver, 1000)
setInterval(draw_weather, 3000)
setInterval(main, 3000)
//stexcum en zangvacic patahakan andam tvox function
Random = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
//connectiona stexcum scriptic ekac infoi himan vra script.js i het mousePressed i jamanak
io.on('connection', function (socket) {

    socket.on("Sxmvec", function (arr) {
        directions = [
            [x, y]
            [x - 1, y - 1],
            [x, y - 1],
            [x + 1, y - 1],
            [x - 1, y],
            [x + 1, y],
            [x - 1, y + 1],
            [x, y + 1],
            [x + 1, y + 1]
        ];
      //  var harevanX = directions[i][0];
      //  var harevanY = directions[i][1];

        var newX = arr[0];
        var newY = arr[1];

       

        if (matrix[newY][newX] = 1) {
            matrix[newY][newX] = 0;
            for (var i in grassArr) {
                if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
        else if (matrix[newY][newX] = 2) {
            matrix[newY][newX] = 0;
            for (var i in geArr) {
                if (this.x == geArr[i].x && this.y == geArr[i].y) {
                    geArr.splice(i, 1);
                    break;
                }
            }
        }
        else if (matrix[newY][newX] = 3) {
            matrix[newY][newX] = 0;
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }
        else if (matrix[newY][newX] = 4) {
            matrix[newY][newX] = 0;
            for (var i in xotaqaylArr) {
                if (this.x == xotaqaylArr[i].x && this.y == xotaqaylArr[i].y) {
                    xotaqaylArr.splice(i, 1);
                    break;
                }
            }
        }
        else if (matrix[newY][newX] = 5) {
            matrix[newY][newX] = 0;
            for (var i in xotaqaylEaterArr) {
                if (this.x == xotaqaylEaterArr[i].x && this.y == xotaqaylEaterArr[i].y) {
                    xotaqaylEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    
    });
});