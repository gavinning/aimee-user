/**
 * Config for Aimeejs
 * Author gavinning
 * Homepage https://github.com/Aimeejs/config
 */

var is, extend, Class, Config, config;

try{
    // For aimee
    is = require('is');
    extend = require('extend');
    Class = require('class');
}catch(e){
    try{
        // For node
        is = require('aimee-is');
        extend = require('aimee-extend');
        Class = require('aimee-class');
    }
    catch(e){}
}

Config = Class.create();
config = new Config;
config.Config = Config;
module.exports = config;

/**
 * 递归创建不存在子节点为空对象
 * @param   {Object}  target   目标对象
 * @param   {String}  key      要操作的key
 * @param   {anyType} value    target.key
 * @return  {Object}           target
 * @example this.create({}, 'app.path', __dirname)
 */
Config.createObject = function(target, key, value){
    var pop;
    var data = target;
    var arr = key.split('.');

    do{
        pop = arr.shift();
        data[pop] = data[pop] || {};
        data = data[pop];
    }
    while(arr.length > 1)

    // 检查是否存在value
    if(value){
        // 节点创建完成尝试赋值
        try{
            eval('target.' + key + ' = value')
        // 赋值失败则抛错
        }catch(e){
            throw e;
        }
    }

    return target;
}

Config.include({
    /**
     * 设置数据模型
     * @param   {String || Object} target 模块id或数据模型对象
     */
    init: function(target){
        this.__config = {};

        // 当做模块路径处理
        if(is.string(target)){
            try{
                this.__config = require(target)
            }
            catch(e){
                throw new Error(target + ' is not a module id.')
            }
        }

        // 当做配置文件处理
        if(is.plainObject(target)){
            this.__config = target;
        }
    },

    /**
     * 单项配置设置，覆盖模式，推荐只用于单项配置
     * @param   {String}  key   属性
     * @param   {Anytype} value 属性值
     * @example config.set('dir.install', 'packages');
     */
    set: function(key, value){
        try{
            eval('this.__config.' + key + ' = value')
        }catch(e){
            this.__config = Config.createObject(this.__config, key, value)
        }
    },

    /**
     * 获取配置
     * @param   {String}  key 属性
     * @return  {Anytype}     属性值
     * @example config.get('dir.install'); // => packages
     */
    get: function(key){
        if(!key){
            return this.__config;
        }

        try{
            return eval('this.__config.' + key)
        }catch(e){
            throw e;
        }
    },

    /**
     * 多项配置设置，合并模式，推荐使用多项配置
     * @param   {String}   key   合并的属性节点
     * @param   {Anytype}   value 合并的对象map
     * @example config.merge({dir: {install: 'packages'}});
     * @example config.merge('dir', {install: 'packages'});
     * @example config.merge('dir.install', 'packages');
     */
    merge: function(key, value){
        var tmp;

        if(!value){
            value = key;
            key = null;
        }

        // 检查key是否存在
        if(key && typeof key !== 'string'){
            key = null;
        }

        // 合并到指定节点
        if(key){
            tmp = Config.createObject({}, key, value);
            extend(true, this.__config, tmp);
        }
        // 合并到根节点
        else{
            extend(true, this.__config, value);
        }
    }
})
