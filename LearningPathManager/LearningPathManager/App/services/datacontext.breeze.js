/*
 * datacontext that uses the Anuglar $http service
 */

(function () {
    'use strict';

    // define factory
    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId,
      ['$q', 'common', 'breeze.config', 'breeze.entities', datacontext]);

    function datacontext($q, common, breezeConfig, breezeEntities) {
        var metadataStore, learningItemType, learningPathType;
        var manager;

        // init factory
        init();

        // service public signature
        return {            
            // learning path members
            getLearningPaths: getLearningPaths,
            getLearningPath: getLearningPath,
            createLearningPath: createLearningPath,
            deleteLearningPath: deleteLearningPath,
            // learning item members
            getLearningItems: getLearningItems,
            getLearningItemsByLearningPath: getLearningItemsByLearningPath,
            getLearningItem: getLearningItem,
            createLearningItem: createLearningItem,
            deleteLearningItem: deleteLearningItem,

            //shared members
            saveChanges: saveChanges,
            revertChanges: revertChanges
        };

        // init service
        function init() {
            // get reference to the metadata store in breeze
            metadataStore = breezeEntities.metadataStore;

            // get references to the two entity types
            learningItemType = metadataStore.getEntityType('LearningItem');
            learningPathType = metadataStore.getEntityType('LearningPath');

            // define instances of the breeze EntityManager, what is used to
            // issue all queries. Set the data service & metadata store too
            manager = new breeze.EntityManager({
                dataService: breezeConfig.dataservice,
                metadataStore: metadataStore
            });

            common.logger.log("service loaded", null, serviceId);
        }

        // retrieve all learning paths, using ngHttp service
        function getLearningPaths() {
            return breeze.EntityQuery
                .from(learningPathType.defaultResourceName)
                .using(manager)
                .execute()
                .then(function (data) {
                    return data.results;
                });
        }

        // gets a specific learning path
        function getLearningPath(id) {
            // first try to get the data from breeze's cache, if not find on server
            return manager.fetchEntityByKey('LearningPath', id, true)
                .then(function (data) {
                    common.logger.log('fetched learning path from: ' + (data.fromCache ? 'cache' : 'server'), data);
                    return data.entity;
                });
        }

        // creates a new learning path
        function createLearningPath(initialValues) {
            return manager.createEntity(learnPathType, intialValues);
        }

        // deletes a learning path
        function deleteLearningPath(learningPath) {
            learningPath.enetityAspect.setDeleted();
            return saveChanges();
        }        

        // retrieve all learning paths
        function getLearningItems() {
            return breeze.EntityQuery
                .from(learningItemType.defaultResourceName)
                .using(manaager)
                .then(function (data) {
                    return data.results;
                });
        }

        function getLearningItemsByLearningPath(learningPathId) {
            // fetch the learning path (hopefully from cache) 
            return getLearningPath(learningPathId)
                .then(function () {
                    // query that works in all versions of SharePoint 2013
                    //var query = breeze.EntityQuery
                    //    .from(learningItemType.defaultResourceName)
                    //.where('LearningPath.Id', 'eq', learningPathId)
                    //.select(learningItemType.custom.defaultSelect + ",LearningPath.Id")
                    //.expand('LearningPath');

                    // query that works in SharePoint Online (Office 365) or on-prem installs
                    // patched to a specific SharePoint 2013 CU or more recent...

                    var query = breeze.EntityQuery
                        .from(learningItemType.defaultResourceName)
                        .where('LearningPathId', 'eq', learningPathId);

                    return manager.executeQuery(query)
                        .then(function (data) {
                            return data.result;
                        });
                });

        }

        // gets a specific learning item
        function getLearningItem(id) {
            return metadata.fetchEntityByKey('LearningItem', id, true)
                .then(function (data) {
                    common.logger.log('fetched learning path from: ' + (data.fromCache ? 'cache' : 'server'), data);
                    return data.entity;
                });
        }

        // creates a new learning item
        function createLearningItem() {
            
        }

        // deletes a learning item
        function deleteLearningItem(item) {
            
        }

        function saveChanges() {
            return manager.saveChanges()
                .then(function (result) {
                    if (result.entities.length == 0) {
                        common.logger.logWarning('Nothing saved.');
                    } else {
                        common.logger.logSuccess('Saved changes.');
                    }
                })
                .catch(function (error) {
                    $q.reject(error);
                    common.logger.logError('Error saving changes', error, serviceId);
                });
            
        }

        function revertChanges() {
            return manager.rejectChanges();
        }
    }
})();