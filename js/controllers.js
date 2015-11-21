angular.module('app.controllers', [])

.controller('signupCtrl', function($scope) {

})

.controller('homeCtrl', function() {
    var vm = this;
    vm.balance = 12;
    vm.expense = 10;
})

.controller('settingsCtrl', function($scope) {

})

.controller('addIncomeCtrl', function(HomeService) {
    var vm = this;
    vm.add_income = {};
    vm.addIncome = addIncome;
    initializeAddIncome();

    function initializeAddIncome() {
        vm.add_income.created = new Date();
        vm.add_income.amount = 0;
    }

    function addIncome() {
        HomeService.addIncome(vm.add_income.amount, vm.add_income.created.getTime(), vm.add_income.from_name).then(function(response) {
            if (response) {
                alert("success");
            } else {
                alert("failed");
            }
            initializeAddIncome();
        });
    }
})

.controller('addOutcomeCtrl', function(HomeService) {
    var vm = this;
    vm.add_outcome = {};
    initializeAddOutcome();
    vm.addOutcome = addOutcome;

    function initializeAddOutcome() {
        vm.add_outcome.created = new Date();
        vm.add_outcome.amount = 0;
    }

    function addOutcome() {
        HomeService.addOutcome(vm.add_outcome.amount, vm.add_outcome.created.getTime(), vm.add_outcome.for_name).then(function(response) {
            if (response) {
                alert("success");
            } else {
                alert("failed");
            }
            initializeAddOutcome();
        });
    }
})

.controller('aboutCtrl', function($scope) {

})

.controller('expencesCtrl', function($scope) {

})