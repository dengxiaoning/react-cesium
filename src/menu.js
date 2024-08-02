/**
 * 定义sidebar和header中的菜单项
 *
 * 一些约定:
 * 1.菜单最多3层;
 * 2.只有"叶子"节点才能跳转;
 * 3.所有的key都不能重复;
 */
const sidebarMenu = [
  {
    key: 'tools',  // route时url中的值
    name: '工具组件',  // 在菜单中显示的名称
    icon: 'icon-Tools',  // 图标是可选的
    child: [
      {
        key: 'draw',
        name: '标绘',
        icon: 'icon-radar_plot',  
      },
      {
        key: 'analysis',
        name: '三维分析',
        icon: 'icon-analysis',  
      }
    ],
  },
  {
    key: 'fanShapeScan',
    name: '扇形扫描',
    icon: 'icon-fan',
  },
  {
    key: 'material',
    name: '材质',
    icon: 'icon-materials',
    child: [
      {
        key: 'linkPointFlow',
        name: '流动线',
        icon: 'icon-stack-overflow-line',
      }
    ],
  },
  {
    key: 'modelExample',
    name: '模型案例',
    icon:'icon-model_',
    child: [
      {
        key: 'postProcessStages',
        name: '后置场景控制',
        icon:'icon-blue_tips',
      },
      {
        key: 'threeCesium',
        name: 'cesium整合threee',
        icon: 'icon-d',
        child: [
          {
            key: 'aniSoldier',
            name: '奔跑的士兵',
            icon: 'icon-run-fill',
          },
          {
            key: 'rayCast',
            name: '光线投射',
            icon: 'icon-users-rays',
          }
        ],
      },
    ],
  }
];

export default sidebarMenu;

// 对于headerMenu的菜单项, 可以让它跳到外部地址, 如果设置了url属性, 就会打开一个新窗口
// 如果不设置url属性, 行为和sidebarMenu是一样的, 激活特定的组件, 注意在index.js中配置好路由, 否则会404
export const headerMenu = [
  {
    // 一个特殊的key, 定义用户菜单, 在这个submenu下面设置icon/name不会生效
    key: 'userMenu',
    icon:'icon-team',
    child: [
      {
        key: 'github',
        name: '仓库地址',
        icon: 'icon-github',
        url: 'https://github.com/dengxiaoning/cesium_dev_kit',
      },
      {
        key: 'docs',
        name: '文档地址',
        icon: 'icon-readthedocs',
        url: 'https://benpaodehenji.com/cesiumDevKitDoc/',
      },
    ],
  },
  {
    key: 'modelExample',
    name: '模型案例',
    icon:'icon-model_',
    child: [
      {
        key: 'postProcessStages',
        name: '后置场景控制',
        icon:'icon-blue_tips',
      },
      {
        key: 'threeCesium',
        name: 'cesium整合threee',
        icon: 'icon-d',
        child: [
          {
            key: 'aniSoldier',
            name: '奔跑的士兵',
            icon: 'icon-run-fill',
          },
          {
            key: 'rayCast',
            name: '光线投射',
            icon: 'icon-users-rays',
          }
        ],
      },
    ],
  },
  {
    key: 'fanShapeScan',
    name: '扇形扫描',
    icon: 'icon-fan',
  },
];
