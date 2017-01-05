(function () {
    'use strict';

    // create a new common module
    var commonModule = angular.module('common', []);

    // create a common provider
    commonModule.provider('commonConfig', function () {
        this.config = {};

        this.$get = function () {
            return { config: this.config }
        };
    });

    // now... create the common service as a factory
    commonModule.factory('common',
        ['$q', '$rootScope', '$timeout', 'commonConfig', 'logger', common]);

    function common($q, $rootScope, $timeout, commonConfig, logger) {
        var service = {
            // pass through the AngularJS services / dependencies
            $broadcast: $broadcast,
            $q: $q,
            $timeout: $timeout,
            // my services
            logger: logger,
            activateController: activateController
        };

        return service;

        // $broadcast mapper
        function $broadcast() {
            return $rootScope.$broadcast.apply($rootScope, arguments);
        }

        // create the activateController event/service
        function activateController(promises, controllerId) {
            return $q.all(promises)
                .then(function (eventArgs) {
                    var data = {
                        controllerId: controllerId
                    };
                    $broadcast(commonConfig.config.controllerActivateSuccessfulEvent, data);
                    $broadcast(commonConfig.config.workingOnItToggleEvent, { show: false });
                });
        }

    }

})();