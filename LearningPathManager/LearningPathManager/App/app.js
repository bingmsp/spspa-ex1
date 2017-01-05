(function () {
    'use strict';

    // create the app
    var app = angular.module('app', [
        // inject OOTB AngularJS modules
        'ngRoute',      // app route (url path) support
        'ngCookies',    // cookie read/write support
        'ngSanitize',   // fixes HTML issues in data binding
        'ngAnimate',    // animation capabilities
        'ngResource',   // ngResource angular service

        // my custom modules
        'common'
    ]);

    // app startup code
    app.run(['$route', 'angular.config', function ($route, angularConfig) {
        // stuff that should happen before the app loads
    }]);
})();