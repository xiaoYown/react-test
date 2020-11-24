import PageIndex from '../Index'
import PageHome from '../Home'
import PageFlv from '../Flv'
import PageDataset from '../Dataset'
import PageL7 from '../L7'
import PageUserAgent from '../UserAgent'
import PageTest from '../Test'
import PageTheme from '../Theme'
import PageRecoil from '../Recoil'
import PageMobx from '../Mobx'
import PageAlgorithm from '../Algorithm'
import PageMemoryLeak from '../MemoryLeak'

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
  {
    path: '/flv',
    name: 'flv',
    component: PageFlv,
    exact: true
  },
  {
    path: '/dataset',
    name: 'dataset',
    component: PageDataset,
    exact: true
  },
  {
    path: '/l7',
    name: 'l7',
    component: PageL7,
    exact: true
  },
  {
    path: '/user-agent',
    name: 'agent',
    component: PageUserAgent,
    exact: true
  },
  {
    path: '/test',
    name: 'test',
    component: PageTest,
    exact: true
  },
  {
    path: '/theme',
    name: 'theme',
    component: PageTheme,
    exact: true
  },
  {
    path: '/recoil',
    name: 'recoil',
    component: PageRecoil,
    exact: true
  },
  {
    path: '/mobx',
    name: 'mobx',
    component: PageMobx,
    exact: true
  },
  {
    path: '/algorithm',
    name: 'algorithm',
    component: PageAlgorithm,
    exact: true
  },
  {
    path: '/memoryleak',
    name: 'memoryleak',
    component: PageMemoryLeak,
    exact: true
  },
];

export default routers;
