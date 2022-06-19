<template>
  <div class="step2Page">
    <h1 class="title has-text-centered">Capital Detail</h1>
    <section>
      <h1 class="lable-text">Raise Rule</h1>
      <b-field custom-class="custormField" label="Raise:" horizontal>
        <b-input
          type="number"
          v-model="raise.amount"
          placeholder="write amount here"
          required
        ></b-input>
        <b-input
          type="text"
          v-model="raise.currency"
          placeholder="write currency here"
          required
        ></b-input>
        <!-- <b-select v-model="tokenName">
                    <option value="DIP">DIP</option>
                </b-select> -->
      </b-field>
      <!-- <b-field class="split" label="Price:" horizontal>
                <b-input type="number" v-model="tokenPrice" placeholder="write here" required></b-input>
                <b-input type="text" v-model="token1Name" placeholder="write here" required></b-input>
                <span>/</span>
                <b-input type="text" v-model="token2Name" placeholder="write here" required></b-input>
            </b-field> -->

      <b-field label="Price($):" horizontal>
        <b-input
          type="number"
          v-model="price_per_icp"
          placeholder="write price here"
          required
        ></b-input>
      </b-field>

      <!-- <b-field label="The token amount I will release:" horizontal>
        <b-input
          type="number"
          v-model="release.amount"
          placeholder="write here"
          required
        ></b-input>
      </b-field> -->

      <h1 class="lable-text">Release Rule</h1>
      <b-field label="Release Method:" horizontal>
        <b-select v-model="release.method">
          <option value="Linear">Linear</option>
        </b-select>
      </b-field>
      <b-field class="split" label="Release amount per day:" horizontal>
        <b-input
          type="number"
          v-model="release.amount_per_day"
          placeholder="write here"
          required
        ></b-input>
        <span> /</span>
        <!-- <b-input type="number" v-model="days" placeholder="write here" required></b-input> -->
        <span>day</span>
      </b-field>
      <b-field label="Start Date:" horizontal>
        <b-datepicker
          v-model="startDate"
          inline
          :unselectable-days-of-week="[0, 6]"
        >
        </b-datepicker>
      </b-field>
    </section>
  </div>
</template>

<script>
export default {
  name: "step2",
  props: {
    msg: String,
  },
  data() {
    return {
      price_per_icp: "", //
      release: {
        method: "",
        start_date: BigInt(new Date().getTime()) * 1000000n,
        amount_per_day: "",
      },
      raise: {
        currency: "",
        amount: "",
      },
      startDate: new Date(),
      // raiseNumber: '',
      // tokenName: '',
      // tokenPrice: '',
      // token1Name: '',
      // token2Name: '',
      // Price_U: '',
      // tokenAmount: '',
      // releaseMethod: '',
      // releasePercent: '',
      // days: '30',
    };
  },
  mounted: function () {},
  watch: {
    startDate() {
      this.release.start_date = BigInt(new Date().getTime()) * 1000000n
    },
  },
  methods: {
    checkInfo() {
      if (
        !this.price_per_icp ||
        !this.release.method ||
        !this.release.amount_per_day ||
        !this.raise.currency ||
        !this.raise.amount
      ) {
        this.$buefy.dialog.alert("Please fill the field");
        return;
      }
      let info = {
        price_per_icp: this.price_per_icp, //
        release: this.release,
        raise: this.raise,
      };
      return info;
    },
  },
};
</script>


<style lang="scss" scoped>
.step2Page {
  margin: 40px 40px 30px 40px;
  border: 2px solid #eee;
  background-color: #f7f7f7;
  padding: 30px;
  border-radius: 8px;
  .title {
    margin-top: 40px;
  }

  .lable-text {
    font-weight: 600;
    font-size: 20px;
    margin-top: 20px;
  }

  .custormField {
    color: #666 !important;
  }

  .link-item {
    display: flex;
    justify-content: start;
    margin-bottom: 15px;

    .checkbox {
      flex: 100px 0 0;
    }
  }

  .split {
    line-height: 40px;
    text-align: center;
    flex-grow: 0;
    justify-content: start;

    span {
      display: inline-block;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>

