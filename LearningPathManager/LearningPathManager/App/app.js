(function () {
    'use strict';

    // create the app
    var app = angular.module('app', [
        // inject OOTB AngularJS modules
        'ngRoute',      // app route (url path) support
        'ngSanitize',    // fixes HTML issues in data binding

        // my custom modules
        'common'
    ]);

    // app startup code
    app.run(['$route'], function($route) {
        // stuff that should happen before the app loads
    });
})();