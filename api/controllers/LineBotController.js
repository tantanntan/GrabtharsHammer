/**
 * LineBotController
 *
 * @description :: Server-side logic for managing linebots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	callback: function (req, res) {
    	console.log(req.params.all());
    	console.log(req.param('result').content);
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

