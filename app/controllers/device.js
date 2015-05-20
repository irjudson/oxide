import Ember from 'ember';

export default Ember.ObjectController.extend({
    needs: ['application'],
    currentUser: Ember.computed.alias('controllers.application.currentUser'),

    title: function () {
        return this.get('model').get('name');
    }.property(),

    celsius: function () {
        return Math.round((this.get('fahrenheit') - 32) * (5/9) * 100) / 100;
    }.property('fahrenheit'),

    targetCelsius: function () {
        return Math.round((this.get('targetFahrenheit') - 32) * (5/9) * 100) / 100;
    }.property('targetFahrenheit'),

    lastUpdatedReadable: function () {
        var format = 'MMMM Do, h:mm:ss a',
            updated = this.get('lastUpdated');

        return moment(updated).format(format);
    }.property('lastUpdated'),

    presets: function () {
        return this.store.find('preset');
    }.property(),

    tagString: function (key, value) {
        var deviceTags = this.get('tags');

        // Setter
        if (arguments.length > 1) {
            this.set('tags', value.split(','));
        }

        // Getter
        if (deviceTags) {
            return this.get('tags').toString();
        } else {
            return '';
        }
    }.property('tags'),

    chartOptions: {
        showArea: true,
        lineSmooth: false,
        axisX: {
            showGrid: false
        }
    },

    chartData: {
        labels: ['Day1', 'Day2', 'Day3'],
        series: [
          [5, 4, 8],
          [10, 2, 7],
          [8, 3, 6]
        ]
    },

    actions: {
        selectNewPreset: function (preset) {
            if (!preset) {
                return this.set('preset', null);
            }

            var newPreset = this.store.getById('preset', preset.id);
            this.set('preset', newPreset);
        },

        save: function (device) {
            device.save();
        }
    }

});
