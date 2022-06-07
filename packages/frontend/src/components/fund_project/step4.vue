<template>
    <div class="step4Page">
        <h1 class="title has-text-centered">Project Detail</h1>
        <b-field label="Project Name">
            {{step1Info.projectName}}
        </b-field>
        <b-field label="About">
           {{step1Info.about}}
        </b-field>
        <b-field label="Roadmap">
            {{ step1Info.file ? step1Info.file.name : '' }}
        </b-field>

        <b-field label="Links">
            <section>
                <div class="link-item">
                    Websites: {{ step1Info.linkUrl ? step1Info.linkUrl.website : '' }}
                </div>
                <div class="link-item">
                    Twitter: {{ step1Info.linkUrl ? step1Info.linkUrl.twitter : '' }}
                </div>
                <div class="link-item">
                    Discord: {{ step1Info.linkUrl ? step1Info.linkUrl.discord : ''}}
                </div>
                <div class="link-item">
                    Midium: {{ step1Info.linkUrl ? step1Info.linkUrl.medium : '' }}
                </div>
            </section>
        </b-field>

        <b-field label="Tokenomics">
            {{ step1Info.TokenomicsInfo ? "already set" : "click to set" }}
        </b-field>
        <b-field label="Team">
            <b-tag v-for="(item, index) in step1Info.teamList" :key="index" attached>
                {{ item.name }}
            </b-tag>
        </b-field>
        <b-field label="Trusted by">
            <b-tag v-for="(item, index) in step1Info.TrustedList" :key="index" attached>
                {{ item.name }}
            </b-tag>
        </b-field>


        <h1 class="title has-text-centered">Capital Detail</h1>
        <h1 class="lable-text">Raise Rule</h1>
        <b-field custom-class="custormField" label="Raise:" horizontal>
            {{ step2Info.raiseNumber }}{{ step2Info.tokenName }}
        </b-field>
        <b-field class="split" label="Price:" horizontal>
            {{ step2Info.tokenPrice }}{{ step2Info.token1Name }}/{{ step2Info.token2Name }}
        </b-field>

        <b-field label="Price/USDT:" horizontal>
            {{ step2Info.Price_U }}
        </b-field>

        <b-field label="The token amount I will release:" horizontal>
            {{ step2Info.tokenAmount }}
        </b-field>

        <h1 class="lable-text">Release Rule</h1>
        <b-field label="Release Method:" horizontal>
            {{ step2Info.releaseMethod }}
        </b-field>
        <b-field class="split" label="Release amount per ** days:" horizontal>
            {{ step2Info.releasePercent }} %/ {{ step2Info.days }} day
        </b-field>
        <b-field label="Start Date:" horizontal>
            {{ step2Info.startDate }}
        </b-field>

        <h1 class="title has-text-centered">Dao Detail</h1>
        <b-field v-for="(item, index) in step3Info.DaoMembers" :key="index" :label="'Dao Member' + (index + 1)"
            horizontal>
            {{ item.value }}
        </b-field>


    </div>
</template>

<script>

export default {
    name: "step4",
    props: {
        checkInfo: Object,
    },
    data() {
        return {
            step1Info: {},
            step2Info: {},
            step3Info: {}
        }
    },
    watch:{
        checkInfo(info){
            this.step1Info = info.step1Info;
            this.step2Info = info.step2Info;
            this.step3Info = info.step3Info;
        }
    },
    mounted: function () {

    },
    methods: {

    },
};
</script>

<style>
</style>
