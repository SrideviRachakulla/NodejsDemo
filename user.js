var connection = require('./sql');

function User() {

    this.get = function (res) {
        connection.acquire(function (err, con) {
            var sql = 'SELECT * FROM data';
            console.log("SQL : " + sql);
            con.query(sql, function (err, result) {
                con.release();
                if(err){
                    console.error(err);
                    return;
                }
                if(result.length != 0){
                    res.send(result);
                }
                else{
                    res.send({'status' : 'No Result'});
                }
            });

        });
    };

    this.post = function (point, res){
        connection.acquire(function (err, con) {
                if ((typeof(point.id) != 'undefined' && point.id != null) && (typeof(point.sales) != 'undefined' && point.sales != null) && (typeof(point.cost) != 'undefined' && point.cost != null)) {
                    var statement = con.query('update data set cost = ?, sales = ? where id = ?', [point.cost, point.sales, point.id], function (err, result) {
                        con.release();
                        if (err) {
                            res.send({'status': 'Error', 'message': 'Unable to store new value'});
                            console.error(err);
                            return;
                        }
                        if (result.length != 0) {
                            res.send({'status': 'Success'});
                        }
                        else {
                            res.send({'status': 'No Result'});
                        }
                        console.log(statement.sql);
                    });

                }else{
                    res.send({'status': 'Error', 'message': 'Unable to store new value'});
                }
            }
        );

    };
}
module.exports = new User();



