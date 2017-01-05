(function () {
    'use strict';

    // define controller
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId,
        ['common', dashboard]);
    
    // create controller
    function dashboard(common) {
        var vm = this;

        // init controller
        init();

        function init() {
            common.logger.log('controller dashboard loaded', null, controllerId);
            common.activateController([], controllerId);
        }
    }


})();