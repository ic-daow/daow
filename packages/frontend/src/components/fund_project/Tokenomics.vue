<template>
	<form action="">
		<div class="modal-card" style="width: 700px">
			<header class="modal-card-head">
				<p class="modal-card-title">Tokenconomics</p>
				<button type="button" class="delete" @click="$emit('close')" />
			</header>
			<section class="modal-card-body">
				<b-field label="Token standard" horizontal>
					<b-select v-model="standard">
						<option value="DIP">DIP</option>
					</b-select>
				</b-field>
				<b-field label="DID" horizontal>
					<b-input type="text" v-model="did" placeholder="write here" required>
					</b-input>
				</b-field>
				<b-field label="Symbol" horizontal>
					<b-input type="text" v-model="symbol" placeholder="write here" required>
					</b-input>
				</b-field>
				<b-field label="Toral supply" horizontal>
					<b-input type="text" v-model="totalSupply" placeholder="write here" required>
					</b-input>
				</b-field>
				<b-field label="Distribution">

				</b-field>
				<template>
					<b-field v-for="(item, index) in distribution" :key="index" :label="item.title" horizontal>
						<b-input type="number" v-model="item.value" placeholder="write here" required></b-input>
						<b-button v-if="index >= 2" class="button is-primary" @click="delDistribution(index)">Delete
						</b-button>
					</b-field>
				</template>
				<b-field horizontal>
					<b-input type="text" v-model="newDisTitle" placeholder="write title here"></b-input>
					<b-input type="number" v-model="newDisValue" placeholder="write here"></b-input>
					<p class="control">
						<b-button class="button is-primary" @click="addDistribution">add</b-button>
					</p>
				</b-field>

			</section>
			<footer class="modal-card-foot">
				<b-button label="confirm" type="is-primary" @click="confirm" />
			</footer>
		</div>
	</form>
</template>

<script>
export default {
	name: "Tokenomics",
	props: ['email', 'password', 'canCancel'],
	data() {
		return {
			isComponentModalActive: false,
			standard: '',
			did: '',
			symbol: '',
			totalSupply: '',
			distribution: [{
				title: "Team",
				value: ""
			}, {
				title: "Marketing",
				value: ""
			}],
			newDisTitle: '',
			newDisValue: ''
		}
	},
	methods: {
		confirm() {
			let info = {
				standard: this.standard,
				did: this.did,
				symbol: this.symbol,
				totalSupply: this.totalSupply,
				distribution: this.distribution,
			};
		
			if (this.standard == '' || this.did == '' || this.symbol == '' || this.totalSupply == '' || this.distribution[0].value == '' || this.distribution[1].value == '') {
				return;
			}
				console.log(info)
			this.$emit("updateTokenomics", info);
			this.$emit('close');
		},
		addDistribution() {
			console.log("asdasdasd", this.newDisTitle, this.newDisValue)
			if (this.newDisTitle && this.newDisValue) {
				this.distribution.push({ title: this.newDisTitle, value: this.newDisValue });
				this.newDisTitle = "";
				this.newDisValue = "";
			}
		},
		delDistribution(index) {
			this.distribution.splice(index, 1);
		}
	}
}
</script>

<style>
</style>
