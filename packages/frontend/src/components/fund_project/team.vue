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
				<b-field label="Position" horizontal>
					<b-select v-model="position">
						<option value="DIP">DIP</option>
					</b-select>
				</b-field>
				<b-field label="Twitter" horizontal>
					<b-input type="text" v-model="twitter" placeholder="write here" required>
					</b-input>
				</b-field>
				<b-field label="Pictures" horizontal>
					<b-upload v-model="dropFiles" multiple drag-drop expanded>
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
					<span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary">
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
import { faLessThan } from '@fortawesome/free-solid-svg-icons';

export default {
	name: "Team",
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
			position: '',
			twitter: '',
			dropFiles: []
		}
	},
	watch: {
		teamObject(val) {
			if (val) {
				this.name = val.name || "";
				this.position = val.position;
				this.twitter = val.twitter;
				this.dropFiles = val.dropFiles;
			}
		}
	},
	methods: {
		confirm() {
			let info = {
				name: this.name,
				position: this.position,
				twitter: this.twitter,
				dropFiles: this.dropFiles
			};
			if (this.name == '' || this.position == '' || this.dropFiles.length == 0) {
				return;
			}
			console.log(info)
			this.$emit("updateTeams", { isEdit: this.index ? true : false, index: this.index, data: info });
			this.$emit('close');
		},
		deleteDropFile(index) {
			this.dropFiles.splice(index, 1);
		}
	}
}
</script>

<style>
</style>
