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
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}
	.field-body > .field{
		flex-grow: unset !important;
	}
	.icon{
		height: 0.5rem !important;
    	width: 0.5rem !important;
	}
	.tag {

    }
</style>
