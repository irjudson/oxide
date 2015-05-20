import Ember from 'ember';
import Config from '../config/environment';

export default Ember.Controller.extend({
    needs: ['nitrogen'],    	
    version: Config.APP.version,
    fullConfig: Config.APP,
    nitrogenController: Ember.computed.alias('controllers.nitrogen'),
 	currentUser: Ember.computed.alias('session.currentUser')
});
