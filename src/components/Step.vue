<template>
    <div class="result-description-step">
        <div class="result-description-step_title">
            <h4>Крок {{ stepNum }}</h4>
        </div>
        <div class="result-description-step_content">
            <div class="result-description-step_content_description">
                <p>{{ stepDesc }}</p>
            </div>
            <div class="result-description-step_content_param">
                <p>{{ stepParam }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Step",
        props: {
            stepNum: Number,
            stepDesc: String,
            stepParam: String
        }
    }
</script>

<style scoped lang="sass">
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