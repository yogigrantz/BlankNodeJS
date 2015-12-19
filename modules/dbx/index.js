var mysql = require('mysql');
var Q = require('q');

function dogDB(app) {
    this.app = app;

    var conn;

    this.options = {
        connectionLimit: 100,
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME,
        multipleStatements: true
    };
    this.pool = mysql.createPool(this.options);

    this.connect = function () {
        this.pool.getConnection(function (err, connection) {
            conn = connection;

            if (err)
                console.log('Connection Error:', err)
            else
                console.log('MySQL Connected :)');
        });
    };

    this.query = function (sql) {
        var deferred = Q.defer();
        conn.query(sql, function (err, rows) {
            if (err) {
                deferred.resolve(err);
            }
            else {
                deferred.resolve(rows);
            }
        });
        return deferred.promise;
    }

    this.disconnect = function () {
        try {
            conn.release();
            console.log('DB Connection Closed');
        }
        catch (e) {
            console.log('ERR: DB Connection Close', e.message);
        };

    }

};

module.exports = dogDB;