import Vue from "vue";
import Router from "vue-router";
import { getCookie } from "@/utils/utils.js";

Vue.use(Router);

const constantRouterMap = [
  {
    path: '/',
    name: 'list',
    meta: { auth: false },
    redirect: '/list',
  },
  // {
  //   path: "/index",
  //   name: "index",
  //   meta: { auth: false },
  //   component: () => import('../views/index')
  // },
  {
    path: "/list",
    name: "list",
    meta: { auth: false },
    component: () => import('../views/list')
  },
  {
    path: "/cmbcProject",
    name: "cmbcProject",
    meta: { auth: false },
    component: () => import('../views/projects/cmbcProject')
  },
  {
    path: "/dengtaIntroProject",
    name: "dengtaIntroProject",
    meta: { auth: false },
    component: () => import('../views/projects/dengtaIntroProject')
  },
  {
    path: "/closeReview",
    name: "closeReview",
    meta: { auth: false },
    component: () => import('../views/projects/closeReview')
  },
  {
    path: "/northFunds",
    name: "northFunds",
    meta: { auth: false },
    component: () => import('../views/projects/northFunds')
  },
  {
    path: "/marketcapRaceStockA",
    name: "marketcapRaceStockA",
    meta: { auth: false },
    component: () => import('../views/projects/marketcapRaceStockA')
  },
  {
    path: "/bossFestival",
    name: "bossFestival",
    meta: { auth: false },
    component: () => import('../views/projects/bossFestival')
  },
  {
    path: "/anyElementDemo",
    name: "anyElementDemo",
    meta: { auth: false },
    component: () => import('../views/demos/anyElementDemo')
  },
  {
    path: "/maskTextDemo",
    name: "maskTextDemo",
    meta: { auth: false },
    component: () => import('../views/demos/maskTextDemo')
  },
  {
    path: "/granimBgDemo",
    name: "granimBgDemo",
    meta: { auth: false },
    component: () => import('../views/demos/granimBgDemo')
  },
  {
    path: "/starryBackgroundDemo",
    name: "starryBackgroundDemo",
    meta: { auth: false },
    component: () => import('../views/demos/starryBackgroundDemo')
  },
  {
    path: "/scrambleTextDemo",
    name: "scrambleTextDemo",
    meta: { auth: false },
    component: () => import('../views/demos/scrambleTextDemo')
  },
  {
    path: "/animelTextDemo",
    name: "animelTextDemo",
    meta: { auth: false },
    component: () => import('../views/demos/animelTextDemo')
  },
  {
    path: "/horizenTransferDemo",
    name: "horizenTransferDemo",
    meta: { auth: false },
    component: () => import('../views/demos/horizenTransferDemo')
  },
  {
    path: "/staggerBarsTransferDemo",
    name: "staggerBarsTransferDemo",
    meta: { auth: false },
    component: () => import('../views/demos/staggerBarsTransferDemo')
  },
  {
    path: "/pixelWaveTransferDemo",
    name: "pixelWaveTransferDemo",
    meta: { auth: false },
    component: () => import('../views/demos/pixelWaveTransferDemo')
  },
  {
    path: "/graphTransferDemo",
    name: "graphTransferDemo",
    meta: { auth: false },
    component: () => import('../views/demos/graphTransferDemo')
  },
  {
    path: "/particleEffectDemo",
    name: "particleEffectDemo",
    meta: { auth: false },
    component: () => import('../views/demos/particleEffectDemo')
  },
  {
    path: "/barChartDemo",
    name: "barChartDemo",
    meta: { auth: false },
    component: () => import('../views/demos/barChartDemo')
  },
  {
    path: "/barChartDemo2",
    name: "barChartDemo2",
    meta: { auth: false },
    component: () => import('../views/demos/barChartDemo2')
  },
  {
    path: "/barRangeChartDemo",
    name: "barRangeChartDemo",
    meta: { auth: false },
    component: () => import('../views/demos/barRangeChartDemo')
  },
  {
    path: "/barDoubleDemo",
    name: "barDoubleDemo",
    meta: { auth: false },
    component: () => import('../views/demos/barDoubleDemo')
  },
  {
    path: "/barHistoryChartDemo",
    name: "barHistoryChartDemo",
    meta: { auth: false },
    component: () => import('../views/demos/barHistoryChartDemo')
  },
  {
    path: "/forceChartDemo",
    name: "forceChartDemo",
    meta: { auth: false },
    component: () => import('../views/demos/forceChartDemo')
  },
  {
    path: "/treeMapDemo",
    name: "treeMapDemo",
    meta: { auth: false },
    component: () => import('../views/demos/treeMapDemo')
  },
  {
    path: "/donutChartDemo",
    name: "donutChartDemo",
    meta: { auth: false },
    component: () => import('../views/demos/donutChartDemo')
  },
  {
    path: "/roseChartDemo",
    name: "roseChartDemo",
    meta: { auth: false },
    component: () => import('../views/demos/roseChartDemo')
  },
  {
    path: "/lineChartDemo",
    name: "lineChartDemo",
    meta: { auth: false },
    component: () => import('../views/demos/lineChartDemo')
  },
  
];

const router = new Router({
  mode: "history",
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    const position = { x: 0, y: 0 };
    if (savedPosition) {
      return savedPosition;
    }
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0;
      position.y = 0;
    }
    return position;
  },
  routes: constantRouterMap
});

// const getToken = () => {
//   return getCookie("token");
// };
router.beforeEach((to, from, next) => {
  //根据字段判断是否路由过滤
  if (to.matched.some(record => record.meta.auth)) {
    if (localStorage.loginInfo === undefined || !localStorage.loginInfo) {
      //防止无限循环
      if (to.name === "login") {
        next();
        return;
      }
      next({
        path: "/login"
      });
    } else {
      next()
    }
    // if (getToken() !== null) {
    //   // 本地缓存获取用户信息
    //   next();
    // } else {
    //   //防止无限循环
    //   if (to.name === "login") {
    //     next();
    //     return;
    //   }
    //   next({
    //     path: "/login"
    //   });
    // }
  } else {
    next();
  }
});

export default router;
