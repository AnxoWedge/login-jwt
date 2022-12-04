//  Modulo de configuração do modo de desenovlvimento para utilizar o backend como proxy 
// quando existir uma chamada para um endpoint que comece pelo o caminho "/api" ele irá transformar para usar a porta :5000 

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:5000',
      changeOrigin: true,
    })
  );
};