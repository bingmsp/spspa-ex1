(function () {
    'use strict';

    // define service
    var serviceId = 'spContext';
    angular.module('app').service(serviceId,
        ['$log', '$cookieStore', '$window', '$location', '$resource', '$timeout', 'common', spContext]);
   
    // create service
    function spContext($log, $cookieStore, $window, $location, $resource, $timeout, common) {
        var service = this;
        var spWeb = {
            appWebUrl: '',
            url: '',
            title: '',
            logoUrl: ''
        };
        service.hostWeb = spWeb;

        // init service
        init();

        function init() {
            // if values don't exist on querystring...
            if (decodeURIComponent(jQuery.getQueryStringValue('SPHostUrl')) === "undefined") {
                // THEN load app context from cookie
                loadSpAppContext();

                // fire off auto refresh of digest
                refreshSecurityValidation();
            } else {
                // ELSE create the app context
                createSpAppContext();
            }
        }

        function loadSpAppContext() {
            $log.log('[spContext]', 'loading spContext cookie', null);
            service.hostWeb.appWebUrl = $cookieStore.get('SPAppWebUrl');
            service.hostWeb.url = $cookieStore.get('SPHostUrl');
            service.hostWeb.title = $cookieStore.get('SPHostTitle');
            service.hostWeb.logoUrl = $cookieStore.get('SPHostUrl');
        }

        function createSpAppContext() {
            $log.log('[spContext]', 'writing spContext cookie', null);

            var appWebUrl = decodeURIComponent(jQuery.getQueryStringValue('SPAppWebUrl'));
            $cookieStore.put('SPAppWebUrl', appWebUrl);

            var url = decodeURIComponent(jQuery.getQueryStringValue('SPHostUrl'));
            $cookieStore.put('SPHostUrl', url);

            var title = decodeURIComponent(jQuery.getQueryStringValue('SPHostTitle'));
            $cookieStore.put('SPHostTitle', title);

            var logoUrl = decodeURIComponent(jQuery.getQueryStringValue('SPHostLogoUrl'));
            $cookieStore.put('SPHostLogoUrl', logoUrl);

            $log.log('[spContext]', 'redirecting to app', null);
            $window.location.href = appWebUrl + "/app.html";
        }

        function refreshSecurityValidation() {
            common.logger.log('refreshing security validation', service.securityValidation, serviceId);

            var siteContextInfoResource = $resource('_api/contextinfo', {}, {
                post: {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'Content-Type': 'application/json;odata=verbose'
                    }
                }
            });

            // requestion validation
            siteContextInfoResource.post({},
                function (data) {
                    // success callback

                    // obtain digest timeout & value... store in service
                    var siteContextInfo = data.d.GetContextWebInformation;
                    var validationRefreshTimeout = siteContextInfo.FormDigestTimeoutSeconds - 10;
                    service.securityValidation = siteContextInfo.FormDigestValue;

                    common.logger.log('refreshed security validation', service.securityValidation, serviceId);
                    common.logger.log('next referesh of security validation: ' + validationRefreshTimeout + ' seconds', null, serviceId);

                    // repeat the refresh in timeout
                    $timeout(function () {
                        refreshSecurityValidation();
                    }, validationRefreshTimeout * 1000)
                }, function (error) {
                    common.logger.logError('response from contextinfo', error, serviceId);
                });

        }
    }

})();