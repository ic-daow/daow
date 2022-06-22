<template>
<div class="container">
	<dao-menu class="dao-menu" path='/proposalList'></dao-menu>
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
				 {{ props.row.id }} <!--a @click="gotoProposal(props.row.id)"> </a-->
			</b-table-column>

			<b-table-column field="project_id" label="Project" sortable v-slot="props">
				{{ props.row.payload.project_id }}
			</b-table-column>

			<b-table-column field="votes_yes" label="votes_yes" sortable v-slot="props">
				{{ props.row.votes_yes.amount_e8s /100000000 }}
			</b-table-column>

			<b-table-column field="votes_no" label="votes_no" sortable v-slot="props">
				{{ props.row.votes_no.amount_e8s /100000000 }}
			</b-table-column>
			<b-table-column field="amount_e8s" label="Claim Amount" sortable v-slot="props">
				{{ props.row.payload.amount_e8s / 100000000 }}
			</b-table-column>

			<b-table-column field="state" label="State" sortable v-slot="props">
				{{ props.row.state }}
			</b-table-column>

			<b-table-column field="created_at" label="Create At" sortable centered v-slot="props">
				<span class="tag is-success">
					{{ ts2Date(props.row.created_at) }}
				</span>
			</b-table-column>

			<template #detail="props">
				<article class="media">
					<div class="media-content">
						<div class="content" v-if="props.row.voters.indexOf(userInfo.owner)==-1">
          
                            <b-button
                            class="next-button"
                            @click="vote(props.row.id, 'Yes')"
                            type="is-primary"
                            >Yes</b-button                            
                            >
                            <b-button
                            class="next-button"
                            @click="vote(props.row.id, 'No')"
                            type="is-primary"
                            >No</b-button
                            >

						</div>
					</div>
				</article>
			</template>
		</b-table>
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
</div>
</template>

<script>
    import { mapState, mapMutations } from "vuex";
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
        computed: {
            ...mapState({
                userInfo: (state) => state.userInfo,
            }),
        },        
		methods: {
            ...mapMutations(['setIsLoading']),	
            async vote(id, option) {
                const dao = await this.$daoDao;
                this.$buefy.dialog.confirm({
                    message: 'confirm your vote?',
                    onConfirm: async () => {
                        const params = {
                            proposal_id: id,
                            vote: option,
                        };
                        try {
                            this.setIsLoading(true)
                            console.log("voteClaimProposal:", params)
                            const res = await dao.voteClaimProposal(params);
                            console.log("voteClaimProposal res:", res)
                            await this.fectchData();
                        } catch(e) {
                            console.error("vote:",e)
                        } finally {
                            this.setIsLoading(false);
                        }
                    }
                })   
            },

			ts2Date(mts){
				return dateFormat(Number(mts / 1000000n),  'YYYY-mm-dd HH:MM');
			},
			gotoProposal(id){
				console.log("gotoProposal:", id)
				this.$router.push({ path: `/proposalDetail?id=${id}` });
			},
			async fectchData(){
				const dao = await this.$daoDao;
				console.log("dao:", dao);
				const res = await dao.getPagedClaimProposal({
					page: this.current-1,
					size: 10,
					query: '',
				});
				console.log("res:", res)
				this.total = res.total;
				this.data = res.data				
			},
			async change(){
                this.setIsLoading(true)
				await this.fectchData();
                this.setIsLoading(false);
			}
		},

		async created(){
			this.change();
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
.next-button{
    margin-left: 50px;
}
</style>
