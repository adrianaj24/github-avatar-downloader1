var request = require('request');
var pw = require("./secrets");
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');



function getRepoContributors(repoOwner, repoName, cb) {
    console.log(pw.GITHUB_TOKEN)
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
    request.get(url)               // Note 1
        .on('error', function (err) {                                   // Note 2
            throw err;
        })
        .on('response', function (response) {                           // Note 3
            console.log('Response Status Code: ', response.statusMessage);
            console.log('Response Headers:', response.headers['content-type']);
        })
        .pipe(fs.createWriteStream(filePath));
}    

    console.log('Download complete.');
// getRepoContributors("jquery", "jquery", function (err, result) {
//     console.log(result.length)
//     for (var i = 0; i < result.length; i++) {
//         console.log(result[i].avatar_url)
        
//     }
//     console.log("Errors:", err)
// })

    

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./avatars/kvirani.jpg")