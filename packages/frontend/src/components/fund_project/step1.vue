<template>
    <div class="step1Page">
        <h1 class="title has-text-centered">Project Detail</h1>
        <section>
            <b-field label="Project Name">
                <b-input v-model="projectName"></b-input>
            </b-field>

            <b-field label="About">
                <b-input maxlength="200" v-model="about" type="textarea"> </b-input>
            </b-field>

            <b-field label="Roadmap">
                <b-field class="file is-primary" :class="{ 'has-name': !!file }">
                    <b-upload v-model="file" class="file-label">
                        <span class="file-cta">
                            <b-icon class="file-icon" icon="upload"></b-icon>
                            <span class="file-label">Click to upload</span>
                        </span>
                        <span class="file-name" v-if="file">
                            {{ file.name }}
                        </span>
                    </b-upload>
                </b-field>
            </b-field>

            <b-field label="Links">
                <section>
                    <div class="link-item">
                        <b-checkbox class="checkbox" v-model="checkboxGroup" native-value="Websites"
                            style="line-height:40px; flex: 100px 0 0">
                            Websites
                        </b-checkbox>
                        <b-input type="text" v-model="linkUrl.website" placeholder="write here"
                            :disabled="checkboxGroup.indexOf('Websites') >= 0 ? false : true"></b-input>
                    </div>
                    <div class="link-item">
                        <b-checkbox class="checkbox" v-model="checkboxGroup" native-value="Twitter"
                            style="line-height:40px">
                            Twitter
                        </b-checkbox>
                        <b-input type="text" v-model="linkUrl.twitter" placeholder="write here"
                            :disabled="checkboxGroup.indexOf('Twitter') >= 0 ? false : true"></b-input>
                    </div>
                    <div class="link-item">
                        <b-checkbox class="checkbox" v-model="checkboxGroup" native-value="Discord"
                            style="line-height:40px">
                            Discord
                        </b-checkbox>
                        <b-input type="text" v-model="linkUrl.discord" placeholder="write here"
                            :disabled="checkboxGroup.indexOf('Discord') >= 0 ? false : true"></b-input>
                    </div>
                    <div class="link-item">
                        <b-checkbox class="checkbox" v-model="checkboxGroup" native-value="Midium"
                            style="line-height:40px">
                            Midium
                        </b-checkbox>
                        <b-input type="text" v-model="linkUrl.medium" placeholder="write here"
                            :disabled="checkboxGroup.indexOf('Midium') >= 0 ? false : true"></b-input>
                    </div>
                </section>
            </b-field>

            <b-field label="Tokenomics">
                <b-button @click="isTokenModalActive = true">{{ TokenomicsInfo ? "already set" : "click to set" }}
                </b-button>
            </b-field>
            <b-field label="Team">
                <b-tag v-for="(item, index) in teamList" :key="index" close-type='is-danger' attached closable
                    aria-close-label="Close team" @close="removeTeam(index)">
                    {{ item.name }}
                </b-tag>
                <b-button @click="isTeamModalActive = true">Add</b-button>
            </b-field>
            <b-field label="Trusted by">
                <b-tag v-for="(item, index) in TrustedList" :key="index" close-type='is-danger' attached closable
                    aria-close-label="Close team" @close="removeTrusted(index)">
                    {{ item.name }}
                </b-tag>
                <b-button @click="isTrustedModalActive = true">Add</b-button>
            </b-field>
        </section>

        <b-modal v-model="isTokenModalActive" has-modal-card trap-focus :destroy-on-hide="false" aria-role="dialog"
            aria-label="Token Modal" close-button-aria-label="Close" aria-modal>
            <template #default="props">
                <Tokenomics @close="props.close" @updateTokenomics="updateTokenomics"></Tokenomics>
            </template>
        </b-modal>

        <b-modal v-model="isTeamModalActive" has-modal-card trap-focus :destroy-on-hide="false" aria-role="dialog"
            aria-label="Team Modal" close-button-aria-label="Close" aria-modal>
            <template #default="props">
                <Team @close="props.close" :infoObject="teamObject" :index="teamIndex" @updateTeams="updateTeams">
                </Team>
            </template>
        </b-modal>

        <b-modal v-model="isTrustedModalActive" has-modal-card trap-focus :destroy-on-hide="false" aria-role="dialog"
            aria-label="Trusted Modal" close-button-aria-label="Close" aria-modal>
            <template #default="props">
                <Trusted @close="props.close" :infoObject="trustedObject" :index="trustedIndex"
                    @updateTrusted="updateTrusted"></Trusted>
            </template>
        </b-modal>
    </div>
</template>

<script>
import Tokenomics from "@/components/fund_project/Tokenomics.vue";
import Team from "@/components/fund_project/team.vue";
import Trusted from "@/components/fund_project/trusted.vue";
export default {
    name: "step1",
    props: {
        msg: String,
    },
    components: {
        Tokenomics, Team, Trusted
    },
    data() {
        return {
            projectName: "text",
            about:"",
            isTokenModalActive: false,
            isTeamModalActive: false,
            isTrustedModalActive: false,

            linkUrl: {
                website: "",
                twitter: "",
                discord: "",
                medium: ""
            },

            file: null,
            checkboxGroup: ["Websites"],
            TokenomicsInfo: null,
            teamList: [],
            teamObject: {},
            teamIndex: '',
            TrustedList: [],
            trustedObject: {},
            trustedIndex: ''
        }
    },
    mounted: function () {

    },
    methods: {
        updateTokenomics(info) {
            this.TokenomicsInfo = info;
        },
        updateTeams(info) {
            if (info.isEdit) {
                this.teamList[info.index] = info.data;
            } else {
                this.teamList.push(info.data);
            }
        },
        removeTeam(index) {
            this.teamList.splice(index, 1);
        },
        updateTrusted(info) {
            if (info.isEdit) {
                this.TrustedList[info.index] = info.data;
            } else {
                this.TrustedList.push(info.data);
            }
        },
        removeTrusted(index) {
            this.TrustedList.splice(index, 1);
        },
        checkInfo() {
            let info = {
                projectName: this.projectName,
                linkUrl: this.linkUrl,
                file: this.file,
                TokenomicsInfo: this.TokenomicsInfo,
                teamList: this.teamList,
                TrustedList: this.TrustedList
            };
            return info;
        }
    },
};
</script>

<style lang="scss" scoped>
.step1Page {
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
