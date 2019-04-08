var request = require('request');
var pw = require("./secrets");

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
getRepoContributors("jquery", "jquery", function (err, result) {
    console.log(result.length)
    for (var i = 0; i < result.length; i++) {
        console.log(result[i].avatar_url)
        
    }
    console.log("Errors:", err)
})