const { createProxyMiddleware } = require('http-proxy-middleware');
const originUrl ='http://192.168.1.64:9527' 

/**
 * 路由代理
 * 注意是从长路由到短路由
 * 如：/tools/draw 再是/tools
 * @param {*} app 
 */
module.exports = function (app) {
  app.use( '/tools/draw',
    createProxyMiddleware({
      target:originUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/tools/draw': '', // 重写路径
      },
    })
  );
  app.use( '/tools/analysis',
    createProxyMiddleware({
      target: originUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/tools/analysis': '', // 重写路径
      },
    })
  );
  app.use( '/tools',
    createProxyMiddleware({
      target:originUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/tools': '', // 重写路径
      },
    })
  );
  app.use('/fanShapeScan',
    createProxyMiddleware( {
        target:originUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/fanShapeScan': '', // 重写路径
        },
    })
  );
  app.use('/material/linkPointFlow',
    createProxyMiddleware( {
        target:originUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/sensor/linkPointFlow': '', // 重写路径
        },
    })
  );
  app.use('/material',
      createProxyMiddleware( {
          target: originUrl,
          changeOrigin: true,
          pathRewrite: {
            '^/material': '', // 重写路径
          },
      })
    );
  app.use('/modelExample/postProcessStages',
    createProxyMiddleware( {
        target: originUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/modelExample/postProcessStages': '', // 重写路径
        },
    })
  );
  app.use('/modelExample/threeCesium/aniSoldier',
    createProxyMiddleware({
      target: originUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/modelExample/threeCesium/aniSoldier': '', // 重写路径
      },
    })
  );
  app.use('/modelExample/threeCesium/rayCast',
    createProxyMiddleware({
      target: originUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/modelExample/threeCesium/rayCast': '', // 重写路径
      },
    })
  );
  app.use('/modelExample/threeCesium',
  createProxyMiddleware({
    target:originUrl,
    changeOrigin: true,
    pathRewrite: {
      '^/modelExample/threeCesium': '', // 重写路径
    },
  })
);
  app.use('/modelExample',
    createProxyMiddleware({
      target: originUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/modelExample': '', // 重写路径
      },
    })
  );

};