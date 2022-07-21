<template>
	<div id="app">
		<Header msg=""></Header>
		<router-view />
        <b-notification :closable="false">
            <b-loading is-full-page v-model="isLoading" :can-cancel="true"></b-loading>
        </b-notification>
	</div>
</template>

<script>
import { mapState } from "vuex";
import Header from './components/Header.vue'
export default {
	name: 'app',
	computed: {
    	...mapState(['isLoading']),
  	},
	components: {
		Header
	},
	methods:{
	},
}
</script>

<style>
html {
  background-color: #000 !important;
}
.notification {
  background-color: transparent !important;
}
.navbar {
  background-color: transparent !important;
}
.loading-overlay .loading-background {
  background: rgba(0, 0, 0, 0.1) !important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  background-color: #000;
}
.field-body > .field {
  flex-grow: unset !important;
}
.icon {
  height: 1rem !important;
  width: 1rem !important;
}
.tag {
}
.b-steps .steps .step-items .step-item .step-link {
  color: #fff !important;
}
</style>
