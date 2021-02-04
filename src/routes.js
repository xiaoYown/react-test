import PageIndex from './Index';
import PageHome from './Home';
// import PagePixi from './Pixi';
import PageOsTheme from './OsTheme';
// import PageFlv from './Flv';
// import PageDataset from './Dataset';
// import PageL7 from './L7';
// import PageEcharts from './Echarts';
// import PageUserAgent from './UserAgent';
// import PageTest from './Test';
// import PageTheme from './Theme';
// import PageRecoil from './Recoil';
// import PageMobx from './Mobx';
// import PageAlgorithm from './Algorithm';
// import PageMemoryLeak from './MemoryLeak';
// import PageVirtualized from './Virtualized';
// import PageContext from './Context';
// import PageAxisBoard from './AxisBoard';
// import PageD3Zoom from './D3Zoom';
// import PageFlexible from './Flexible';
// import PageFixedAdaptation from './FixedAdaptation';

const routers = [
  {
    path: '/',
    name: 'index',
    component: PageIndex,
    exact: true
  },
  {
    path: '/home',
    name: 'home',
    component: PageHome,
    exact: true
  },
  // {
  //   path: '/pixi',
  //   name: 'pixi',
  //   component: PagePixi,
  //   exact: true
  // },

  {
    path: '/os-theme',
    name: 'os-theme',
    component: PageOsTheme,
    exact: true
  },  // {
  //   path: '/flv',
  //   name: 'flv',
  //   component: PageFlv,
  //   exact: true
  // },
  // {
  //   path: '/dataset',
  //   name: 'antv dataset',
  //   component: PageDataset,
  //   exact: true
  // },
  // {
  //   path: '/l7',
  //   name: 'l7',
  //   component: PageL7,
  //   exact: true
  // },
  // {
  //   path: '/echarts',
  //   name: 'echarts',
  //   component: PageEcharts,
  //   exact: true
  // },
  // {
  //   path: '/user-agent',
  //   name: 'agent',
  //   component: PageUserAgent,
  //   exact: true
  // },
  // {
  //   path: '/test',
  //   name: 'test',
  //   component: PageTest,
  //   exact: true
  // },
  // {
  //   path: '/theme',
  //   name: 'theme',
  //   component: PageTheme,
  //   exact: true
  // },
  // {
  //   path: '/recoil',
  //   name: 'recoil',
  //   component: PageRecoil,
  //   exact: true
  // },
  // {
  //   path: '/mobx',
  //   name: 'mobx',
  //   component: PageMobx,
  //   exact: true
  // },
  // {
  //   path: '/algorithm',
  //   name: '算法优化',
  //   component: PageAlgorithm,
  //   exact: true
  // },
  // {
  //   path: '/memoryleak',
  //   name: '内存泄露',
  //   component: PageMemoryLeak,
  //   exact: true
  // },
  // {
  //   path: '/virtualized',
  //   name: '虚拟列表',
  //   component: PageVirtualized,
  //   exact: true
  // },
  // {
  //   path: '/context',
  //   name: 'context',
  //   component: PageContext,
  //   exact: true
  // },
  // {
  //   path: '/axis-board',
  //   name: '坐标系',
  //   component: PageAxisBoard,
  //   exact: true
  // },
  // {
  //   path: '/d3-zoom',
  //   name: 'd3-zoom',
  //   component: PageD3Zoom,
  //   exact: true
  // },
  // {
  //   path: '/flexible',
  //   name: 'flexible',
  //   component: PageFlexible,
  //   exact: true
  // },
  // {
  //   path: '/fixed-adaptation',
  //   name: 'fixed-adaptation',
  //   component: PageFixedAdaptation,
  //   exact: true
  // },
];

export default routers;
