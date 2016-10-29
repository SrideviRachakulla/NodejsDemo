var user = require('./user');
var util = require('util');

module.exports = {
    configure: function(app) {
        app.get('/all/', function (req, res) {
            user.get(res);
        });

        app.post('/update/', function (req, res){
           console.log(util.inspect(req.body));
           user.post(req.body, res);
        });
    }
};

