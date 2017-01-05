(function () {
    'use strict';

    // define controller
    var controllerId = "learningPathsDetail";
    angular.module('app').controller(controllerId,
        ['$window', '$location', '$routeParams', 'common', 'datacontext', learningPathsDetail]);

    // create controller
    function learningPathsDetail($window, $location, $routeParams, datacontext, common) {
        var vm = this;
        // utility method to convert universal time > local time using moment.js
        vm.created = localizedCreatedTimestamp;
        vm.modified = localizedModifiedTimestamp;
        // navigate backwards in the history stack
        vm.goBack = goBack;
        // handle saves
        vm.goSave = goSave;
        // handle delete
        vm.goDelete = goDelete;

        // init controller
        init();

        // init controller
        function init() {
            // if an ID is passed in, load the item
            var learningPathId = +$routeParams.id;
            if (learningPathId && learningPathId > 0) {
                // THEN get the item requested
                getItemDetail();
            } else {
                createItem();
            }


            common.logger.log("controller learningPathDetail loaded", null, controllerId);
            common.activateController([], controllerId);
        }

        // localized created time for the current item
        function localizedCreatedTimestamp() {
            if (vm.learningItem) {
                return moment(vm.learningPath.Created).format("M/D/YYYY h:mm A");
            } else {
                return '';
            }
        }

        // localized modified time for the current item
        function localizedModifiedTimestamp() {
            if (vm.learningItem) {
                return moment(vm.learningPath.Modified).format("M/D/YYYY h:mm A");
            } else {
                return '';
            }
        }

        // navigate backwards in the 
        function goBack() {
            $window.history.back();
        }

        // load the item specified in the route
        function getItemDetail(learningPathId) {
            datacontext.getLearningPath(learningPathId)
                .then(function (data) {
                    vm.learningPath = data;
                });
        }

        function goSave() {
            datacontext.saveLearningPath(vm.LearningPath)
                .then(function () {
                    common.logger.logSuccess('Saved learning path.', null, controllerId);
                })
                .then(function () {
                    $location.path('LearningPaths/');
                });
        }

        function goDelete() {
            datacontext.saveLearningPath(vm.LearningPath)
                .then(function () {
                    common.logger.logSuccess('Deleted learning path.', null, controllerId);
                })
                .then(function () {
                    $location.path('LearningPaths/');
                });
        }

        function createItem() {
            vm.learningPath = datacontext.createLearningPath();
        }

    }

})();