/**
 * Router for Aimeejs
 * Author by gavinning
 * Homepage https://github.com/Aimeejs/router
 */

var router, Router, Class, pm;

pm = require('pm');
Class = require('class');
Router = Class.create();
Router.name = 'router';
Router.version = '1.0.0';

Router.fn.extend({
    // 页面路由注册
    option: function(id, hash){
        require(id).reg(hash);
        return this;
    },

    // 执行 pm.init()
    action: function(id){
        var pages = [];
        pm.pageArray.forEach(function(item){
            pages.push(['<gem id="lincoapp-page-', item.name, '"></gem>'].join(''))
        })
        $('.pages').html(pages.join('\n'));
        pm.init();
    }
})

router = new Router;
router.Router = Router;
module.exports = router;
