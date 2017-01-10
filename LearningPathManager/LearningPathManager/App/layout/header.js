﻿(function () {
    'use strict';

    // define controller
    var controllerId = 'header';
    angular.module('app').controller(controllerId,
        ['$rootScope', '$route', 'common', 'config', 'spContext', headerController]);

    // create controller
    function headerController($rootScope, $route, common, config, spContext) {
        var vm = this;
        // homepage of the app
        vm.appHomeUrl = spContext.hostWeb.appWebUrl + '/app.html';
        // app name
        vm.appTitle = spContext.hostWeb.title;
        // url of the icon to use for the app
        vm.appIconUrl = '';

        // init controller
        init();

        // init controller
        function init() {
            common.logger.log("controller loaded", null, controllerId);
            common.activateController([], controllerId);
        }

        // wire handler to successful route changes to 
        // - update the page title (for bookmarking)
        $rootScope.$on('$routeChangeSuccess',
            function (event, next, current) {
                if (!$route.current || !$route.current.title) {
                    vm.currentPageTitle = '';
                } else if ($route.current.settings.nav > 0) {
                    vm.currentPageTitle = $route.current.settings.content;
                } else {
                    vm.currentPageTitle = '';
                }
            });
    }

})();