const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:80/UPP_ZARUBIN/hs/api',
      changeOrigin: true,
    })
  );
};