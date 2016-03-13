var express = require("express");
var path = require("path")
var http = require("http");
var url = require("url");

var app = express();

function buildTimeStamp(pathname) 
{
    var months = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
    };
    var unixTime = 0;
    var naturalTime = "";

    if (pathname.match(/^\d+$/))
    {
        unixTime = +pathname;
        var date = new Date(unixTime*1000);
        naturalTime = months[date.getMonth()] + " " + date.getDate() + ", " + date.getUTCFullYear();
    }
    else 
    {
        pathname = pathname.split("%20").join(" ")
        unixTime = Date.parse(pathname) / 1000;
        naturalTime = pathname;
    }
    
    return {unix: unixTime, natural: naturalTime};
}

app.use(express.static(path.resolve(__dirname, "client")));

app.get("/:query", function(req, res) {
    var request = url.parse(req.url, true);
    // Build Time Stamp
    // Remove slash from pathname parameter
    var object = buildTimeStamp(request.pathname.slice(1, request.pathname.length));
    res.send(object);
});

app.listen(process.env.PORT), function() {
    console.log("App listening at 0.0.0.0:8080");
};

