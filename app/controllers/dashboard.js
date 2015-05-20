import Ember from 'ember';

export default Ember.ArrayController.extend({
    title: 'Dashboard',
    needs: ['application', 'nitrogen'],
    version: Ember.computed.alias('controllers.application.version'),
    appController: Ember.computed.alias('controllers.application'),
    nitrogenController: Ember.computed.alias('controllers.nitrogen'),
    currentUser: Ember.computed.alias('controllers.application.currentUser')
});
