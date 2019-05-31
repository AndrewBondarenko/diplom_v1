<template>
            <div class="main-content-result_graphic_profit">
                <canvas id="myChart2" width="10" height="4"></canvas>
            </div>
</template>

<script>

    export default {
        name: 'ChartProfit',
        props: {
            labels: Array,
            arrEc1 : Array,
            arrEc2 : Array,
        },

        data(){
            return {
                labelsArray:'',
                dataEc1: '',
                dataEc2: ''
            }
        },
        mounted() {
            this.labelsArray = this.labels;

            this.dataEc1 = this.arrEc1;
            this.dataEc2 = this.arrEc2;


            var ctx2 = document.getElementById('myChart2').getContext('2d');
            var myChart = new Chart(ctx2, {
                type: 'bar',
                animationEnabled: true,
                data: {
                    labels:this.labelsArray,
                    datasets: [
                        {
                            label: 'З попередньою обробкою',
                            borderColor: '#FC2525',
                            pointBackgroundColor: 'white',
                            borderWidth: 4,
                            backgroundColor: 'white',
                            pointBorderColor: '#FC2525',
                            data: this.dataEc1
                        },{
                            label: 'Без попередньої обробки',
                            borderColor: '#05CBE1',
                            pointBackgroundColor: 'white',
                            pointBorderColor: '#05CBE1',
                            backgroundColor: 'white',
                            borderWidth: 4,
                            data: this.dataEc2
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Прибуток (грн)"
                            },
                            ticks: {
                                beginAtZero: false,
                                callback: function(value) {
                                    return value + " грн";
                                }
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Маса сировини (кг)"
                            },
                            ticks: {
                                callback: function(value) {
                                    return value + " кг";
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

    .main-content-result_graphic_profit{
        width: 100%;
        height: 440px;
        margin: 45px auto ;
    }

    #myChart2 {
        max-width: 1000px;
        max-height: 600px;
    }


</style>