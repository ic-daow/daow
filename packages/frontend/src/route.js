import Vue from "vue";
import Router from "vue-router";
// import {
// 	i18n
// } from "@/utils/plugins/i18n.js";
// import items from "@/shared/constants/localStorage";

Vue.use(Router);

const router = new Router({
	mode: "hash",
	routes: [{
		path: "/",
		name: "Home",
		component: () =>
			import( /* webpackChunkName: "Home" */ "@/pages/Index.vue")
	},
	{
		path: "/daodetail",
		name: "daodetail",
		component: () => import("@/pages/DAODetail.vue")
	},
	{
		path: "/createDao",
		name: "createDao",
		component: () => import("@/pages/CreateDao.vue")
	},
	{
		path: "/daoList",
		name: "daoList",
		component: () => import("@/pages/DaoList.vue")
	},
	{
		path: "/myDao",
		name: "MyDao",
		component: () => import("@/pages/MyDao.vue")
	},	
	{
		path: "/myInvest",
		name: "MyInvest",
		component: () => import("@/pages/MyInvest.vue")
	},		
	{
		path: "/proposalList",
		name: "ProposalList",
		component: () => import("@/pages/ProposalList.vue")
	},	
	{
		path: "/createProposal",
		name: "CreateProposal",
		component: () => import("@/pages/CreateProposal.vue")
	},		
	// {
	// 	path: "/test",
	// 	name: "test",
	// 	component: () => import("@/pages/Test.vue")
	// }	
	]
	// scrollBehavior (to, from, savedPosition) {
	//   return { x: 0, y: 0 }
	// }
});
// router.beforeEach((to, from, next) => {
// 	if (localStorage.getItem(items.LANGUAGE) !== i18n.locale) {
// 		i18n.locale = localStorage.getItem(items.LANGUAGE);
// 	}
// 	next();
// });
export default router;
