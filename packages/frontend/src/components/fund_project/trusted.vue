<template>
	<form action="">
		<div class="modal-card" style="width: 700px">
			<header class="modal-card-head">
				<p class="modal-card-title">Tokenconomics</p>
				<button type="button" class="delete" @click="$emit('close')" />
			</header>
			<section class="modal-card-body">
				<b-field label="Name" horizontal>
					<b-input type="text" v-model="name" placeholder="write here" required>
					</b-input>
				</b-field>
				<b-field label="Link" horizontal>
					<b-input type="text" v-model="link" placeholder="write here" required>
					</b-input>
				</b-field>
				<b-field label="Logo" horizontal>
					<b-upload v-model="logos" multiple drag-drop expanded>
						<section class="section">
							<div class="content has-text-centered">
								<p>
									<b-icon icon="upload" size="is-large"></b-icon>
								</p>
								<p>Drop your files here or click to upload</p>
							</div>
						</section>
					</b-upload>
				</b-field>

				<div class="tags">
					<span v-for="(file, index) in logos" :key="index" class="tag is-primary">
						{{ file.name }}
						<button class="delete is-small" type="button" @click="deleteDropFile(index)"></button>
					</span>
				</div>

			</section>
			<footer class="modal-card-foot">
				<b-button label="confirm" type="is-primary" @click="confirm" />
			</footer>
		</div>
	</form>
</template>

<script>

export default {
	name: "Trusted",
	props: {
		infoObject: {
			type: Object,
			default: () => ({}),
		},
		index: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			name: '',
			link: '',
			logos: []
		}
	},
	watch: {
		teamObject(val) {
			if (val) {
				this.name = val.name || "";
				this.link = val.link;
				this.logos = val.logos;
			}
		}
	},
	methods: {
		confirm() {
			let info = {
				name: this.name,
				link: this.link,
				logos: this.logos
			};
			if (this.name == '' || this.link == '' || this.logos.length == 0) {
				return;
			}
			console.log(info)
			this.$emit("updateTrusted", { isEdit: this.index ? true : false, index: this.index, data: info });
			this.$emit('close');
		},
		deleteDropFile(index) {
			this.logos.splice(index, 1);
		}
	}
}
</script>

<style>
</style>
