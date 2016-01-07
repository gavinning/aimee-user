/*!
 * init.js For user
 * https://github.com/gavinning/aimee
 *
 * Aimee-app
 * Date: 2016-01-06
 */

var aimee, router;

aimee = require('aimee');
router = require('router');
aimee.config.set('env', 'mock');

aimee
    .reg('zepto')
    .reg('autoscreen');

router
    .option('pages/home')
    .option('pages/login')
    .action();
