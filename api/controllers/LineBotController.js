/**
 * LineBotController
 *
 * @description :: Server-side logic for managing linebots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');

var headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "X-Line-ChannelID": sails.config.lineconfig.X_Line_ChannelID,
    "X-Line-ChannelSecret" : sails.config.lineconfig.X_Line_ChannelSecret,
    "X-Line-Trusted-User-With-ACL": sails.config.lineconfig.X_Line_Trusted_User_With_ACL
};

module.exports = {
	callback: function (req, res) {
//    	console.log(req.params.all());
//    	console.log(req.param('result'));
//    	console.log(req.param('result')[0]);
//    	console.log(req.param('result')[0]['content']);
    	var content = req.param('result')[0]['content'];
        var to_array = [];
        to_array.push(content['from']);
        var text = content['text'];
        if( text.length > 20 ) {
            content['text'] = "話が長いニョロ・・・。";
        }else{
            content['text'] = 'へえ、「' + text + '」ってこと？がっかりニョロよ';
        }

        var resJson= {
            to: to_array,
            toChannel: 1383378250,
            eventType: "138311608800106203",
            content: content
        };
        var options = {
            url: 'https://trialbot-api.line.me/v1/events',
            proxy : process.env.FIXIE_URL,
            headers: headers,
            json: true,
            body: resJson
        };

        res.set(headers);

        request.post(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
//                console.log(body);
                resJson['content']['text']='寂しいニョロか？';
                responseUser(options,resJson);
            } else {
                console.log('error: '+ JSON.stringify(response));
            }
        });
        return res.json(
            200,
            resJson);
  }
};
  function responseUser(options,content){
        request.post(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            } else {
                console.log('error: '+ JSON.stringify(response));
            }
        });     
  }

