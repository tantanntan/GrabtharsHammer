/**
 * LineBotController
 *
 * @description :: Server-side logic for managing linebots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');
var async = require('async');

var headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "X-Line-ChannelID": sails.config.lineconfig.X_Line_ChannelID,
    "X-Line-ChannelSecret": sails.config.lineconfig.X_Line_ChannelSecret,
    "X-Line-Trusted-User-With-ACL": sails.config.lineconfig.X_Line_Trusted_User_With_ACL
};

module.exports = {
    callback: function(req, res) {
        var content = req.param('result')[0]['content'];
        var to_array = [];
        to_array.push(content['from']);
        var text = content['text'];
        var posttext = '';

        var resBody = {
            to: to_array, //destination ids
            toChannel: 1383378250, //fix value
            eventType: "138311608800106203", //fix value
            content: content
        };
        var options = {
            url: 'https://trialbot-api.line.me/v1/events',
            proxy: process.env.FIXIE_URL,
            headers: headers,
            json: true,
            body: resBody
        };
        async.series([
            function(callback){
                //generate reply
                if (text.length > 100) {
                    content['text'] = "話が長いニョロ・・・。";
                    posttext = "手短にお願いするニョロ。俺忙しいしニョロ。"
                }
                else {
                    MecabService.message(text,function(flg,res,cnt){
                        content['text'] = 'へえ、これは「' + res + '」って読めばいいニョロか？';
                        
                        if(!flg){
                            if((text.length / 3) < cnt ){
                                content['text'] += '\nツァ！！読めない文字入力しすぎだニョロッ！！！！';
                                posttext = "日本人なら普通にしゃべるニョロ。ツァ！！";
                            }else{
                                content['text'] += '\n読めない文字は・・・仕方ないニョロ。当方機械ニョロ。';
                                posttext = "わかりやすい言葉でお願いするニョロ。";
                            }
                        }else{
                            posttext = "もっと来いよ、ガツンと来いよ。ニョロ〜！";
                        }
                    });
                }
                callback(null,"first");
            },
            function(callback){
                res.set(headers);
                request.post(options, function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        //                console.log(body);
                        //send further.
                        resBody['content']['text'] = posttext ? posttext : '寂しいニョロか？';
                        sendToUser(options, resBody);
                    }
                    else {
                        console.log('error: ' + JSON.stringify(response));
                    }
                });
                callback(null,"second");
            }],
            function( err, finalresult) {
                return res.json(200, resBody);
            }
        );
    }
};

function sendToUser(options, content) {
    request.post(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
        else {
            console.log('error: ' + JSON.stringify(response));
        }
    });
}
