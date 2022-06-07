<template>
    <div class="step3Page">
        <h1 class="title has-text-centered">Dao Detail</h1>
        <section>
           <b-field v-for="(item, index) in DaoMembers" :key="index"  :label="'Dao Member' + (index + 1)" horizontal>
                <b-input type="number" v-model="item.value" placeholder="write here" required></b-input>
                <b-button v-if="index>=2" class="button is-primary" @click="delMember(index)">Delete</b-button>
            </b-field>
            <b-field horizontal> 
                <p class="control">
                    <b-button class="button is-primary" @click="addMember">add</b-button>
                </p>
            </b-field>
           
        </section>
    </div>
</template>

<script>

export default {
    name: "step3",
    props: {
        msg: String,
    },
    data() {
        return {
            DaoMembers:[{value:""},{value:""}]
        }
    },
    mounted: function () {

    },
    methods: {
        addMember(){
           	this.DaoMembers.push({ value: "" });
        },
        delMember(index){
            this.DaoMembers.splice(index, 1);
        },
        checkInfo() {
            let info = {
                DaoMembers: this.DaoMembers
            }
            return info;
        }
    },
};
</script>

<style>
</style>
