<template>
<div class="container">

<section>
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
</section>

	<b-pagination
		:total="total"
		v-model="current"
		:range-before="rangeBefore"
		:range-after="rangeAfter"
		:order="order"
		:size="size"
		:simple="isSimple"
		:rounded="isRounded"
		:per-page="perPage"
		:icon-prev="prevIcon"
		:icon-next="nextIcon"
		aria-next-label="Next page"
		aria-previous-label="Previous page"
		aria-page-label="Page"
		aria-current-label="Current page"
		:page-input="hasInput"
		:page-input-position="inputPosition"
		:debounce-page-input="inputDebounce"
		@change="change">
	</b-pagination>	
</div>
</template>

<script>
	import { dateFormat } from '../lib/util';
	
    export default {
		name: 'DaoList',
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
				return dateFormat(mts / 1000000, 'YYYY-mm-dd HH:MM');
			},
			gotoProject(id){
				console.log("gotoProject:", id)
				this.$router.push({ path: `/daodetail?id=${id}` });
			},
			async fectchData(){
				const dao = await this.$daoDao;
				console.log("dao:", dao);
				const res = await dao.getPagedProject({
					page: this.current-1,
					size: 10,
					query: '',
				});
				console.log("res:", res)
				this.total = res.total;
				this.data = res.data				
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
</style>
