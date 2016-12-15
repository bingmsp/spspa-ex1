(function () {
    'use strict';

    var app = angular.module('app');

    // get all the routes
    app.constant('routes', getAppRoutes());

    // configure the routes & those that resolve them
    app.config(['$routeProvider', 'routes', routeConfiguration]);

    // build the routes
    function getAppRoutes() {
        return [
            {
                url: '/LearningPath',
                config: {
                    templateUrl: '../app/learningPath/learningPaths.html',
                    title: 'learning paths',
                    settings: {
                        nav: 1,
                        content: 'learning paths'
                    }
                }
            },
            {
                url: '/LearningItems',
                config: {
                    templateUrl: '../app/learningPath/LearningItems.html',
                    title: 'learning items',
                    settings: {
                        nav: 2,
                        content: 'learning items'
                    }
                }
            },
        ]
    }

    function routeConfiguration($routeProvider, routes) {
        // for each route, specify what should happen
        routes.forEach(function (route) {
            $routeProvider.when(route.url, route.config);
        });

        // when it doesn't get a matching route, redirect to a safe URL we know that works
        $routeProvider.otherwise({ redirectTo: '/LearningPaths' });
    }

})();