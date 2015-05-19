/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app'),
    HtmlbarsCompiler = require('ember-cli-htmlbars'),
    app = new EmberApp();

var templateTree = new HtmlbarsCompiler('app/templates', {
    isHTMLBars: true,
    templateCompiler: require('./bower_components/ember/ember-template-compiler')
});

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.
// 
// 
var app;

// brocfile-env module hasn't been decided on how to expose more build options

app = new EmberApp();

app.import(app.bowerDirectory + '/bootstrap/dist/js/bootstrap.js');
app.import(app.bowerDirectory + '/bootstrap/dist/css/bootstrap.css');
app.import(app.bowerDirectory + '/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', { destDir: 'fonts' });
app.import(app.bowerDirectory + '/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf', { destDir: 'fonts' });

app.import(app.bowerDirectory + '/selectize/dist/js/standalone/selectize.js');
app.import(app.bowerDirectory + '/selectize/dist/css/selectize.css');

app.import(app.bowerDirectory + '/flat-ui/dist/css/flat-ui.css');
app.import(app.bowerDirectory + '/flat-ui/dist/fonts/glyphicons/flat-ui-icons-regular.woff', { destDir: 'fonts/glyphicons' });
app.import(app.bowerDirectory + '/flat-ui/dist/fonts/glyphicons/flat-ui-icons-regular.ttf', { destDir: 'fonts/glyphicons' });

app.import(app.bowerDirectory + '/flat-ui/dist/fonts/lato/lato-regular.woff', { destDir: 'fonts/lato' });
app.import(app.bowerDirectory + '/flat-ui/dist/fonts/lato/lato-regular.ttf', { destDir: 'fonts/lato' });
app.import(app.bowerDirectory + '/flat-ui/dist/fonts/lato/lato-bold.woff', { destDir: 'fonts/lato' });
app.import(app.bowerDirectory + '/flat-ui/dist/fonts/lato/lato-bold.ttf', { destDir: 'fonts/lato' });

app.import(app.bowerDirectory + '/moment/min/moment-with-locales.js');
app.import(app.bowerDirectory + '/rangeslider.js/dist/rangeslider.min.js');
app.import(app.bowerDirectory + '/bootstrap-switch/dist/js/bootstrap-switch.min.js');
app.import(app.bowerDirectory + '/bootstrap-select/dist/css/bootstrap-select.min.css');
app.import(app.bowerDirectory + '/bootstrap-select/dist/js/bootstrap-select.js');
app.import(app.bowerDirectory + '/JavaScript-MD5/js/md5.js');
app.import(app.bowerDirectory + '/jquery-touchswipe/jquery.touchSwipe.min.js');

app.import(app.bowerDirectory + '/underscore/underscore-min.js', {
  'underscore': [
    'default'
  ]
});



module.exports = app.toTree();
