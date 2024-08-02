

const result = {  // 暂存mock的ajax返回, 总共有5个字段
  success: true,
  code: 0,
  message: 'just a mock ;) ',
  total: 10000,
  data: {},
};

// 模拟统一的延迟, 返回promise对象
const mockPromise = (callback) => {
  return new Promise(resolve => {
    setTimeout(callback, 1000, resolve);
  });
};




/**
 * 模拟ajax请求用于调试, 一般而言只需mock业务相关方法
 */
class MockAjax {
  tableCache = new Map();

  getCurrentUser() {
    return mockPromise(resolve => {
      result.success = true;
      result.data = 'admin';
      resolve(result);
    });
  }

  login(username, password) {
    return mockPromise(resolve => {
      if (username === 'admin' && password === 'admin123') {
        result.success = true;
        result.data = 'admin';
        resolve(result);
      } else {
        result.success = false;
        result.code = 100;
        result.message = 'invalid username or password';
        resolve(result);
      }
    });
  }

}

export default MockAjax;
