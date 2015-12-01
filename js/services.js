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
    var incomeSourceTable = 'tbl_income_src';
    var outcomeSourceTable = 'tbl_outcome_src';
    var HomeService = {
        createDataBase: createDataBase,
        addIncome: addIncome,
        addOutcome: addOutcome,
        getTotalIncome: getTotalIncome,
        getTotalExpenditure: getTotalExpenditure,
        addIncomeSource: addIncomeSource,
        getAllIncomeSource: getAllIncomeSource,
        deleteIncomeSource: deleteIncomeSource,
        addOutcomeSource: addOutcomeSource,
        getAllOutcomeSource: getAllOutcomeSource,
        deleteOutcomeSource: deleteOutcomeSource,
        getExpencesBetweenDates: getExpencesBetweenDates
    };
    createDataBase();
    return HomeService;

    function getExpencesBetweenDates(fromDate, toDate) {
        var deferred = $q.defer();
        db.select(outcomeTable, {
            "created": {
                "operator": '>=',
                "value": fromDate
            },
            "created": {
                "operator": '<=',
                "value": toDate
            }
        }).then(function(results) {
            expences = [];
            for (i = 0; i < results.rows.length; i++) {
                expences.push(results.rows.item(i));
            }
            deferred.resolve(expences);
        });
        return deferred.promise;

    }

    function deleteOutcomeSource(id) {
        var deferred = $q.defer();
        db.del(outcomeSourceTable, {
            "id": id
        });
        deferred.resolve(true);
        return deferred.promise;
    }

    function deleteIncomeSource(id) {
        var deferred = $q.defer();
        db.del(incomeSourceTable, {
            "id": id
        });
        deferred.resolve(true);
        return deferred.promise;
    }

    function addOutcomeSource(sourceName) {
        var deferred = $q.defer();
        db.insert(outcomeSourceTable, {
            "source_name": sourceName,
        }).then(function(results) {
            if (results.insertId && results.insertId >= 0) {
                deferred.resolve(true);
            } else {
                deferred.resolve(false);
            }
        });
        return deferred.promise;
    }

    function addIncomeSource(sourceName) {
        var deferred = $q.defer();
        db.insert(incomeSourceTable, {
            "source_name": sourceName,
        }).then(function(results) {
            if (results.insertId && results.insertId >= 0) {
                deferred.resolve(true);
            } else {
                deferred.resolve(false);
            }
        });
        return deferred.promise;
    }

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

        db.createTable(incomeSourceTable, {
            "id": {
                "type": "INTEGER",
                "null": "NOT NULL", // default is "NULL" (if not defined)
                "primary": true, // primary
                "auto_increment": true // auto increment
            },
            "source_name": {
                "type": "TEXT",
                "null": "NOT NULL"
            }
        });

        db.createTable(outcomeSourceTable, {
            "id": {
                "type": "INTEGER",
                "null": "NOT NULL", // default is "NULL" (if not defined)
                "primary": true, // primary
                "auto_increment": true // auto increment
            },
            "source_name": {
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
                sum += results.rows.item(i).amount;
            }
            deferred.resolve(sum);
        });
        return deferred.promise;
    }

    function getAllOutcomeSource() {
        var deferred = $q.defer();
        db.select(outcomeSourceTable, {
            "source_name": {
                "value": 'IS NOT NULL'
            }
        }).then(function(results) {
            var outcomeSources = [];
            for (i = 0; i < results.rows.length; i++) {
                outcomeSources.push(results.rows.item(i));
            }
            deferred.resolve(outcomeSources);
        });
        return deferred.promise;
    }

    function getAllIncomeSource() {
        var deferred = $q.defer();
        db.select(incomeSourceTable, {
            "source_name": {
                "value": 'IS NOT NULL'
            }
        }).then(function(results) {
            var incomeSources = [];
            for (i = 0; i < results.rows.length; i++) {
                incomeSources.push(results.rows.item(i));
            }
            deferred.resolve(incomeSources);
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
                sum += results.rows.item(i).amount;
            }
            deferred.resolve(sum);
        });
        return deferred.promise;
    }
}