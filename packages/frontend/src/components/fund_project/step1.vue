<template>
  <div class="step1Page">
    <h1 class="title has-text-centered">Project name check</h1>
    <section>
      <b-field label="Project Name">
        <b-input v-model="projectName"></b-input>
      </b-field>
    </section>
  </div>
</template>

<script>
export default {
  name: "step1",
  props: {},
  components: {},
  computed: {},
  data() {
    return {
      projectName: "",
      id: "",
    };
  },
  mounted: function () {},
  watch: {
    projectName() {
      console.log(this.projectName)
      this.id = "";
    },
  },
  methods: {
    checkInfo() {
      return new Promise((resolve, reject) => {
        if (this.id) {
          resolve({
            id: this.id,
            name: this.projectName,
          });
          return;
        }
        this.$daoDao
          .then((daoDao) => {
            return daoDao.createProject({ name: this.projectName });
          })
          .then((res) => {
            this.id = res.id;
            resolve({
              id: res.id,
              name: this.projectName,
            });
          })
          .catch(reject);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.step1Page {
  margin: 40px 40px 30px 40px;
  border: 2px solid #eee;
  background-color: #f7f7f7;
  padding: 30px;
  border-radius: 8px;
  .title {
    margin-top: 20px;
  }

  .link-item {
    display: flex;
    justify-content: start;
    margin-bottom: 15px;

    .checkbox {
      flex: 100px 0 0;
    }
  }
}
</style>
