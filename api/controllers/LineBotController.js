/**
 * LineBotController
 *
 * @description :: Server-side logic for managing linebots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	callback: function (req, res) {
    	console.log(req.params.all());
    	console.log(req.param('result'));
    	console.log(req.param('result')[0]);
    	console.log(req.param('result')[0]['content']);
    	console.log(req['result'][0]['content']);
    	console.log(['result'][0]['content']['text']);
        var headers = {
            "Content-Type": "application/json; charset=UTF-8",
            "X-Line-ChannelID": sails.config.lineconfig.X_Line_ChannelID,
            "X-Line-ChannelSecret" : sails.config.lineconfig.X_Line_ChannelSecret,
            "X-Line-Trusted-User-With-ACL": sails.config.lineconfig.X_Line_Trusted_User_With_ACL
        };
        var to_array = [];
        to_array.push()
	    
        return res.json(
        {
            "Content-Type": "application/json; charset=UTF-8",
            "X-Line-ChannelID": sails.config.lineconfig.X_Line_ChannelID,
            "X-Line-ChannelSecret" : sails.config.lineconfig.X_Line_ChannelSecret,
            "X-Line-Trusted-User-With-ACL": sails.config.lineconfig.X_Line_Trusted_User_With_ACL
        }    
        );
  }
};

