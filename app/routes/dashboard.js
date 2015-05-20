import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function () {
        return this.store.find('device');
    },

    actions: {
    	didTransition: function () {
        	this.controllerFor('nitrogen').send('subscribeToNitrogen', this.controllerFor('nitrogen'), 'handleSocketMessage');
    	}
    }
});
