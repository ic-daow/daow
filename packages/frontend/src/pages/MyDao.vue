<template>
<div class="container">
	<dao-menu class="dao-menu" path="/myDao"></dao-menu>
	<div class="dao-content">
		<b-table
			:data="data"
			ref="table"
			detailed
			detail-key="id"
			:show-detail-icon="true"
			detail-transition="fade"
			>

			<b-table-column field="id" label="ID" width="40" numeric v-slot="props">
				{{ props.row.id }}
			</b-table-column>

			<b-table-column field="name" label="Name" sortable v-slot="props">
				<a @click="gotoProject(props.row.id)"> {{ props.row.name }} </a>
			</b-table-column>

			<b-table-column field="status" label="Status" sortable v-slot="props">
				{{ props.row.status }}
			</b-table-column>

			<b-table-column field="created_at" label="Create At" sortable centered v-slot="props">
				<span class="tag is-success">
					{{ ts2Date(props.row.created_at) }}
				</span>
			</b-table-column>

			<template #detail="props">
				<article class="media">
					<figure class="media-left">
						<p class="image is-64x64">
							<img :src="`${$config.host}?canisterId=${$config.pid}&picId=${props.row.logo_id}`">
						</p>
					</figure>
					<div class="media-content">
						<div class="content">
							<p>
								<strong>{{ props.row.name }}</strong>
								<small>@{{ props.row.team.name }}</small>
								<br>
								{{ props.row.description }}
							</p>
						</div>
					</div>
				</article>
			</template>
		</b-table>
	
	</div>
</div>
</template>

<script>
	import { dateFormat } from '../lib/util';
	import DaoMenu from "@/components/Menu.vue";

    export default {
		name: 'DaoList',
		components: {
			DaoMenu
		},
        data() {
            return {
                total: 0,
                current: 1,
                perPage: 10,
                rangeBefore: 3,
                rangeAfter: 1,
                order: '',
                size: 'is-small',
                isSimple: false,
                isRounded: false,
                hasInput: false,
                prevIcon: 'chevron-left',
                nextIcon: 'chevron-right',
                inputPosition: '',
                inputDebounce: '',
                
				data: [],
            }
        },
		methods: {
			ts2Date(mts){
				return dateFormat(Number(mts / 1000000n), 'YYYY-mm-dd HH:MM');
			},
			gotoProject(id){
				console.log("gotoProject:", id)
				this.$router.push({ path: `/daodetail?id=${id}` });
			},
			async fectchData(){
				const dao = await this.$daoDao;
				console.log("dao:", dao);
				const res = await dao.getMyProject({
				});
				console.log("res:", res)
				this.total = res.total;
				this.data = res.data;				
			},
			change(){
				this.fectchData();
			}
		},

		async created(){
			this.fectchData();
		}
    }
</script>

<style>
.container{
	display: flex;
}
.dao-menu{
	width: 250px;
	height: 100%;
	margin-right: 50px;
}
.dao-content{
	flex: 1;
}
</style>
