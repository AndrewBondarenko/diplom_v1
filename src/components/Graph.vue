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
            labels: Number,
            raw: String
        },

        data(){
            return {
                dataArray1: '',
                dataArray2: '',
            }
        },

        methods: {

            getRandom: function (min, max) {
                return Math.random() * (max - min) + min;
            },

            getRandomArray: function (value){
                var resultArr = [];

                resultArr.push(this.getRandom(value - 0.5, value));

                for (var i = 0; i < (this.labels / 24) - 4 ; i++){
                    resultArr.push(this.getRandom(value, value + 1));
                }
                resultArr.push(this.getRandom(value/1.1, value/1.1 + 0.5));
                resultArr.push(this.getRandom(value/1.2, value/1.2 + 0.5));
                resultArr.push(this.getRandom(value/1.6, value/1.6 + 0.5));

                return resultArr
            },

            generate(val){
                this.dataArray1 = this.getRandomArray(val);
                this.dataArray2 = this.getRandomArray(val - (val * 0.2));
            }
        },
        mounted() {

            let array = [];
            for (var i = 1; i <= this.labels / 24; i++ ){
                array.push(i)
            };

            console.log(array);

            if (this.raw === 'солома пшеницi'){
                this.generate(39);
            }
            else if (this.raw === 'солома ячменю'){
                this.generate(54);
            }
            else if (this.raw === 'вiдходи кукурудзи'){
                this.generate(52);
            }
            else if (this.raw === 'вiдходи рiпаку'){
                this.generate(21);
            }
            else if (this.raw === 'вiдходи соняшника'){
                this.generate(30);
            }
            else if (this.raw === 'деревина берези'){
                this.generate(12);
            }
            else if (this.raw === 'деревина сосни'){
                this.generate(14);
            }

            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                animationEnabled: true,
                data: {
                    labels: array,
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
                            label: 'Без попередньоi обробки',
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
                                display: false,
                                labelString: ""
                            },
                            ticks: {
                                beginAtZero: true,
                                callback: function(value) {
                                    return value + " V дм3";
                                }
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: false,
                                labelString: ""
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
    .main-content-result_graphic{
        max-width: 500px;
    }

    #myChart {
        width: auto;
        height: auto;
    }


</style>