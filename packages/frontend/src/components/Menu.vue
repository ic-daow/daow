<template>
  <b-menu>
    <b-menu-list label="Projects">
      <b-menu-item icon="usd" label="My investment" tag="router-link" to="/myInvest" :active="path=='/myInvest'"></b-menu-item>
      <b-menu-item icon="bell" expanded>
        <template #label="props">
          My projects
        </template>
        <b-menu-item icon="bell" label="Projects" tag="router-link" to="/myDao" :active="path=='/myDao'"></b-menu-item>
        <b-menu-item icon="add" label="Add project"  tag="router-link" to="/createDao"></b-menu-item>
      </b-menu-item>
      <b-menu-item icon="glasses" label="Available projects" tag="router-link" to="/daoList" :active="path=='/daoList'"></b-menu-item>
    </b-menu-list>
    <b-menu-list label="Governance">
      
      <b-menu-item label="Proposals" icon="link" tag="router-link" to="/proposalList" :active="path=='/proposalList'"></b-menu-item>

    </b-menu-list>
    <b-menu-list label="Actions">
      <b-menu-item label="Logout"></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
export default {
  props: {
    path: {
      type:String, 
      required:true
    },
  },
  data() {
    return {
    }
  },
  created(){
    console.log("$router.path:", this.path)
  }

}
</script>

<style scoped>
	.icon{
		height: 1rem !important;
    width: 1rem !important;
	}  
</style>