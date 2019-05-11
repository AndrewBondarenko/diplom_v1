<template>
    <div class="result-item">
        <div class="result-item_param">
            {{ param }}
        </div>
        <div class="result-item_value">
            {{ value }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "ResultItem",
        props: {
            param: String,
            value: String
        }
    }
</script>

<style scoped lang="sass">

    .result-item
        display: flex
        margin-left: auto
        margin-right: auto
        width: 100%
        border-bottom: 1px solid #b7c2ce
        padding: 12px 2px
        &:hover
            background-color: #f3f4f6

    .result-item_param
        width: max-content
        margin-right: auto

    .result-item-value
        margin-left: auto
        margin-right: 0

</style>