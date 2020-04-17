const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        proxy('/svc', {
            target: 'http://intra.openit.co.kr:18085',
            logLevel: 'debug',
            changeOrigin: true
        })
    );
};