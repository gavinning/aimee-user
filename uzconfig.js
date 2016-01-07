/*!
 * Config For UZ
 * https://github.com/gavinning/aimee
 *
 * Aimee-app
 * Date: 2016-01-06
 */

var path = require('path');

fis.config.set('deploy', {
    // 发布到本地
    dest: {
        // 从产出的结果的static目录下找文件
        from : '/',
        // 发布指定的文件
        to : path.join(__dirname, 'static')
    }
});
