import globalConfig from '../config';

/**
 * 日志工具类 <br/>
 */
class Logger {

  // 定义一些预设的日志级别
  // 目前只有4种级别

  static LOG_LEVEL_DEBUG = 1;
  static LOG_LEVEL_INFO = 2;
  static LOG_LEVEL_WARN = 3;
  static LOG_LEVEL_ERROR = 4;

  /*暂存所有logger*/
  static loggerMap = new Map();

  // 是否为某些logger单独指定了日志级别?
  static debugLoggers = new Set();
  static infoLoggers = new Set();
  static warnLoggers = new Set();
  static errorLoggers = new Set();

  /*默认的logger*/
  static defaultLogger = new Logger();  // 注意这一行代码的位置, 必须在所有Map/Set声明完毕之后

  /**
   * 获取一个Logger实例
   *
   * @param name
   * @returns {*}
   */
  static getLogger(name) {
    if (name && name !== '') {
      // 缓存
      if (Logger.loggerMap.has(name)) {
        return Logger.loggerMap.get(name);
      }

      const logger = new Logger(name);
      Logger.loggerMap.set(name, logger);
      return logger;
    } else {
      return Logger.defaultLogger;
    }
  }

  constructor(name) {
    this.name = name;  // logger的名字

    // 是否单独设置了这个logger的日志级别?
    if (Logger.debugLoggers.has(name)) {
      this.logLevel = Logger.LOG_LEVEL_DEBUG;
      return;
    }
    if (Logger.infoLoggers.has(name)) {
      this.logLevel = Logger.LOG_LEVEL_INFO;
      return;
    }
    if (Logger.warnLoggers.has(name)) {
      this.logLevel = Logger.LOG_LEVEL_WARN;
      return;
    }
    if (Logger.errorLoggers.has(name)) {
      this.logLevel = Logger.LOG_LEVEL_ERROR;
      return;
    }

    // 如果没有单独设置, 就使用root logger level
    const configLogLevel = globalConfig.log.level;
    if (configLogLevel === 'debug') {
      this.logLevel = Logger.LOG_LEVEL_DEBUG;
    } else if (configLogLevel === 'info') {
      this.logLevel = Logger.LOG_LEVEL_INFO;
    } else if (configLogLevel === 'warn') {
      this.logLevel = Logger.LOG_LEVEL_WARN;
    } else if (configLogLevel === 'error') {
      this.logLevel = Logger.LOG_LEVEL_ERROR;
    } else {
      // 默认都是info级别
      this.error('unsupported logLevel: %s, use INFO instead', configLogLevel);
      this.logLevel = Logger.LOG_LEVEL_INFO;
    }
  }

  /**
   * 设置日志级别, 只有4种级别可选
   *
   * @param newLogLevel 1~4之间的一个数字
   */
  setLogLevel(newLogLevel) {
    if (isNaN(newLogLevel)) {
      this.error('setLogLevel error, not a number: %s', newLogLevel);
    }

    if (newLogLevel < 1 || newLogLevel > 4) {
      this.error('setLogLevel error, input = %s, must between 1 and 4', newLogLevel);
    }

    this.logLevel = newLogLevel;
  }

  /**
   * 打印info日志
   *
   * @param pattern 日志格式, 支持%d/%s等占位符
   * @param args 可变参数, 用于替换pattern中的占位符
   */
  info(pattern, ...args) {
    // 先判断日志级别
    if (this.logLevel > Logger.LOG_LEVEL_INFO)
      return;

    if (this.name)
      args.unshift(`${this.name}: ${pattern}`);
    else
      args.unshift(pattern);
    console.log.apply(console, args);
  }

  /**
   * 打印error日志
   *
   * @param pattern
   * @param args
   */
  error(pattern, ...args) {
    if (this.logLevel > Logger.LOG_LEVEL_ERROR)
      return;

    args.unshift('background: red; color: #bada55;');
    if (this.name)
      args.unshift(`%c${this.name}: ${pattern}`);
    else
      args.unshift(`%c${pattern}`);
    console.error.apply(console, args);
  }

  /**
   * 打印debug日志
   *
   * @param pattern
   * @param args
   */
  debug(pattern, ...args) {
    if (this.logLevel > Logger.LOG_LEVEL_DEBUG)
      return;

    args.unshift('background: black; color: #bada55;');
    if (this.name)
      args.unshift(`%c${this.name}: ${pattern}`);
    else
      args.unshift(`%c${pattern}`);
    console.debug.apply(console, args);

  }

  /**
   * 打印warn日志
   *
   * @param pattern
   * @param args
   */
  warn(pattern, ...args) {
    if (this.logLevel > Logger.LOG_LEVEL_WARN)
      return;

    args.unshift('background: yellow; color: black;');
    if (this.name)
      args.unshift(`%c${this.name}: ${pattern}`);
    else
      args.unshift(`%c${pattern}`);
    console.warn.apply(console, args);
  }
}

// 初始化Logger类中的一些static变量, 类似java中的static代码块
['debug', 'info', 'warn', 'error'].forEach((level) => {
  if (globalConfig.log[level]) {
    for (const logger of globalConfig.log[level]) {
      Logger[`${level}Loggers`].add(logger);
    }
  }
});

export default Logger;
