(function () {
    'use strict';

    // define service
    var serviceId = 'angular.config';
    angular.module('app').factory(serviceId,
        ['$http', 'common', configAngular]);

    // create service
    function configAngular($http, common) {

        // init factory
        init();

        // service signature
        return {};

        function init() {
            // set common $http header for sharepoint
            $http.defaults.headers.common.Accept = 'application/json;odata=verbose';

            common.logger.log('service loaded', null, serviceId);
        }

    }

})();