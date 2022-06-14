<template>
	<div id="app">
		<Header msg="test111"></Header>
		<router-view />
	</div>
</template>

<script>
	import Header from './components/Header.vue'
	export default {
		name: 'app',
		components: {
			Header
		}
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
		height: 1rem !important;
    	width: 1rem !important;
	}
	.tag {

    }
</style>
