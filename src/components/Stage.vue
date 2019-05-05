<template>
    <div class="result-description-stage">
        <div class="result-description-stage_title">
            <h3>Етап {{ stageNumber }}</h3>
            <h4>{{ stageName }}</h4>
        </div>
        <div class="result-description-stage_content">

            <Steps
                    v-for="step in allStages[stageSet]"
                    v-bind:stepNum="step.stepID"
                    v-bind:stepDesc="step.stepDesc"
                    v-bind:stepParam="step.stepParam"
            ></Steps>

        </div>
    </div>
</template>

<script>
    import Steps from '../components/Step';

    export default {
        name: "Stage",
        components: {
            Steps
        },
        props: {
            stageNumber: Number,
            stageName: String,
            stageSet: String,
            allStages: Object
        },
        data() {
            return {

            }
        }
    }
</script>

<style scoped lang="sass">

    .result-description-stage
        margin-top: 0
        .result-description-stage_title
            display: flex
            margin-right: auto
            flex-direction: column
            background-color: #42b983
            background-size: 100%
            /*border-left: 5px solid white*/
            h3
                width: max-content
                margin: 10px auto 5px 0
                padding-left: 10px
                color: #fff
            h4
                width: max-content
                margin: 0 auto 10px 0
                padding-left: 10px
                color: #fff

        .result-description-stage_content
            margin: 5px auto 15px auto
            .result-description-step
                display: flex
                flex-direction: column
                width: 95%
                margin: 10px auto
                .result-description-step_title
                    display: flex
                    margin-right: auto
                    h4
                        margin: 7px auto 7px 0
                .result-description-step_content
                    display: flex
                    flex-direction: row
                    border: 1px solid #bbb
                    .result-description-step_content_description
                        width: 60%
                        height: 100%
                        border-right: 1px dashed #bbb
                        padding: 5px
                        p
                            width: max-content
                            margin: 5px auto 5px 10px
                    .result-description-step_content_param
                        width: 40%
                        height: 100%
                        padding: 5px
                        p
                            width: max-content
                            margin: 5px auto 5px 15px


</style>