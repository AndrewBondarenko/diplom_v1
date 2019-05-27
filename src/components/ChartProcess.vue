<template>
            <div class="main-content-result_graphic_process">
                <canvas id="myChart1" width="10" height="9"></canvas>
            </div>
</template>

<script>

    export default {
        name: 'ChartProcess',
        props: {
            labels: Array,
            arr1: Array,
            arr2: Array,
        },
        data(){
            return {
                labelsArray: '',
                dataArray1: '',
                dataArray2: '',
            }
        },
        mounted() {
            this.labelsArray = this.labels;

            this.dataArray1 = this.arr1;
            this.dataArray2 = this.arr2;

            var ctx = document.getElementById('myChart1').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                animationEnabled: true,
                data: {
                    labels: this.labelsArray,
                    datasets: [
                        {
                            label: 'З попередньою обробкою',
                            borderColor: '#FC2525',
                            pointBackgroundColor: 'white',
                            borderWidth: 4,
                            pointBorderColor: '#FC2525',
                            backgroundColor: ['rgba(255, 255, 204, 0.5)'],
                            data: this.dataArray1
                        },{
                            label: 'Без попередньої обробки',
                            borderColor: '#05CBE1',
                            pointBackgroundColor: 'white',
                            pointBorderColor: '#05CBE1',
                            borderWidth: 4,
                            backgroundColor:['rgba(71, 183,132,.3)'],
                            data: this.dataArray2
                        }
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Об`єм (V)"
                            },
                            ticks: {
                                beginAtZero: false,
                                callback: function(value) {
                                    return value + " дм3";
                                }
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Час (t)"
                            },
                            ticks: {
                                callback: function(value) {
                                    return "доба " + value;
                                }
                            }
                        }]
                    }
                }
            });
        }
    }
</script>

<style>

    .main-content-result_graphic_process{
        width: 600px;
        height: 570px;
        margin: 0 75px 0 0;
    }

    #myChart1 {
        width: auto;
        height: auto;
    }


</style>