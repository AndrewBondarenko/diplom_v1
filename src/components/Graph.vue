<template>
    <div class="main-content-result_graphic">

        <canvas id="myChart" width="200" height="200"></canvas>

        <!--<div class="container">-->
            <!--<div class="Chart__list">-->
                <!--<div class="Chart">-->
                    <!--<line-example labels="time"></line-example>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    import LineExample from './LineChart.js'
    export default {
        name: 'graph',
        components: {
            LineExample
        },
        props: {
            labels: Number
        },

        data(){
            return {

            }
        },

        mounted() {

            console.log(this.labels);
            let array = [];
            for (var i = 1; i <= this.labels / 24; i++ ){
                array.push("доба " + i)
            };
            console.log(array);
            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels:array,

                    datasets: [
                        {
                            label: 'З попередньою обробкою',
                            borderColor: '#FC2525',
                            pointBackgroundColor: 'white',
                            borderWidth: 4,
                            pointBorderColor: '#FC2525',
                            backgroundColor: ['rgba(255, 255, 204, 0.5)'],
                            data: [39, 39.58, 39.2, 39.3, 38.3, 33.8, 23.2]
                        },{
                            label: 'Без попередньоi обробки',
                            borderColor: '#05CBE1',
                            pointBackgroundColor: 'white',
                            pointBorderColor: '#05CBE1',
                            borderWidth: 4,
                            backgroundColor:['rgba(71, 183,132,.3)'],
                            data: [27.3, 27.2, 27.4, 27.0, 26.0, 22.6, 14.2]
                        }
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    }
</script>

<style>
    .main-content-result_graphic{
        max-width: 500px;
    }

    #myChart {
        width: auto;
        height: auto;
    }


</style>