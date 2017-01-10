(function () {
    'use strict';

    // define controller
    var controllerId = 'spAppChrome';
    angular.module('app').controller(controllerId,
        ['$rootScope', 'spContext', 'common', spAppChrome]);

    // create controller
    function spAppChrome($rootScope,spContext, common) {
        var vm = this;
        var looger = common.logger;
        var spChromeControlData;

        // init & activate controller
        init();

        // init controller
        function init() {

            // create chrome control settings
            spChromeControlData = {
                siteUrl: spContext.hostWeb.url,
                siteTitle: spContext.hostWeb.title,
                appIconUrl: spContext.hostWeb.logoUrl,
                appTitle: "Learning Path Manager",
                settingsLinks: [
                  {
                      linkUrl: "Lists/LearningPaths",
                      displayName: "[SHAREPOINT LIST]: Learning Paths"
                  },
                  {
                      linkUrl: "Lists/LearningItems",
                      displayName: "[SHAREPOINT LIST]: Learning Items"
                  }
                ]
            };

            // create the chrome control
            var nav = new SP.UI.Controls.Navigation("chrome_ctrl_container", spChromeControlData);

            // show chrome control
            nav.setVisible(true);

            // hide top app chrome (image & app name)
            nav.setBottomHeaderVisible(false);

            common.logger.log('controller loaded', null, controllerId);
            common.activateController([], controllerId);
        }
    }

})();