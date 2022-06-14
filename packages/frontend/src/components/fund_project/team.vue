<template>
  <form action="">
    <div class="modal-card" style="width: 700px">
      <header class="modal-card-head">
        <p class="modal-card-title">Team</p>
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
          <b-input
            type="text"
            v-model="twitter"
            placeholder="write here"
            required
          >
          </b-input>
        </b-field>
        <b-field label="Pictures" horizontal>
          <b-upload v-model="pictureFile" drag-drop expanded :disabled="isUpload">
            <section class="section">
              <div class="content has-text-centered">
                <p>
                  <b-icon icon="upload" size="is-large"></b-icon>
                </p>
                <p>
                  {{
                    isUpload
                      ? "File is uploading"
                      : "Drop your files here or click to upload"
                  }}
                </p>
              </div>
            </section>
          </b-upload>
        </b-field>

        <div class="tags">
          <span class="tag is-primary" v-if="picture_id">
            {{ pictureFile ? pictureFile.name : "" }}
            <button
              class="delete is-small"
              type="button"
              @click="deleteDropFile()"
            ></button>
          </span>
        </div>
        <!-- <div class="tags">
			<span
            v-for="(file, index) in pictures"
            :key="index"
            class="tag is-primary"
			v-show="picIds[index]"
          >
            {{ file.name }}
            <button
              class="delete is-small"
              type="button"
              @click="deleteDropFile(index)"
            ></button>
          </span>
        </div> -->
      </section>
      <footer class="modal-card-foot">
        <b-button label="confirm" type="is-primary" @click="confirm" />
      </footer>
    </div>
  </form>
</template>

<script>
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
      name: "",
      position: "",
      twitter: "",
      pictureFile: null,
      picture_id: "",
      isUpload: false,
    };
  },
  watch: {
    infoObject(val) {
      this.name = val.name || "";
      this.position = val.position || "";
      this.twitter = val.twitter || "";
	  this.pictureFile = val.pictureFile || null;
      this.picture_id = val.picture_id || "";
    },
    pictureFile(file) {
      if (file) {
        this.isUpload = true;
        this.$uploadPicture(file, "picture")
          .then((res) => {
            this.isUpload = false;
            console.log(res);
            if (res && res.id) {
              this.picture_id = res.id;
            }
          })
          .catch((err) => {
            this.isUpload = false;
            console.log(err);
          });
      }
      //   console.log(files);
      //   if (files.length && files.length == old.length) {
      //     files.map((file) => {
      //       if (!file.id) {
      //         this.isUpload = true;
      //         this.$uploadPicture(file, "picture")
      //           .then((res) => {
      //             this.isUpload = false;
      //             console.log(res);
      //             if (res && res.id) {
      //               this.picIds.push(res.id);
      //             }
      //           })
      //           .catch((err) => {
      //             this.isUpload = false;
      //             console.log(err);
      //           });
      //       }
      //     });
      //   }
    },
  },
  methods: {
    confirm() {
      let info = {
        name: this.name,
        position: this.position,
        twitter: this.twitter,
        picture_id: this.picture_id,
		pictureFile: this.pictureFile,
		picture:[]
      };
      if (this.name == "" || this.position == "" || this.picture_id == "") {
        return;
      }
      console.log(info);
      this.$emit("updateTeams", {
        isEdit: this.index ? true : false,
        index: this.index,
        data: info,
      });
      this.$emit("close");
    },
    deleteDropFile(index) {
      this.pictureFile = null;
      this.picture_id = "";
      //   this.pictures.splice(index, 1);
      //   this.picIds.splice(index, 1);
    },
  },
};
</script>

<style>
</style>
