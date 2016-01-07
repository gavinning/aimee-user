/*!
 * login For Aimeejs
 * https://github.com/gavinning/aimee
 *
 * Aimee-page
 * Date: 2016-01-07
 */

var page, Page;

Page = require('page');
page = new Page;
page.extend({
    name: 'login',
    template: require('./login.jade'),

    ajaxconfig: {
        url: '/tmp/test.json',
        dataType: 'json'
    },

    prerender: function(data, thisPage){
        this.exports('form', function(app){
            app.init({
                layers: [
                    {
                        type: 'text',
                        title: '用户名',
                        required: true,
                        name: 'username',
                        placeholder: '请输入用户名'
                    },
                    {
                        type: 'password',
                        title: '密码',
                        required: true,
                        name: 'password',
                        placeholder: '请输入密码'
                    },
                    {
                        type: 'button',
                        title: '登录',
                        btnType: 'submit'
                    }
                ]
            }).render();

            app.find('.btn-submit').click(function(){
                var data = app.getFormData();

                $.ajax({
                    url: 'http://127.0.0.1:3000/g/user/api/login',
                    type: 'POST',
                    data: data,
                    dataType: 'json',
                    success: function(){
                        console.log(arguments, 123)
                    },
                    error: function(){
                        console.log(arguments, 456)
                    }
                })
            })
        })
    }
});

module.exports = page;
