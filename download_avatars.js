var request = require('request');
var pw = require("./secrets");
var fs = require('fs');
var args = process.argv.slice(2);

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url:
            `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
        headers: {
            'User-Agent': 'request'
        }
    }
    request(options, function (err, res, body) {
        var data = JSON.parse(body);
        cb(err, data);
    }).auth("adrianaj24", pw.GITHUB_TOKEN);

}

function downloadImageByURL(url, filePath) {
    request.get(url)               
        .on('error', function (err) {                                   
            throw err;
        })
        .on('response', function (response) {                           
            console.log('Response Status Code: ', response.statusMessage);
            console.log('Response Headers:', response.headers['content-type']);
            console.log('Download complete.');
        })
        .pipe(fs.createWriteStream(filePath));
}    

    
getRepoContributors(args[0], args[1], function (err, result) {
    if (args[0] !== undefined && args[1] !== undefined) {
        for (var i = 0; i < result.length; i++) {
            downloadImageByURL(result[i].avatar_url, "./avatars/" + result[i].login + ".jpg");
        }
    } else {
        console.log("Error: Please input value into both owner and repo");
    }
});