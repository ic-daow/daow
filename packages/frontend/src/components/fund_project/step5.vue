<template>
  <div class="step5Page">
    <div v-if="isComplete">
      <div class="success">
        <b-icon class="icon2" icon="fa-check" size="is-large"></b-icon>
      </div>
      <div class="success-text">Submit Successfully!</div>
      <p class="has-text-centered">
        <countdown :time="5 * 1000" @end="handleCountdownEnd">
          <template slot-scope="props">
            Return to home page after {{ props.seconds }}S
          </template>
        </countdown>
      </p>
    </div>

    <div v-if="!isComplete" class="button-container">
      <b-button
        :loading="isLoading"
        class="submit-button"
        type="is-primary"
        @click.prevent="submit()"
        >Submit
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "step2",
  props: {
    id: Number,
  },
  data() {
    return {
      isLoading: false,
      isComplete: false,
    };
  },
  mounted: function () {},
  methods: {
    submit() {
      console.log("submit", this.id);
      this.isLoading = true;
      this.$daoDao
        .then((daoDao) => {
          return daoDao.submitProject(this.id);
        })
        .then((result) => {
          this.isLoading = false;
          this.isComplete = true;
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    handleCountdownEnd() {
      location.href = "/";
    },
  },
};
</script>

<style lang="scss" scoped>
.step5Page {
  .success {
    border: 10px solid green;
    width: 100px;
    height: 100px;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 100px auto 0 auto;

    .icon2 {
      width: 30px !important;
      height: 30px !important;
      color: green;
    }
  }

  .success-text {
    font-size: 20px;
    color: green;
    text-align: center;
    margin-top: 20px;
  }

  .button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;

    .submit-button {
      width: 200px;
      margin-top: 100px;
    }
  }
}
</style>
