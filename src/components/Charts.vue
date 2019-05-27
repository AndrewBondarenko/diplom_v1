<template>
    <div class="main-content-result_graphic_res">
        <div class="main-content-result_process_container">

            <div v-if="calculated">
                <ChartProcess
                        :labels = labelsArrayProcess
                        :arr1 = dataArray1
                        :arr2 = dataArray2>
                </ChartProcess>
            </div>

            <div class="main-content-result_process_text">
                <div class="result_process_text_title">
                </div>
                <div class="result_process_text_description">
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
                        <p>Вартiсть отриманого водню: <b> {{ Math.round(getV1 * 202.38) }} грн. </b></p>
                        <p>Витрати на попередню обробку: <b>{{ Math.round(((weightRaw * 0.096) + (weightRaw * 0.32) + 120)) }} грн. </b></p>
                        <p>Витрати на основний процес: <b> {{ (labels / 24) * 240 }} грн. </b> </p>
                        <hr>
                        <p>Прибуток: <b> {{ Math.round(((getV1 * 202.38)) - ((weightRaw * 0.096) + (weightRaw * 0.32) + 120) - ((labels / 24) * 240)) }} грн.</b></p>
                    </div>
                </div>


                <div class="economic_description_block">
                    <div class="economic_description_item_title">
                        <h3>Процес без попередньою обробкою</h3>
                    </div>
                    <div class="economic_description_item">
                        <p>Вартiсть отриманого водню: <b> {{ Math.round(getV2 * 202.38) }} грн. </b></p>
                        <p>Витрати на попередню обробку: <b> 0 грн. </b></p>
                        <p>Витрати на основний процес: <b> {{ (labels / 24) * 240 }} грн. </b> </p>
                        <hr>
                        <p>Прибуток: <b> {{ Math.round(((getV2 * 202.38)) - ((labels / 24) * 240))}} грн.</b></p>
                    </div>
                </div>
            </div>

        </div>

        <div v-if="calculated">
            <ChartProfit
                    :labels = labelsArrayProfit
                    :arrEc1 = dataEc1
                    :arrEc2 = dataEc2>
            </ChartProfit>
        </div>

    </div>
</template>

<script>
    import ChartProfit from '../components/ChartProfit'
    import ChartProcess from '../components/ChartProcess'

    export default {
        name: 'Charts',
        components: {
            ChartProfit,
            ChartProcess

        },
        props: {
            labels: Number,
            raw: String,
            weightRaw: Number
        },

        data(){
            return {
                labelsArrayProcess: '',
                labelsArrayProfit: '',
                dataArray1: '',
                dataArray2: '',
                dataEc1: '',
                dataEc2: '',
                calculated: false
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

            getLabelsArrayProcess: function () {
                let array = [];
                for (var i = 1; i <= this.labels / 24; i++ ){
                    array.push(i)
                }
                return array
            },

            getLabelsArrayProfit: function() {
                let array = [];
                for (var i = 0; i < 17; i++ ){
                    array.push(i*10)
                }
                return array
            },

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

            getEconomicArray1: function (val){
                var resultArr = [];
                var cof = 0;
                for (var i = 0; i < (17); i++){
                    resultArr.push(Math.round(((this.getEconomicVal_1(cof) * 202.38)) - (((cof) * 0.096) + ((cof) * 0.32) + 120) - ((this.labels / 24) * 240)));
                    cof = cof + 10
                }

                return resultArr
            },
            getEconomicArray2: function (val){
                var resultArr = [];
                var cof = 0;
                for (var i = 0; i < (17); i++){
                    resultArr.push(Math.round(((this.getEconomicVal_2(cof) * 202.38))  - ((this.labels / 24) * 240)));
                    cof = cof + 10
                }

                return resultArr
            },

            generate(val){
                this.labelsArrayProcess = this.getLabelsArrayProcess();
                this.labelsArrayProfit = this.getLabelsArrayProfit();

                this.dataArray1 = this.getRandomArray(val);
                this.dataArray2 = this.getRandomArray(val - (val * 0.2));

                this.dataEc1 = this.getEconomicArray1();
                this.dataEc2 = this.getEconomicArray2();

                console.log('labels ' + this.labelsArray);

                console.log('dataArr1 ' + this.dataArray1);
                console.log('dataArr2 ' + this.dataArray2);

                console.log('dataEc1 ' + this.dataEc1);
                console.log('dataEc2 ' + this.dataEc2);
            }
        },
        mounted() {

            if (this.raw === 'солома пшеницi'){
                this.generate(39);
                this.calculated = true;
            }
            else if (this.raw === 'солома ячменю'){
                this.generate(54);
                this.calculated = true;
            }
            else if (this.raw === 'вiдходи кукурудзи'){
                this.generate(52);
                this.calculated = true;
            }
            else if (this.raw === 'вiдходи рiпаку'){
                this.generate(21);
                this.calculated = true;
            }
            else if (this.raw === 'вiдходи соняшника'){
                this.generate(30);
                this.calculated = true;
            }
            else if (this.raw === 'деревина берези'){
                this.generate(12);
                this.calculated = true;
            }
            else if (this.raw === 'деревина сосни'){
                this.generate(14);
                this.calculated = true;
            }

        }
    }
</script>

<style>

    .main-content-result_graphic_res{
        display: flex;
        flex-direction: column;
    }

    .main-content-result_process_container{
        display: flex;
        flex-direction: row;

    }
    .main-content-result_process_text{
        width: 550px;
    }
    .main-content-result_process_text p, h4{
        text-align: left;
    }

    .main-content-result_economic_container{
        text-align: left;
        margin-top: 75px;
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



</style>