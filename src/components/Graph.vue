<template>
    <div class="main-content-result_graphic_res">
        <div class="main-content-result_graphic_container">
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

            <div class="main-content-result_graphic_text">
                <div class="result_graphic_text_title">
                </div>
                <div class="result_graphic_text_description">
                    <h4>На графiку наведено можливий вихід водню з 1 кг сировини в залежності від попередньої обробки сировини </h4>
                    <p>Попередня обробка дозволяє збільшити розміри пор і зменшити
                        ступінь кристалічності целюлози для доступності ферментів. Одночасно
                        відбувається знешкодження метаногенних бактерій, які слугують споживачами водню і суттєво зменшують його вихід.</p>

                    <h4>Вхiднi данi</h4>
                     <p>Сировина: <b> {{ raw }} </b> </p>
                     <p>Маса: <b> {{ weightRaw }} кг </b></p>
                    <h4>Можливий результат</h4>
                     <p>Об`єм водню з попередньою обробкою: <b> {{ getV1 }} м3 </b></p>
                     <p>Об`єм водню без попередньої обробки: <b> {{ getV2 }} м3 </b></p><br>

                </div>
            </div>
        </div>

        <div class="main-content-result_economic_container">
            <h3>Економiчне порiвняння процесiв видобутку водню</h3>
            <div class="economic_description">
                <div class="economic_description_block">
                    <div class="economic_description_item_title">
                        <h3>Процес з попередньою обробкою</h3>
                    </div>
                    <div class="economic_description_item">
                        <p>Вартiсть водню: <b> {{ (getV1 * 202.38).toFixed(0) }} грн. </b></p>
                        <p>Витрати на попередню обробку: <b>{{ (weightRaw * 0.096) + (weightRaw * 0.32) }} грн. </b></p>
                        <p>Витрати на основний процес: <b> {{ (labels / 24) * 240 }} грн. </b> </p>
                        <hr>
                        <p>Прибуток: <b> {{ (((getV1 * 202.38).toFixed(0)) - ((weightRaw * 0.096) + (weightRaw * 0.32)) - ((labels / 24) * 240)).toFixed(1)}} грн.</b></p>
                    </div>
                </div>


                <div class="economic_description_block">
                    <div class="economic_description_item_title">
                        <h3>Процес без попередньою обробкою</h3>
                    </div>
                    <div class="economic_description_item">
                        <p>Вартiсть водню: <b> {{ (getV2 * 202.38).toFixed(0) }} грн. </b></p>
                        <p>Витрати на попередню обробку: <b> 0 грн. </b></p>
                        <p>Витрати на основний процес: <b> {{ (labels / 24) * 240 }} грн. </b> </p>
                        <hr>
                        <p>Прибуток: <b> {{ (((getV2 * 202.38).toFixed(0)) - ((labels / 24) * 240)).toFixed(1)}} грн.</b></p>
                    </div>
                </div>
            </div>

        </div>

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
            raw: String,
            weightRaw: Number
        },

        data(){
            return {
                dataArray1: '',
                dataArray2: '',
            }
        },
        computed: {
            getV1: function(){
                let a = 0;
                for (var i = 0; i < this.dataArray1.length; i++){
                    a = a + this.dataArray1[i];
                }
                return ((a * this.weightRaw) / 1000 ).toFixed(1)
            },
            getV2: function(){
                let a = 0;
                for (var i = 0; i < this.dataArray2.length; i++){
                    a = a + this.dataArray2[i];
                }
                return ((a * this.weightRaw) / 1000 ).toFixed(1)
            },

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
                resultArr.push(this.getRandom(value/1.4, value/1.4 + 0.5));

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

    .main-content-result_graphic_res{
        display: flex;
        flex-direction: column;
    }

    .main-content-result_graphic_container{
        display: flex;
        flex-direction: row;

    }
    .main-content-result_graphic{
        width: 500px;
        height: 450px;
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
    #myChart {
        width: auto;
        height: auto;
    }


</style>