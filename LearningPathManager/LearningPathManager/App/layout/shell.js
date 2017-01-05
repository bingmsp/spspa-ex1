(function () {
    'use strict';

    // define controller
    var controllerId = 'shell';
    angular.module('app').controller(controllerId,
        ['$rootScope', '$route', 'common', 'config', shell]);

    // create controller
    function shell($rootScope, $route, common, config) {
        var vm = this;
        var logger = common.logger;

        // init controller
        init();

        function init(){
            common.logger.log('controller loaded', null, controllerId);
            common.activateController([], controllerId)
                .then(function () {
                    common.$broadcast(config.events.workingOnItToggle, { show: false });
                });
        }

        // wire handler to successful route changes to
        // - update the page title (for bookmarking)
        $rootScope.$on('$routeChangeSuccess',
            function (event, next, current) {
                if (!$route.current || !$route.current.title) {
                    $rootScope.pageTitle = '';
                } else if ($route.current.settings.nav > 0) {
                    $rootScope.pageTitle = ' > ' + $route.current.settings.content;
                } else {
                    $rootScope.pageTitle = '';
                }
            });
    }

})();