var fs = require('fs');
var path = require('path');
var ass = require('assert');
var pm = require('thenjs');
var crypto = system.crypto;
var router = system.express.Router();
var User = system.db.User;

// system.app.name
exports.name = 'user';
exports.router = router;
exports.static = path.join(__dirname, 'static');

router.get('/', function(req, res){
    res.status(200).send('Hello ' + exports.name)
})

/*
    通用接口返回值
    @return {Object}
    @success
    {
        code: 0,
        data: {
            user: {
                name: String,
                auth: String
            }
        }
    }
    @error
    {
        code: 1,
        message: String
    }
*/

// 用户注册
router.post('/api/reg', function(req, res){
    var user = {};
    var data = req.body;
    // 检查注册必须字段
    var msg = exports.regTest(data);

    // 验证检查项是否通过
    if(msg.code !== 0){
        // return res.status(403).send(msg.message)
        return res.status(403).json({code: 1, message: msg.message})
    }

    pm()
        // 检查用户名是否已被注册
        .then(function(cont){
            User.find({name: data.username}, function(err, docs){
                docs.length ?
                    res.status(403).json({code: 1, message: '用户名已存在'}):
                    cont();
            })
        })
        // 构建user对象
        .then(function(cont){
            user.name = data.username;
            user.password = crypto.hex(data.password);
            user.email = data.email;
            cont();
        })
        // 执行注册
        .then(function(cont){
            User.insert(user, function(err, doc){
                err ?
                    res.status(500).json({code: 1, message: err.message}):
                    res.status(200).json({
                        code: 0,
                        data: {
                            user: {
                                name: user.name,
                                auth: crypto.base(user.password)
                            }
                        }
                    });
            })
        })
})

// 用户登录
router.post('/api/login', function(req, res){
    var user = req.body;
    // 检查登录必须字段
    var msg = exports.loginTest(user);

    // 验证检查项是否通过
    if(msg.code !== 0){
        return res.status(403).json({code: 1, message: msg.message})
    }

    // 查询用户是否存在
    User.findOne({name: user.username}, function(err, doc){
        err ?
            // Server error
            res.status(500).json({code: 1, message: err.message}):
            !doc ?
                res.status(403).json({code: 1, message: '用户名或密码错误'}):
                // Check password
                doc.password !== crypto.hex(user.password) ?
                    res.status(403).json({code: 1, message: '用户名或密码错误'}):
                    res.status(200).json({
                        code: 0,
                        data: {
                            user: {
                                name: doc.name,
                                auth: crypto.base(user.password)
                            }
                        }
                    })
    })
})

// 检查用户是否已登录
exports.isLogin = function(user, fn){
    User.findOne({name: user.username}, function(err, doc){
        err ?
            // Server error
            fn(err):
            // Check password
            doc.password === crypto.baseToHEX(user.auth) ? fn(null, true) : fn(null, false)
    })
}

// 检查用户注册信息
exports.regTest = function(data){
    try{
        ass.ok(data.username, '请输入用户名')
        ass.ok(data.password, '请输入密码')
        ass.ok(data.password.length >= 6, '密码长度必须大于等于6位')
        ass.ok(data.email, '请输入邮箱地址')
    }
    catch(e){
        return {code: 1, message: e.message}
    }
    return {code: 0}
}

// 登录字段检查
exports.loginTest = function(data){
    try{
        ass.ok(data.username, '请输入用户名')
        ass.ok(data.password, '请输入密码')
    }
    catch(e){
        return {code: 1, message: e.message}
    }
    return {code: 0}
}
