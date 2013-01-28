var connect = require( 'connect' );

exports.sendMail = function(req, res) {
	console.log('utils/sendMail');
    res.send('sentMail');
};

