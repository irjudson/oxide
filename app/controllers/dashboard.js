import Ember from 'ember';

export default Ember.ArrayController.extend({
    title: 'Dashboard',
    needs: ['application', 'nitrogen'],
    version: Ember.computed.alias('controllers.application.version'),
    appController: Ember.computed.alias('controllers.application'),
    nitrogenController: Ember.computed.alias('controllers.nitrogen'),
    currentUser: Ember.computed.alias('controllers.application.currentUser'),

	/*
	 * Subscribe to Nitrogen on init, assign a handler for incoming socket messages
	 */
    // subscribeToNitrogen: function () {
    //     this.get('nitrogenController').send('subscribeToNitrogen', this, 'handleSocketMessage');
    // }.on('init'),

    actions: {
		/*
		 * Handles incoming socket messages from Nitrogen
	 	 * @param  {object} message - Nitrogen message
		 å*/
        handleSocketMessage: function (message) {
            if (message && message.from) {
                this.send('processMessage', message, message.from, 'updateDevice');
            }
        },
        /**
         * Handles a message for a given device.
         *
         * This method is called when Nitrogen messages retrieved.
         * @param  {json}   message     - Locations array (format: {latitude: 1, longitude: 1, speed: 1, heading: 1, timestamp: 1})
         * @param  {string}   principalId  - Id of the device the message should be attached to
         * @param  {Function} callback
         * @return {Ember Data Record}     - DS Record of the device the messages were added to
         */
        processMessage: function (message, principalId, callback) {
            var self = this;

            this.store.find('device', { nitrogen_id: principalId }).then(function (foundDevices) {
                var foundDevice;

                if (foundDevices && foundDevices.content && foundDevices.content.length > 0) {
                    foundDevice = foundDevices.content[0];

                    // Do something with message.body
                    // gps.pushObject(locations[i].body);
                    foundDevice.save();

                    self.send(callback, foundDevice);
                }
            });
        },        
    }
});
