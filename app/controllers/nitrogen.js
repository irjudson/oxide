import Ember from 'ember';

export default Ember.Controller.extend({
    needs: 'application',
    subscribeToNitrogen: false,
    appController: Ember.computed.alias('controllers.application'),

    actions: {
        /**
         * Subcribes to the Nitrogen Socket Message Stream, calling a
         * callback on a given controller
         * @param  {Controller}   originalController - The controller on which to call the callback
         * @param  {string}       callback - The callback (passed as a string, since called via Ember Run Loop)
         */
        subscribeToNitrogen: function (originalController, callback) {
            var appController = this.get('appController'),
                nitrogenSession = appController.get('nitrogenSession');
                            
            if (this.get('subscribedToNitrogen') || !nitrogenSession) {
                return;
            }

            nitrogenSession.onMessage({}, message => {
                originalController.send(callback, message);
            });

            this.set('subscribedToNitrogen', true);
        },
        /*
		 * Handles incoming socket messages from Nitrogen
	 	 * @param  {object} message - Nitrogen message
		 */
        handleSocketMessage: function (message) {
            console.log('Handling socket message.');
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

                    console.log('Device: ' + foundDevice +  ' Got Message: ' + message);
                    // Do something with message.body
                    // gps.pushObject(locations[i].body);
                    // foundDevice.save();

                    self.send(callback, foundDevice);
                }
            });
        }
    }
});
