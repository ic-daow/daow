<template>
    <div class="step2Page">
        <h1 class="title has-text-centered">Capital Detail</h1>
        <section>
            <h1 class="lable-text">Raise Rule</h1>
            <b-field custom-class="custormField" label="Raise:" horizontal>
                <b-input type="number" v-model="raiseNumber" placeholder="write here" required></b-input>
                <b-select v-model="tokenName">
                    <option value="DIP">DIP</option>
                </b-select>
            </b-field>
            <b-field class="split" label="Price:" horizontal>
                <b-input type="number" v-model="tokenPrice" placeholder="write here" required></b-input>
                <b-input type="text" v-model="token1Name" placeholder="write here" required></b-input>
                <text>/</text>
                <b-input type="text" v-model="token2Name" placeholder="write here" required></b-input>
            </b-field>

            <b-field label="Price/USDT:" horizontal>
                <b-input type="number" v-model="Price_U" placeholder="write here" required></b-input>
            </b-field>

            <b-field label="The token amount I will release:" horizontal>
                <b-input type="number" v-model="tokenAmount" placeholder="auto complete" required disabled></b-input>
            </b-field>

            <h1 class="lable-text">Release Rule</h1>
            <b-field label="Release Method:" horizontal>
                <b-select v-model="releaseMethod">
                    <option value="DIP">Liner method</option>
                </b-select>
            </b-field>
            <b-field class="split" label="Release amount per ** days:" horizontal>
                <b-input type="number" v-model="releasePercent" placeholder="write here" required></b-input>
                <text>%/</text>
                <b-input type="number" v-model="days" placeholder="write here" required></b-input>
                day
            </b-field>
            <b-field label="Start Date:" horizontal>
                <b-datepicker v-model="startDate" inline :unselectable-days-of-week="[0, 6]">
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
            file: {},
            startDate: new Date(),
            raiseNumber: '',
            tokenName: '',
            tokenPrice: '',
            token1Name: '',
            token2Name: '',
            Price_U: '',
            tokenAmount: '',
            releaseMethod: '',
            releasePercent: '',
            days: '',
        }
    },
    mounted: function () {

    },
    methods: {
        checkInfo() {
            let info = {
                file: this.file,
                startDate: this.startDate,
                raiseNumber: this.raiseNumber,
                tokenName: this.tokenName,
                tokenPrice: this.tokenPrice,
                token1Name: this.token1Name,
                token2Name: this.token2Name,
                Price_U: this.Price_U,
                tokenAmount: this.tokenAmount,
                releaseMethod: this.releaseMethod,
                releasePercent: this.releasePercent,
                days: this.days,
            }
            return info;
        }
    },
};
</script>


<style lang="scss" scoped>
.step2Page {
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
    }
}
</style>

