/**
 * LineBotController
 *
 * @description :: Server-side logic for managing linebots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	callback: function (req, res) {
    	console.log(req.params);
	    
        return res.json(
        {
            "X-Line-ChannelID": sails.config.lineconfig.X_Line_ChannelID,
            "X-Line-ChannelSecret" : sails.config.lineconfig.X_Line_ChannelSecret,
            "X-Line-Trusted-User-With-ACL": sails.config.lineconfig.X_Line_Trusted_User_With_ACL
        }    
        );
  }
};

