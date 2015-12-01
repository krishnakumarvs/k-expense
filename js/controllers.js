angular.module('app.controllers', [])

.controller('signupCtrl', function($scope) {

})

.controller('homeCtrl', function($scope, HomeService) {
    var vm = this;
    vm.income = 0;
    vm.expense = 0;
    vm.balance = 0;
    getTotalIncomeAndOutcome();

    $scope.$on('someEvent', function(event) {
        alert(1);
    });

    function getTotalIncomeAndOutcome() {
        HomeService.getTotalIncome().then(function(income) {
            vm.income = income;
            HomeService.getTotalExpenditure().then(function(expense) {
                vm.expense = expense;
                vm.balance = vm.income - vm.expense;
            });
        });
    }
})

.controller('settingsCtrl', function($scope) {

})

.controller('incomeSourceCtrl', function($scope, HomeService) {
    var vm = this;
    vm.incomeSourceName = "";
    vm.addIncomeSource = addIncomeSource;
    vm.deleteSource = deleteSource;
    vm.allIncomeSources = [];
    activate();

    function activate() {
        HomeService.getAllIncomeSource().then(function(results) {
            vm.allIncomeSources = results;
        });
    }

    function deleteSource(id) {
        HomeService.deleteIncomeSource(id).then(function(result) {
            console.log(result);
            if (result) {
                activate();
            } else {
                alert("Could not complete request");
            }

        });
    }

    function addIncomeSource() {
        if (vm.incomeSourceName != "") {
            HomeService.addIncomeSource(vm.incomeSourceName).then(function(result) {
                console.log(result);
                if (result) {
                    vm.incomeSourceName = "";
                    activate();
                } else {
                    alert("Could not complete request");
                }
            });
        } else {
            alert("Enter income source name")
        }
    }
})

.controller('outcomeSourceCtrl', function($scope, HomeService) {
    var vm = this;
    vm.outcomeSourceName = "";
    vm.addOutcomeSource = addOutcomeSource;
    vm.deleteOutcomeSource = deleteOutcomeSource;
    vm.allOutcomeSources = [];
    activate();

    function activate() {
        HomeService.getAllOutcomeSource().then(function(results) {
            vm.allOutcomeSources = results;
        });
    }

    function deleteOutcomeSource(id) {
        HomeService.deleteOutcomeSource(id).then(function(result) {
            console.log(result);
            if (result) {
                activate();
            } else {
                alert("Could not complete request");
            }

        });
    }

    function addOutcomeSource() {
        if (vm.outcomeSourceName != "") {
            HomeService.addOutcomeSource(vm.outcomeSourceName).then(function(result) {
                console.log(result);
                if (result) {
                    vm.outcomeSourceName = "";
                    activate();
                } else {
                    alert("Could not complete request");
                }
            });
        } else {
            alert("Enter outcome source name")
        }
    }
})

.controller('addIncomeCtrl', function($scope, HomeService) {
    var vm = this;
    vm.add_income = {};
    vm.addIncome = addIncome;
    vm.allIncomeSources = [];
    initializeAddIncome();

    function initializeAddIncome() {
        vm.add_income.created = new Date();
        vm.add_income.amount = 0;
        HomeService.getAllIncomeSource().then(function(result) {
            vm.allIncomeSources = result;
            console.log(result);
        });
    }

    function validateAddInome() {
        if (isNaN(vm.add_income.amount)) {
            alert("Enter a proper amount");
            return false;
        }
        if (vm.add_income.amount <= 0) {
            alert("Enter a proper amount");
            return false;
        }
        if (!vm.add_income.from_name || vm.add_income.from_name == "") {
            alert("Select income source");
            return false;
        }
        return true;
    }

    function addIncome() {
        if (validateAddInome()) {
            HomeService.addIncome(vm.add_income.amount, vm.add_income.created.getTime(), vm.add_income.from_name).then(function(response) {
                if (response) {
                    alert("success");
                    window.location.href = "#/page2/page6";
                    location.reload();
                } else {
                    alert("failed");
                }
                initializeAddIncome();
            });
        }
    }
})

.controller('addOutcomeCtrl', function(HomeService) {
    var vm = this;
    vm.add_outcome = {};
    vm.outcomeSources = [];
    initializeAddOutcome();
    vm.addOutcome = addOutcome;

    function initializeAddOutcome() {
        vm.add_outcome.created = new Date();
        vm.add_outcome.amount = 0;
        HomeService.getAllOutcomeSource().then(function(result) {
            console.log(result);
            vm.outcomeSources = result;
        });
    }

    function validateAddOutome() {
        if (isNaN(vm.add_outcome.amount)) {
            alert("Enter a proper amount");
            return false;
        }
        if (vm.add_outcome.amount <= 0) {
            alert("Enter a proper amount");
            return false;
        }
        if (!vm.add_outcome.for_name || vm.add_outcome.for_name == "") {
            alert("Select expenditure name");
            return false;
        }
        return true;
    }

    function addOutcome() {
        if (validateAddOutome()) {
            HomeService.addOutcome(vm.add_outcome.amount, vm.add_outcome.created.getTime(), vm.add_outcome.for_name).then(function(response) {
                if (response) {
                    alert("success");
                    window.location.href = "#/page2/page6";
                    location.reload();
                } else {
                    alert("failed");
                }
                initializeAddOutcome();
            });
        }
    }
})

.controller('aboutCtrl', function($scope) {

})

.controller('expencesCtrl', function($scope, HomeService) {
    var vm = this;
    var defaultPreviousDays = 5;
    vm.dateChange = dateChange;
    vm.toDate = new Date();
    vm.fromDate = new Date(vm.toDate.getTime());
    vm.fromDate.setDate(vm.toDate.getDate() - defaultPreviousDays);
    vm.expences = [];
    dateChange();

    function dateChange() {
        HomeService.getExpencesBetweenDates(vm.fromDate.getTime(), vm.toDate.getTime()).then(function(response) {
            console.log(response);
            vm.expences = response;
        });
    }
})