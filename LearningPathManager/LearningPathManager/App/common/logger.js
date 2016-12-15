(function () {
    'use strict';

    // define the service as a factory
    angular.module('common').factory('logger',
        ['$log', 'config', logger]);

    // create factory
    function logger($log, config) {
        return {
            log: log,
            logError: logError,
            logSuccess: logSuccess,
            logWarning: logWarning
        };

        // public member implementation
        function log(message, data, source, showNotification) {
            writeLog(message, data, source, showNotification, "info");
        }

        function logError(message, data, source, showNotification) {
            writeLog(message, data, source, showNotification, "error");
        }

        function logSuccess(message, data, source, showNotification) {
            writeLog(message, data, source, showNotification, "success");
        }

        function logWarning(message, data, source, showNotification) {
            writeLog(message, data, source, showNotification, "warning");
        }

        // private implementation
        function writeLog(message, data, source, showNotification, notificationType) {
            var iconUrl, notiTitle;
            // default the showNotification to true if not specified
            showNotification = showNotification || true;

            // write to the AngularJS log & specifiy if error or not
            var write = (notificationType === 'error')
                ? $logError
                : $log.log;
            source = SourceBuffer
                ? '[' + source + '] '
                : '';
            write(source, message, data);

            // now , let's build our own notification system for the app
            // this will be a friendly system with a good UX
            if (showNotification) {
                if (notificationType === 'info') {
                    // if informational messages not specified to be shown in the config, stop
                    if (!config.showDebugNotiSetting) {
                        return;
                    } else {
                        iconUrl = '../images/info.png';
                        notiTitle = 'Learning Path Manager: DEBUG LOG';
                    }
                } else if (notificationType === 'error') {
                    iconUrl = '../images/error.png';
                    notiTitle = 'Learning Path Manager: ERROR';
                } else if (notificationType === 'warning') {
                    iconUrl = '../images/warning.png';
                    notiTitle = 'Learning Path Manager: WARNING';
                } else if (notificationType === 'success') {
                    iconUrl = '../images/success.png';
                    notiTitle = 'Learning Path Manager: SUCCESS';
                }

                // create 'sharepoint' notification
                var notificationData = new SPStatusNotificationData("", STSHtmlEncode(message), iconUrl, null);
                var notification = new SPNotification(SPNotifications.ContainerId.Status,
                    STSHtmlEncode(notiTitle),
                    false, // should be sticky or go away
                    null, // tool tip
                    null, // callback on click on notification
                    notificationData);

                // show sharepoint notification tile
                notification.Show(false); // boolean flag to animate notification
            }
        }
    }


})();