(function () {
    'use strict';

    // define factory
    var serviceId = 'breeze.config';
    angular.module('app').factory(serviceId,
        ['breeze', 'common', 'spContext', configBreeze]);

    // create service
    function configBreeze(breeze, common, spContext) {
        // init service
        init();

        // public signature of service
        return {
            dataservice: getDataService()
        };

        // init service

        function init() {
            // config breeze to use SharePoint Odata Service
            // comes from the breeze labs
            var dsAdapter = breeze.config.initializeAdapterInstance('dataService', 'SharePointOData', true);

            // when breeze needs to do an update, it needs the request digest to
            // include in the header... here's how it gets it
            dsAdapter.getRequestDigest = function () {
                return spContext.securityValidation;
            };

            common.logger.log('service loaded', null, serviceId);
        }

        function getDataService() {
            // set the data service for breeze when requested
            return new breeze.DataService({
                // point to the universal sharepoint REST endpoint for lists
                serviceName: spContext.hostWeb.appWebUrl + '/_api/web/lists/',
                // tell breeze to NOT request metadata from sharepoint via $metadata
                // rather we will define it ourselves
                hasServerMetadata: false
            });
        }
    }

})();