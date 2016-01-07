# Config

Aimee框架的config模块，用于管理配置文件


#### Install

```
// For Aimee
aimee i config
```

```
// For Node
npm i vpm-config
```


#### Example
```javascript
// For Aimee
var config = require('config');

```
```javascript
// For Node
var config = require('vpm-config');

```


```javascript
config.init();

// eg1
config.set('foo', 'bar');
config.get('foo');					// => bar

// eg2
config.set('foo.bar', '123');
config.get('foo');					// => {bar: 123}
config.get('foo.bar');				// => 123

// eg3
config.merge('foo.bar', {
    test: 123
});
config.get('foo.bar');				// => {test: 123}
```  

#### Instances
```javascript
var Config = config.Config;
var config1 = new Config;

config1.set('app.name', 'gavinning')
console.log(config1.get('app')) // => {name: gavinning}
```

#### Api

``config.init(target)``
* ``@param`` ``target`` ``type: Object`` 可选，传入已有的配置
* ``@param`` ``target`` ``type: String`` 可选，传入初试配置文件路径或模块id   
```javascript
config.init({a: 1})
```
---

``config.get(key)``
* ``@param`` ``key`` ``type: String`` 可选，不传key默认返回完整的配置对象
```javascript
config.get() 	   // => {a: 1}
config.get('a') 	// => 1
```
---

``config.set(key, value)``
* ``@des`` 覆盖配置文件中指定的key
* ``@param`` ``key`` ``type: String`` 必选，需要更新的key
* ``@param`` ``value`` ``type: AnyType`` 必选，任意数据类型均可
```javascript
config.set('app.name', 'gavinning') // => {app: {name: gavinning}}
```
---

``config.merge(key, value)``
* ``@des`` 合并到配置文件指定的key
* ``@param`` ``key`` ``type: String`` 可选，没有key的时候直接更新到根对象(慎用)
* ``@param`` ``value`` ``type: AnyType`` 必选，任意数据类型均可
```javascript
config.merge('app.path', '/app/gavinning') // => {app: {name: gavinning, path: '/app/gavinning'}}
```
