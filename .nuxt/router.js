'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _865ae612 = () => import('/Users/mac/Desktop/mine/NightCat/admin/pages/index.vue' /* webpackChunkName: "pages/index" */)

const _46bd611f = () => import('/Users/mac/Desktop/mine/NightCat/admin/pages/_id.vue' /* webpackChunkName: "pages/id" */)



const scrollBehavior = (to, from, savedPosition) => {
  // savedPosition is only available for popstate navigations.
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // if no children detected
    if (to.matched.length < 2) {
      // scroll to the top of the page
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // if one of the children has scrollToTop option set to true
      position = { x: 0, y: 0 }
    }
    // if link has anchor,  scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}


export default new Router({
  mode: 'history',
  base: '/admin',
  linkActiveClass: 'nuxt-link-active',
  scrollBehavior,
  routes: [
		{
			path: "/",
			component: _865ae612,
			name: "index"
		},
		{
			path: "/:id",
			component: _46bd611f,
			name: "id"
		}
  ]
})
