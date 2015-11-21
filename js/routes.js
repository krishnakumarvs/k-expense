angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('signup', {
      url: '/page1',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })
        
      
    
      
    .state('tabsController', {
      url: '/page2',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    })
      
    
      
        
    .state('tabsController.home', {
      url: '/page6',
      views: {
        'tab1': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl as Home'
        }
      }
    })
        
      
    
      
        
    .state('tabsController.settings', {
      url: '/page7',
      views: {
        'tab2': {
          templateUrl: 'templates/settings.html',
          controller: 'settingsCtrl'
        }
      }
    })
        
      
    
      
        
    .state('addIncome', {
      url: '/page8',
      templateUrl: 'templates/addIncome.html',
      controller: 'addIncomeCtrl as AddIncome'
    })
        
      
    
      
        
    .state('addOutcome', {
      url: '/page9',
      templateUrl: 'templates/addOutcome.html',
      controller: 'addOutcomeCtrl as AddOutcome'
    })
        
      
    
      
        
    .state('about', {
      url: '/page10',
      templateUrl: 'templates/about.html',
      controller: 'aboutCtrl'
    })
        
      
    
      
        
    .state('expences', {
      url: '/page11',
      templateUrl: 'templates/expences.html',
      controller: 'expencesCtrl'
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/page1');

});