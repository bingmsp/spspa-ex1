(function () {
    'use strict';

    var app = angular.module('app');

    // get all the routes
    app.constant('routes', getAppRoutes());

    // configure the routes & those that resolve them
    app.config(['$routeProvider', 'routes', routeConfiguration]);

    function routeConfiguration($routeProvider, routes) {
        // for each route, specify what should happen
        routes.forEach(function (route) {
            $routeProvider.when(route.url, route.config);
        });

        // when it doesn't get a matching route, redirect to a safe URL we know that works
        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // build the routes
    function getAppRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'App/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 0,
                        content: 'dashboard',
                        quickLaunchEnabled: false
                    }
                }
            },
            {
                url: '/LearningPaths',
                config: {
                    templateUrl: 'App/learningPath/learningPaths.html',
                    title: 'learning paths',
                    settings: {
                        nav: 1,
                        content: 'Learning Paths',
                        quickLaunchEnabled: true
                    }
                }
            },
            {
                url: '/LearningPaths/:id',
                config: {
                    templateUrl: 'App/learningPath/learningPathsDetail.html',
                    title: ':learning paths',
                    settings: {
                        nav: 1.1,
                        content: 'Learning Path Detail',
                        quickLaunchEnabled: false
                    }
                }
            },
            {
                url: '/LearningItems',
                config: {
                    templateUrl: 'App/learningItem/LearningItems.html',
                    title: 'learning items',
                    settings: {
                        nav: 2,
                        content: 'Learning Items',
                        quickLaunchEnabled: true
                    }
                }
            },
            {
                url: '/LearningItems/:id',
                config: {
                    templateUrl: 'App/learningItem/LearningItemDetail.html',
                    title: 'learning items',
                    settings: {
                        nav: 2.1,
                        content: 'Learning Item Detail',
                        quickLaunchEnabled: false
                    }
                }
            }
        ];
    }

})();