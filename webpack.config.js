/// <binding />
var _ = require('lodash');

function createConfig() {

    var configs = {};

    var NODE_ENV = process.env.NODE_ENV || "development";

    console.info("Preparing for \"" + (NODE_ENV) + "\" configuration.");


    configs.global = require('./conf/webpack/global')(__dirname);
    configs.development = require('./conf/webpack/development')(__dirname);
    configs.production = require('./conf/webpack/production')(__dirname);




    var webPackConfig = configs[NODE_ENV];
    webPackConfig = _.merge(configs.global, webPackConfig);

    return webPackConfig;
}
module.exports = createConfig();