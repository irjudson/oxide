import Ember from 'ember';
import Config from '../config/environment';

export default Ember.Controller.extend({	
    version: Config.APP.version,
    fullConfig: Config.APP,

    currentUser: function() {
        return this.store.find('user').then(function(users) {
        	console.log('TRYING TO FIND USER!!!');
			if (users && users.length > 0) { return users[0]; }
        });
    }.property()    
});
