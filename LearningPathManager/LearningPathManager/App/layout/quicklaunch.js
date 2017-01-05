(function () {
    'use strict';

    // define controller
    var controllerId = 'quicklaunch';
    angular.module('app').controller(controllerId,
        ['$route', 'config', 'common', 'routes', quicklaunch]);

    // create controller
    function quicklaunch($route, config, common, routes) {
        var vm = this;
        // utility method to see if the provided route = current node/route
        vm.isCurrent = isCurrent;

        // init controller
        init();

        function init() {
            // load all navigation routes
            getNavigationRoutes();

            common.logger.log('controller loaded', null, controllerId);
            common.activateController([], controllerId);
            
        }

        function getNavigationRoutes() {
            // only load routes flagged to be on the quicklaunch (sorted)
            vm.navRoutes = routes.filter(function (route) {
                return route.config.settings
                    && route.config.settings.nav
                    && route.config.settings.quickLaunchEnabled;
            }).sort(function (routeA, routeB) {
                return routeA.config.settings.nav > routeB.config.settings.nav;
            });
        }

        function isCurrent(route) {
            if (!route.config.title || !$route.current || !$route.current.title) {
                return '';
            }
            var menuName = route.config.title;
            return $route.current.title.substr(0, menuName.length) === menuName
                ? 'current'
                : '';
        }
    }

})();