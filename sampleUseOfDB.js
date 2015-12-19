var MySmartDB = require("../modules/dbx");
var fs1 = require("fs"),
    readline1 = require("readline");
var dbx = new MySmartDB();
dbx.connect();

    var sql = "SELECT * FROM queue WHERE queue_status = 6";
    dbx.query(sql).then(
        function (rows) {
	},
	function(error) {
	});