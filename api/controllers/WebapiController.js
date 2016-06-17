/**
 * WebapiController
 *
 * @description :: Server-side logic for managing webapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	talk: function(req,res){
//	    console.log(req.param('data'));
//	    console.log(req.body);
	    var recvTxt = req.param('data');
	    MecabService.message( recvTxt, function( errflg, result ,cnt){
	    	var cd = errflg?'NG':'OK';
	    	
    	    res.json(200,
    	    {
    	        code: cd,
    	        data: result,
    	        ngcount: cnt
    	    });
	    });
	}
};

