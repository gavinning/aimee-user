/*!
 * helloworld For Aimeejs
 * https://github.com/aimeejs/helloworld
 *
 * Aimee-app
 * Date: 2015-11-17
 */

var app, App;

App = require('app');
app = App.create({
    name: 'helloworld',
    version: '1.0.0',
    template: require('./helloworld.jade'),

    // 渲染到页面dom之前执行
    prerender: function(app){
        this.slideEnd()
    },

    // 渲染到浏览器之后执行
    pagerender: function(app){
        var swipe, Swipe;
        Swipe = require('swipe');
        swipe = new Swipe(app.getApp().get(0), {
            callback: function(i){
                app.slideEnd(i)
            }
        });
        app.getApp().width(window.innerWidth).height(window.innerHeight);
        app.find('.u-img').width(window.innerWidth).height(window.innerHeight);
    },

    slideEnd: function(index){
        index = index + 1 || 1;
        this.find('.slider-numbers').text(index + '/' + this.getMockData().list.length);
    }
});

module.exports = app;
