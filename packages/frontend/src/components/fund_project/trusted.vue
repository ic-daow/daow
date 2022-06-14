<template>
  <form action="">
    <div class="modal-card" style="width: 700px">
      <header class="modal-card-head">
        <p class="modal-card-title">Trust_by</p>
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
          <b-upload v-model="logoFile" drag-drop expanded :disabled="isUpload">
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
          <span class="tag is-primary" v-if="logo_id">
            {{ logoFile.name }}
            <button
              class="delete is-small"
              type="button"
              @click="deleteDropFile()"
            ></button>
          </span>
        </div>
        <!-- <div class="tags">
          <span
            v-for="(file, index) in logos"
            :key="index"
            class="tag is-primary"
            v-show="logoIds[index]"
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
      name: "",
      link: "",
      logoFile:null,
      logo_id: "",
      isUpload: false,
    };
  },
  watch: {
    infoObject(val) {
      this.name = val.name || "";
      this.link = val.link || "";
	    this.logoFile = val.logoFile || null;
      this.logo_id = val.logo_id || "";
    },
    logoFile(file) {
      if (file) {
        this.isUpload = true;
        this.$uploadPicture(file, "trusted")
          .then((res) => {
            this.isUpload = false;
            console.log(res);
            if (res && res.id) {
              this.logo_id = res.id;
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
      //         this.$uploadPicture(file, "trusted")
      //           .then((res) => {
      //             this.isUpload = false;
      //             console.log(res);
      //             if (res && res.id) {
      //               this.logoIds.push(res.id);
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
        link: this.link,
        logo_id: this.logo_id,
        logo: [],
		    logoFile: this.logoFile
      };
      if (this.name == "" || this.link == "" || this.logo_id == "") {
        return;
      }
      console.log(info);
      this.$emit("updateTrusted", {
        isEdit: this.index ? true : false,
        index: this.index,
        data: info,
      });
      this.$emit("close");
    },
    deleteDropFile(index) {
		 this.logoFile = null;
		 this.logo_id = "";
    //   this.logos.splice(index, 1);
    //   this.logoIds.splice(index, 1);
    },
  },
};
</script>

<style>
</style>
