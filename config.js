var config = {
    local: {
        mode: 'local',
        port: process.env.PORT
    },
    production: {
        mode: 'production',
        port: 3000
    },
    staging: {
        mode: 'staging',
        port: 1000
    }
};
module.exports = function (mode) {
    if (mode == undefined) {
        return config['local'];
    } else return config[mode || 'production'];
};