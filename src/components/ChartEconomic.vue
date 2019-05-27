<template>
    <div class="main-content-result_graphic_res_economic">
        <div class="main-content-result_graphic_container_economic">

            <div class="main-content-result_graphic_text_economic">
                <div class="result_graphic_text_title_economic">
                </div>
                <div class="result_graphic_text_description_economic">
                    <h4>На графiку наведено можливий прибуток в залежності від ваги сировини. </h4>
                </div>
            </div>

            <div class="main-content-result_graphic_economic">
                <canvas id="myChart2" width="10" height="4"></canvas>
            </div>

        </div>

    </div>
</template>

<script>
    import LineExample from './LineChart.js'
    export default {
        name: 'ChartEconomic',
        components: {
            LineExample
        },
        props: {
            labels: Number,
            raw: String,
            weightRaw: Number,
        },

        data(){
            return {
                dataArray1: '',
                dataArray2: '',
                dataEc1: '',
                dataEc2: ''
            }
        },
        computed: {


        },
        methods: {

            getEconomicVal_1: function(w){
                let a = 0;
                for (var i = 0; i < this.labels / 24; i++){
                    a = a + this.dataArray1[i];
                }
                return ((a * w) / 1000 ).toFixed(0)
            },

            getEconomicVal_2: function(w){
                let a = 0;
                for (var i = 0; i < this.labels / 24; i++){
                    a = a + this.dataArray2[i];
                }
                return ((a * w) / 1000 ).toFixed(0)
            },

            getRandom: function (min, max) {
                return Math.random() * (max - min) + min;
            },

            getEconomicArray1: function (val){
                var resultArr = [];
                var cof = 0;
                for (var i = 0; i < (17); i++){
                    resultArr.push((((this.getEconomicVal_1(cof) * 202.38).toFixed(0)) - (((cof) * 0.096) + ((cof) * 0.32) + 120) - ((this.labels / 24) * 240)).toFixed(0));
                    cof = cof + 10
                }

                return resultArr
            },
            getEconomicArray2: function (val){
                var resultArr = [];
                var cof = 0;
                for (var i = 0; i < (17); i++){
                    resultArr.push((((this.getEconomicVal_2(cof) * 202.38).toFixed(0))  - ((this.labels / 24) * 240)));
                    cof = cof + 10
                }

                return resultArr
            },

            getRandomArray: function (value){
                var resultArr = [];

                resultArr.push(this.getRandom(value - 0.5, value));

                for (var i = 0; i < (this.labels / 24) - 4 ; i++){
                    resultArr.push(this.getRandom(value, value + 1));
                }
                resultArr.push(this.getRandom(value/1.1, value/1.1 + 0.5));
                resultArr.push(this.getRandom(value/1.2, value/1.2 + 0.5));
                resultArr.push(this.getRandom(value/1.4, value/1.4 + 0.5));

                return resultArr
            },

            generate(val){
                this.dataArray1 = this.getRandomArray(val);
                this.dataArray2 = this.getRandomArray(val - (val * 0.2));
                this.dataEc1 = this.getEconomicArray1();
                this.dataEc2 = this.getEconomicArray2();
            }
        },
        mounted() {
            let array = [];
            for (var i = 0; i < 17; i++ ){
                array.push(i*10)
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


            var ctx2 = document.getElementById('myChart2').getContext('2d');
            var myChart = new Chart(ctx2, {
                type: 'bar',
                animationEnabled: true,
                data: {
                    labels: array,
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
                                labelString: "Вага сировини (кг)"
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

    .main-content-result_graphic_res_economic{
        display: flex;
        flex-direction: column;
        margin: 50px 0 50px 0;
    }

    .main-content-result_graphic_container_economic{
        display: flex;
        flex-direction: column;
    }

    .main-content-result_graphic_economic{
        width: 100%;
        height: 440px;
        margin: 20px auto ;
    }

    .main-content-result_graphic_text_economic{
        width: 100%;
    }

    .main-content-result_graphic_text_economic p, h4{
        text-align: left;

    }

    .economic_description_item_economic hr{
        border: none;
        background-color: #bbb;
        color: #bbb;
        height: 1px;
    }
    #myChart2 {
        max-width: 1000px;
        max-height: 600px;
    }


</style>