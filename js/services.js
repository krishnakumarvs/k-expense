angular.module('app.services', [])

.factory('BlankFactory', [

    function() {

    }
])


.service('BlankService', [

    function() {

    }
])

.factory('HomeService', HomeService);

HomeService.$inject = ['$q', '$webSql'];

function HomeService($q, $webSql) {
    var db;
    var incomeTable = 'tbl_income';
    var outcomeTable = 'tbl_outcome';
    var HomeService = {
        createDataBase: createDataBase,
        addIncome: addIncome,
        addOutcome: addOutcome,
        getTotalIncome: getTotalIncome,
        getTotalExpenditure: getTotalExpenditure
    };
    createDataBase();
    return HomeService;

    function createDataBase() {
        db = $webSql.openDatabase('kManagerdb', '1.1', 'k-manager', 2 * 1024 * 1024);
        console.log("Initializing database");
        createTable();
    }

    function createTable() {
        db.createTable(incomeTable, {
            "id": {
                "type": "INTEGER",
                "null": "NOT NULL", // default is "NULL" (if not defined)
                "primary": true, // primary
                "auto_increment": true // auto increment
            },
            "amount": {
                "type": "FLOAT",
                "null": "NOT NULL",
                "default": "0"
            },
            "created": {
                "type": "TIMESTAMP",
                "null": "NOT NULL",
                "default": "CURRENT_TIMESTAMP" // default value
            },
            "from_name": {
                "type": "TEXT",
                "null": "NOT NULL"
            }
        });

        db.createTable(outcomeTable, {
            "id": {
                "type": "INTEGER",
                "null": "NOT NULL", // default is "NULL" (if not defined)
                "primary": true, // primary
                "auto_increment": true // auto increment
            },
            "amount": {
                "type": "FLOAT",
                "null": "NOT NULL",
                "default": "0"
            },
            "created": {
                "type": "TIMESTAMP",
                "null": "NOT NULL",
                "default": "CURRENT_TIMESTAMP" // default value
            },
            "for_name": {
                "type": "TEXT",
                "null": "NOT NULL"
            }
        });
    }

    function addIncome(amount, date, from_name) {
        var deferred = $q.defer();
        db.insert(incomeTable, {
            "amount": amount,
            "created": date,
            'from_name': from_name
        }).then(function(results) {
            if (results.insertId && results.insertId >= 0) {
                deferred.resolve(true);
            } else {
                deferred.resolve(false);
            }
        });
        return deferred.promise;
    }

    function addOutcome(amount, date, for_name) {
        var deferred = $q.defer();
        db.insert(outcomeTable, {
            "amount": amount,
            "created": date,
            'for_name': for_name
        }).then(function(results) {
            if (results.insertId && results.insertId >= 0) {
                deferred.resolve(true);
            } else {
                deferred.resolve(false);
            }
        });
        return deferred.promise;
    }

    function getTotalIncome() {
        var deferred = $q.defer();
        db.select(incomeTable, {
            "amount": {
                "value": 'IS NOT NULL'
            }
        }).then(function(results) {
            var sum = 0;
            for (i = 0; i < results.rows.length; i++) {
                console.log(results.rows.item(i));
                sum += results.rows.item(i).amount;
            }
            deferred.resolve(sum);
        });
        return deferred.promise;
    }

    function getTotalExpenditure() {
        var deferred = $q.defer();
        db.select(outcomeTable, {
            "amount": {
                "value": 'IS NOT NULL'
            }
        }).then(function(results) {
            var sum = 0;
            for (i = 0; i < results.rows.length; i++) {
                console.log(results.rows.item(i));
                sum += results.rows.item(i).amount;
            }
            deferred.resolve(sum);
        });
        return deferred.promise;
    }
}