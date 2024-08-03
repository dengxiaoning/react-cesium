const { createProxyMiddleware } = require('http-proxy-middleware');
const originUrl ='http://192.168.1.64:9527/reactCesium'
/**
 * 路由代理
 * 注意是从长路由到短路由
 * 如：/tools/draw 再是/tools
 * 注：nginx反之
 * @param {object} app 
 */
module.exports = function (app) {
  app.use( '/reactCesium/tools/draw',
    createProxyMiddleware({
      target:originUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/reactCesium/tools/draw': '', // 重写路径
      },
    })
  );
  app.use('/reactCesium/tools/analysis',
    createProxyMiddleware({
      target: originUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/reactCesium/tools/analysis': '', // 重写路径
      },
    })
  );
  app.use('/reactCesium/tools',
    createProxyMiddleware({
      target:originUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/reactCesium/tools': '', // 重写路径
      },
    })
  );
  app.use('/reactCesium/fanShapeScan',
    createProxyMiddleware( {
        target:originUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/reactCesium/fanShapeScan': '', // 重写路径
        },
    })
  );
  app.use('/reactCesium/material/linkPointFlow',
    createProxyMiddleware( {
        target:originUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/reactCesium/material/linkPointFlow': '', // 重写路径
        },
    })
  );
  app.use('/reactCesium/material',
      createProxyMiddleware( {
          target: originUrl,
          changeOrigin: true,
          pathRewrite: {
            '^/reactCesium/material': '', // 重写路径
          },
      })
    );
  app.use('/reactCesium/modelExample/postProcessStages',
    createProxyMiddleware( {
        target: originUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/reactCesium/modelExample/postProcessStages': '', // 重写路径
        },
    })
  );
  app.use('/reactCesium/modelExample/threeCesium/aniSoldier',
    createProxyMiddleware({
      target: originUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/reactCesium/modelExample/threeCesium/aniSoldier': '', // 重写路径
      },
    })
  );
  app.use('/reactCesium/modelExample/threeCesium/rayCast',
    createProxyMiddleware({
      target: originUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/reactCesium/modelExample/threeCesium/rayCast': '', // 重写路径
      },
    })
  );
  app.use('/reactCesium/modelExample/threeCesium',
  createProxyMiddleware({
    target:originUrl,
    changeOrigin: true,
    pathRewrite: {
      '^/reactCesium/modelExample/threeCesium': '', // 重写路径
    },
  })
);
  app.use('/reactCesium/modelExample',
    createProxyMiddleware({
      target: originUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/reactCesium/modelExample': '', // 重写路径
      },
    })
  );

};