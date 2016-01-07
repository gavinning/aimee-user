/*!
 * header For Aimeejs
 * https://github.com/gavinning/aimee
 *
 * Aimee-app
 * Date: 2016-01-06
 */

var app, App;

App = require('app');
app = App.create({
    name: 'header',
    version: '1.0.0',
    template: require('./header.jade'),

    prerender: function(){

    }
});

module.exports = app;
