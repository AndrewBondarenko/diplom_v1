<template>
    <div class="main-content-result_graphic">
        <VChartist
                ratio=".ct-chart"
                type="Line"
                :data="chartData"
                :options="chartOptions"
        ></VChartist>
    </div>
</template>

<script>
    import VChartist from 'v-chartist';

    export default {
        name: "Graph",
        components:{
            VChartist,

        },
        data(){
            return{
                chartData: {
                    labels: ["A", "B", "C", "D"],
                    series:[[5, 4, 3, 7, 5, 10]]
                },
                chartOptions: {
                    fullWidth: true,
                    chartPadding: {
                        right: 10
                    }
                }
            }
        }
    }
</script>

<style scoped lang="sass">

    .main-content-result_graphic
        display: flex
        padding: 15px
        margin-left: auto
        margin-right: auto
        height: 350px
        width: 90%

</style>