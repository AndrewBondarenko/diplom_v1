<template>
    <div class="main-content-result_graphic_res">
        <div class="main-content-result_graphic_container">
            <div class="main-content-result_graphic">
                <canvas id="myChart2" width="10" height="7"></canvas>

                <!--<div class="container">-->
                <!--<div class="Chart__list">-->
                <!--<div class="Chart">-->
                <!--<line-example labels="time"></line-example>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
            </div>

            <!--<div class="main-content-result_graphic_text">-->
                <!--<div class="result_graphic_text_title">-->
                <!--</div>-->
                <!--<div class="result_graphic_text_description">-->
                    <!--<h4>На графiку наведено можливий вихід водню з 1 кг сировини в залежності від попередньої обробки сировини </h4>-->
                    <!--<p>Попередня обробка дозволяє збільшити розміри пор і зменшити-->
                        <!--ступінь кристалічності целюлози для доступності ферментів. Одночасно-->
                        <!--відбувається знешкодження метаногенних бактерій, які слугують споживачами водню і суттєво зменшують його вихід.</p>-->
                <!--</div>-->
            <!--</div>-->
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
                return ((a * w) / 1000 ).toFixed(1)
            },

            getEconomicVal_2: function(w){
                let a = 0;
                for (var i = 0; i < this.labels / 24; i++){
                    a = a + this.dataArray2[i];
                }
                return ((a * w) / 1000 ).toFixed(1)
            },

            getRandom: function (min, max) {
                return Math.random() * (max - min) + min;
            },

            getEconomicArray1: function (val){
                var resultArr = [];
                var cof = 0;
                for (var i = 0; i < (15); i++){
                    resultArr.push((((this.getEconomicVal_1(cof) * 202.38).toFixed(0)) - (((cof) * 0.096) + ((cof) * 0.32)) - ((this.labels / 24) * 240)));
                    cof = cof + 10
                }

                return resultArr
            },
            getEconomicArray2: function (val){
                var resultArr = [];
                var cof = 0;
                for (var i = 0; i < (15); i++){
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
            for (var i = 0; i <= 15; i++ ){
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
                            pointBorderColor: '#FC2525',
                            backgroundColor: ['rgba(255, 255, 204, 0.5)'],
                            data: this.dataEc1
                        },{
                            label: 'Без попередньої обробки',
                            borderColor: '#05CBE1',
                            pointBackgroundColor: 'white',
                            pointBorderColor: '#05CBE1',
                            borderWidth: 4,
                            backgroundColor:['rgba(71, 183,132,.3)'],
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

    .main-content-result_graphic_res{
        display: flex;
        flex-direction: column;
        margin: 50px 0 50px 0;
    }

    .main-content-result_graphic_container{
        display: flex;
        flex-direction: column;

    }
    .main-content-result_graphic{
        width: auto;
        height: 500px;
        margin: 0 75px 0 0;
    }
    .main-content-result_graphic_text{
        width: 650px;
    }
    .main-content-result_graphic_text p, h4{
        text-align: left;
    }

    .main-content-result_economic_container{
        text-align: left;
        margin-top: 55px;
    }
    .economic_description{
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
    }
    .economic_description_block{
        width: 49%;
    }
    .economic_description_item_title{
        text-align: left;
    }
    .economic_description_item{
        padding: 0 10px 0 10px;
        border: 1px solid #bbb;
        text-align: left;
    }
    .economic_description_item hr{
        border: none;
        background-color: #bbb;
        color: #bbb;
        height: 1px;
    }
    #myChart2 {
        width: auto;
        height: 500px;
    }


</style>