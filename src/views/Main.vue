<template>
  <div ref="content" id="export-container">

  <div v-if="$root.currentUser!=''" class="main" >

    <!--<div v-if="$root.currentUser ==''" class="main">-->
    <div class="main-content" ref="pdf">
      <div class="main-content_title">
        <div class="main-content_title_text">
          <h2>Вхiднi данi</h2>
        </div>

        <div class="main-content_title_text" v-if="validationEmptyZero === false">
          <h3>Заповнiть всi поля. {{ validationFormMessage }} </h3>
        </div>

        <!--<div class="main-content_title_text" v-if="(validationEmptyZero == false) && (validationZero == false)">-->
          <!--<h3>Заповнiть всi поля. Значення поля <b>Маса сировини (кг)</b> має бути більше 0. Значення інших полів не може бути менші ніж 0. </h3>-->
        <!--</div>-->
        <!--<div class="main-content_title_text" v-if="validationEmptyZero === false && validationZero === true">-->
          <!--<h3>Заповнiть всi поля. Значення поля не може бути менше ніж 0.</h3>-->
        <!--</div>-->
        <!--<div class="main-content_title_text" v-if="validationEmptyZero === true && validationZero === false">-->
          <!--<h3>Значення поля <b>Маса сировини (кг)</b>має бути більше ніж 0.</h3>-->
        <!--</div>-->

        <!--<div class="main-content_title_text" v-if="validationEmptyZero === false && validationZero === false">-->
          <!--<h3>Заповнiть всi поля. Значення поля не може бути менше 0</h3>-->
        <!--</div>-->
      </div>
      <div class="main-content_input_data" >
        <div class="main-content_input_data_content">
          <div class="main-content-input" >
            <h4>Сировина</h4>
            <div class="main-content-input-multiselect" :class="{invalidInputValidation: !validationValue1}">
              <multiselect
                      class="mainInputMultiselect"
                      v-model="value1"
                      :options="raw"
                      :show-labels="false"
                      :close-on-select="true"
                      :clear-on-select="false"
                      @input="check=false"
                      placeholder="Оберiть сировину">
              </multiselect>
            </div>
          </div>
          <div class="main-content-input">
            <h4>Вмiст лiгнiну (%)</h4>
            <div class="main-content-input-multiselect" :class="{invalidInputValidation: !validationLignin}">
              <multiselect
                      class="mainInputMultiselect"
                      v-model="valueLignin"
                      :options="lignin"
                      :show-labels="false"
                      :close-on-select="true"
                      :clear-on-select="false"
                      @input="check=false"
                      placeholder="Вмiст лiгнiну">
              </multiselect>
            </div>
          </div>
          <div class="main-content-input">
            <h4>Вмiст целюлози (%)</h4>
            <div class="main-content-input-multiselect" :class="{invalidInputValidation: !validationCellulose}">
              <multiselect
                      class="mainInputMultiselect"
                      v-model="valueCellulose"
                      :options="cellulose"
                      :show-labels="false"
                      :close-on-select="true"
                      :clear-on-select="false"
                      @input="check=false"
                      placeholder="Вмiст целюлози">
              </multiselect>
            </div>
          </div>
          <div class="main-content-input">
            <h4>Вмiст мiнеральних солей (%)</h4>
            <div class="main-content-input_field" :class="{invalidInputValidation: !validationSalts}">
              <input v-model="valueSalts" type="number" placeholder="Вмiст мiнеральних солей" min="0" @change="check = false" />
            </div>
          </div>
          <div class="main-content-input">
            <h4>Кислотнiсть (pH)</h4>
           <div class="main-content-input_field" :class="{invalidInputValidation: !validationPh}">
             <input v-model="valuePh" type="number" placeholder="Кислотнiсть"  min="0"   @change="check = false"/>
           </div>
          </div>
          <div class="main-content-input">
            <h4>Вмiст сухої речовини (г/дм3)</h4>
            <div class="main-content-input_field" :class="{invalidInputValidation: !validationDryMatter}">
              <input v-model="valueDryMatter"  type="number" placeholder="Вмiст сухої речовини" min="0" @change="check = false"/>
            </div>
          </div>
          <div class="main-content-input">
            <h4>Подрiбненiсть (мм)</h4>
            <div class="main-content-input-multiselect" :class="{invalidInputValidation: !validationShredding}">
              <multiselect
                      class="mainInputMultiselect"
                      v-model="valueShredding"
                      :options="shredding"
                      :show-labels="false"
                      :close-on-select="true"
                      :clear-on-select="false"
                      @input="check=false"
                      placeholder="Подрiбненiсть">
              </multiselect>
            </div>
          </div>
          <div class="main-content-input" >
            <h4>Маса сировини (кг)</h4>
            <div class="main-content-input_field" :class="{invalidInputValidation: !validationWeight}">
              <input v-model= valueWeight type="number" placeholder="Маса сировини" min="0" @change="check = false"/>
            </div>
          </div>
          <div class="main-content_input_data-calc">
            <button @click="calcTotalResult">Розрахувати</button>
          </div>
        </div>
      </div>

      <div class="main-content_title">
        <div class="main-content_title_text">
          <h2>Результат</h2>
        </div>
        <div class="export_result_pdf_button main-content_input_data-calc" v-if="(totalResult.preProc.length != 0) && (totalResult.mainProc.length != 0)">
          <button @click="exportPDF">Завантажити PDF</button>
        </div>
      </div>

      <div v-if="(totalResult.preProc.length != 0) && (totalResult.mainProc.length != 0)">

        <div class="main-content_result main-content_result_border_top ">
          <div class="main-content_result_empty"></div>
        </div>


        <div class="main-content_result_title">
          <h3>Очікуваний результат процесу видобутку водню</h3>
        </div>
        <div class="main-content_result">
          <div class="main-content-result_description">
            <div class="main-content-result_graphic_set " >

              <!--<Graph v-if="check"-->
                     <!--:labels="totalResult.labelsForChart"-->
                     <!--:raw="value1"-->
                     <!--:weightRaw= Number(valueWeight)>-->
              <!--</Graph>-->

              <Charts v-if="check"
                     :labels="totalResult.labelsForChart"
                     :raw="value1"
                     :weightRaw= Number(valueWeight)>
              </Charts>

            </div>
          </div>
        </div>


        <div class="main-content_result_title">
          <h3>Основнi параметри процесу</h3>
        </div>
        <div class="main-content_result">
          <div class="main-content-result_description">
            <div class="result-item_title">
              <h4>Попередня обробка сировини</h4>
            </div>
            <ResultItem
                    v-for="result in totalResult.preProc"
                    v-bind:param="result.param"
                    v-bind:value="result.value"
            ></ResultItem>
            <div class="result-item_title">
              <h4>Процес видобутку водню</h4>
            </div>
            <ResultItem
                    v-for="result in totalResult.mainProc"
                    v-bind:param="result.param"
                    v-bind:value="result.value"
            ></ResultItem>

          </div>
        </div>


        <div class="main-content_result_title">
          <h3>Основнi етапи процесу видобутку водню</h3>
        </div>
        <div class="main-content_result  main-content_result_border_bottom">
          <div class="main-content-result_description" v-if="allStages.stage1.length != 0">
            <Stages
                    v-for="stage in stages"
                    v-bind:stageNumber="stage.id"
                    v-bind:stageName="stage.stageName"
                    v-bind:stageSet="stage.stageSet"
                    v-bind:allStages="allStages"
            ></Stages>
          </div>

        </div>
      </div>

      <div v-else>
        <div class="main-content_result_invalid">

          <div class="main-content-result_description main-content-input_empty" v-if = "(statusCheckFromIncorrectValues === false)">
            <h3>НЕ КОРЕКТНІ ВХІДНІ ДАНІ</h3>
            <h3>ПЕРЕВIРТЕ ВХIДНI ПОЛЯ:</h3>
            <div class="main-content-result_description_invalid">
              <h3 v-for="(text, index) in invalidFields">
                {{ text.text }}
              </h3>
            </div>
          </div>

          <div class="main-content-result_description main-content-input_empty" v-else-if = "(statusCalcResultFirstPart == false) && (validationType == 'case1')">
            <h3>СИРОВИНА З ТАКИМ КОМПОНЕНТНИМ СКЛАДОМ НЕ ПРИДАТНА ДЛЯ ВИДОБУТКУ ВОДНЮ</h3>
          </div>

          <div class="main-content-result_description main-content-input_empty" v-else>
            <h3>ФОРМА НЕ ЗАПОВНЕНА</h3>
          </div>

        </div>
      </div>
    </div>

  </div>


  <div v-else>
       <Login></Login>
  </div>

  </div>
</template>


<script>
// @ is an alias to /src
import Multiselect from 'vue-multiselect';
import Steps from '../components/Step';
import Stages from '../components/Stage';
import Login from '../views/Login';
import ResultItem from '../components/ResultItem';
import Graph from '../components/Graph';
import Charts from '../components/Charts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import mainForExport from '../views/MainForExport'

export default {
  name: 'main',
  components: {
    Multiselect,
    Graph,
    Steps,
    Stages,
    Login,
    ResultItem,
    Charts,
    mainForExport


  },

  data(){
    return{
      check: false,
      validationEmptyZero: true,
      validationZero: true,
      validationType: "",
      validationFormMessage: "",
      calcStatus: true,
      statusCheckFromIncorrectValues: true,
      statusCalcResultFirstPart: true,
      invalidFields: [],
      value1: null,
      valueLignin: null,
      valueSalts: null,
      valueDryMatter: '',
      valueShredding: null,
      valueWeight: null,
      valuePh: null,
      valueCellulose: null,
      selected: '',
      validationValue1: true,
      validationLignin: true,
      validationSalts: true,
      validationDryMatter: true,
      validationShredding: true,
      validationWeight: true,
      validationPh: true,
      validationCellulose: true,

      processDuration: 0,
      raw: ['солома пшеницi', 'солома ячменю', 'вiдходи кукурудзи', 'вiдходи рiпаку', 'вiдходи соняшника', 'деревина берези', 'деревина сосни'],
      lignin: ['0% - 10%','10% - 20%','20% - 30%','30% - 40%','40% <'],
      cellulose: ['0% - 10%','10% - 20%','20% - 30%','30% - 40%','40% <'],
      shredding: ['1-3 мм','3-100 мм','100 мм <'],
      fulness: ['> 30%','30% - 40%','40% - 50%','50% - 60%','60% - 70%','70% - 80%','80% - 90%','90% - 100%'],
      stages: [
        {id: 1, stageSet: 'stage1', stageName: 'Попередня підготовка сировини'},
        {id: 2, stageSet: 'stage2', stageName: 'Підготовка посівного матеріалу'},
        {id: 3, stageSet: 'stage3', stageName: 'Мікробіологічна деструкція біоенергетичної сировини'},
        {id: 4, stageSet: 'stage4', stageName: 'Відстоювання'},
        {id: 5, stageSet: 'stage5', stageName: 'Нейтралізація рідини для одержання водню'},
        {id: 6, stageSet: 'stage6', stageName: 'Одержання біоводню'},
        {id: 7, stageSet: 'stage7', stageName: 'Відстоювання'},
        {id: 8, stageSet: 'stage8', stageName: 'Очищення енергоносія (Н2, СН4)'},
        {id: 9, stageSet: 'stage9', stageName: 'Одержання Na2СО3'}

      ],
      allStages: {
        stage1: [],
        stage2: [],
        stage3: [],
        stage4: [],
        stage5: [],
        stage6: [],
        stage7: [],
        stage8: [],
        stage9: [],
      },
      totalResult: {
        preProc: [],
        mainProc: [],
        labelsForChart: ''
      },
      base64Img: null,
    }
  },
  watch: {
    valueDryMatter: function(val){
      if (val < 20){
        this.totalResult.labelsForChart = 264
      }
      if (val >= 20 && val < 29){
        this.totalResult.labelsForChart = 240
      }
      if (val>= 29 && val < 39){
        this.totalResult.labelsForChart = 216
      }
      if (val >= 39 && val < 49){
        this.totalResult.labelsForChart = 192
      }
      if (val >= 49 && val < 59){
        this.totalResult.labelsForChart = 168
      }
      if (val >= 59 && val < 69){
        this.totalResult.labelsForChart = 144
      }
      if (val >= 69){
        this.totalResult.labelsForChart = 120
      }
    }
  },
  methods: {

    calcTotalResult: function (e) {
      this.check = false;
      this.check = true;
      this.totalResult.preProc.length = 0;
      this.totalResult.mainProc.length = 0;
      if ( this.checkFormEmpty() === true ){
        if (this.checkFromIncorrectValues() === true){
          this.calcResultFirstPart();
          this.calcResult();
        }
      }
    },

    // checkFormZero: function(e){
    //
    //   this.validationWeight = !(this.valueWeight == "" || this.valueWeight == null || this.valueWeight < 0 || this.valueWeight == 0);
    //   console.log('Weight ' + this.validationWeight);
    //   if (this.validationWeight === false){
    //     this.validationZero = false;
    //     return false
    //   }
    //   else {
    //     this.validationZero = true;
    //     return true
    //   }
    // },

    checkFormEmpty: function (e) {

      this.validationValue1 = this.value1 !== null;

      this.validationLignin = this.valueLignin !== null;

      this.validationSalts = !(this.valueSalts === "" || this.valueSalts === null);

      this.validationDryMatter = !(this.valueDryMatter === "" || this.valueDryMatter === null);

      this.validationShredding = this.valueShredding !== null;

      this.validationWeight = !(this.valueWeight === "" || this.valueWeight === null);

      this.validationCellulose = this.valueCellulose !== null;

      this.validationPh = !(this.valuePh === "" || this.valuePh === null );


      if (this.validationValue1 === false ||
              this.validationLignin === false ||
              this.validationShredding === false ||
              this.validationSalts === false ||
              this.validationDryMatter === false ||
              this.validationWeight === false ||
              this.validationPh === false ||
              this.validationCellulose === false){
        this.validationEmptyZero = false;
        return false
      }
      else {
        this.validationEmptyZero = true;
        return true
      }
    },

    checkFromIncorrectValues: function(e){

      this.validationPh = true;
      this.validationSalts = true;
      this.validationDryMatter = true;
      this.validationWeight = true;
      this.statusCheckFromIncorrectValues = true;
      this.totalResult.preProc.length = 0;
      this.totalResult.mainProc.length = 0;
      this.invalidFields.length = 0;

      if (this.valueSalts > 15 || this.valueSalts < 0 ){
        this.statusCheckFromIncorrectValues = false;
        this.invalidFields.push({text: "Вмiст мiнеральних солей (%) ( 0 < 'Вмiст мiнеральних солей (%)' < 15)"});
        this.validationSalts = false

      }
      if (this.valuePh > 13 || this.valuePh < 0){
        this.statusCheckFromIncorrectValues = false;
        this.invalidFields.push({text: "Кислотнiсть (pH) ( 0 < 'Кислотнiсть (pH)' < 13)" });
        this.validationPh = false
      }
      if (this.valueDryMatter > 150 || this.valueDryMatter <= 0){
        this.statusCheckFromIncorrectValues = false;
        this.invalidFields.push({text: "Вмiст сухої речовини (г/дм3) ( 0 < 'Вмiст сухої речовини (г/дм3)' < 150)"});
        this.validationDryMatter = false
      }

      if (this.valueWeight <= 0){
        this.statusCheckFromIncorrectValues = false;
        this.invalidFields.push({text: "Маса сировини (кг) ( 0 < 'Маса сировини (кг)' )"});
        this.validationWeight = false
      }
      return this.invalidFields.length === 0;

    },

    calcResultFirstPart: function(e){

      this.totalResult.preProc.length = 0;
      this.totalResult.mainProc.length = 0;
      this.validationType = '';
      this.statusCalcResultFirstPart = true;

      var inoculum =  (this.valueWeight * 0.1667).toFixed(1);

      if (this.valueShredding !== '1-3 мм'){
        this.totalResult.preProc.push(
                {param: 'Подрібнення біоенергетичної сировини', value: 'dч = 1-3 мм'}
        )
      }

      if ( ((this.valueLignin === '0% - 10%' && this.valueCellulose === '30% - 40%') ||
              (this.valueLignin === '10% - 20%' && this.valueCellulose === '30% - 40%') ||
              (this.valueLignin === '0% - 10%' && this.valueCellulose === '40% <') ||
              (this.valueLignin === '10% - 20%' && this.valueCellulose === '40% <')) &&
              (this.value1 ==='солома ячменю' || this.value1 === 'вiдходи кукурудзи')){

        this.totalResult.preProc.push(
                {param: 'Метод попередньої обробки', value: 'пар'}
        );
        this.totalResult.preProc.push(
                {param: 'Тривалiсть попередньої обробки', value: ' τ = 1 год'}
        );
        this.totalResult.preProc.push(
                {param: 'Температура при попереднiй обробцi', value: 'Т = 130°C'}
        );
        this.totalResult.preProc.push(
                {param: 'Тиск при попереднiй обробцi', value: 'Р = 250 кПа'}
        );

        if (this.valuePh < 5){

          this.totalResult.preProc.push(
                  {param: 'Кислотнiть при попереднiй обробцi', value: 'pH = 5'}
          );
          this.totalResult.preProc.push(
                  {param: 'Стабiлiзацiя кислотностi', value: 'Оцтова кислота (CH3COOH)'}
          );
        }

        if (this.valueSalts < 5){
          this.totalResult.preProc.push(
                  {param: 'Додавання мiнеральних солей', value: 7 - this.valueSalts + ' %' }
          );
        }

      } else if ((this.valueLignin === '20% - 30%' || this.valueLignin === '30% - 40%' || this.valueLignin === '40% <') &&
                 (this.valueCellulose === '0% - 10%' || this.valueCellulose === '10% - 20%' || this.valueCellulose === '20% - 30%') &&
                 (this.value1 === 'солома пшеницi' || this.value1 === 'вiдходи рiпаку' || this.value1 === 'вiдходи соняшника' ||
                  this.value1 ===  'деревина берези' || this.value1 === 'деревина сосни')){

        this.totalResult.preProc.push(
                {param: 'Метод попередньої обробки', value: 'луг (NaOH)'}
        );
        this.totalResult.preProc.push(
                {param: 'Концентрацiя лугу', value: ' 2 моль/дм3'}
        );
        this.totalResult.preProc.push(
                {param: 'Тривалiсть попередньої обробки', value: ' τ = 2 год.'}
        );
        this.totalResult.preProc.push(
                {param: 'Температура при попереднiй обробцi', value: 'Т = 120°C'}
        );
        this.totalResult.preProc.push(
                {param: 'Тиск при попереднiй обробцi', value: 'Р = 180 кПа'}
        );

        if (this.valuePh < 5){
          this.totalResult.preProc.push(
                  {param: 'Кислотнiть при попереднiй обробцi', value: 'pH = 5'}
          );
          this.totalResult.preProc.push(
                  {param: 'Стабiлiзацiя кислотностi', value: 'Оцтова кислота (CH3COOH)'}
          );
        }

        if (this.valueSalts < 5){
          this.totalResult.preProc.push(
                  {param: 'Додавання мiнеральних солей', value: 7 - this.valueSalts + ' %'}
          );
        }

        this.totalResult.preProc.push(
                {param: 'Перемiшування при попереднiй обробцi', value: 'постiйне, 1 - 10 об/хв'}
        );
        this.totalResult.preProc.push(
                {param: 'Нейтралiзацiя лугу пiсля попередньої обробки', value: 'стiчною водою'}
        );

      }
      else {
        this.statusCalcResultFirstPart = false;
        this.validationType = "case1";
        return false

      //   this.totalResult.preProc.push(
      //           {param: 'Метод попередньої обробки', value: 'луг (NaOH)'}
      //   );
      //   this.totalResult.preProc.push(
      //           {param: 'Концентрацiя лугу', value: ' 2 моль/дм3'}
      //   );
      //   this.totalResult.preProc.push(
      //           {param: 'Тривалiсть попередньої обробки', value: ' τ = 3 год.'}
      //   );
      //   this.totalResult.preProc.push(
      //           {param: 'Температура при попереднiй обробцi', value: 'Т = 120 °C'}
      //   );
      //   this.totalResult.preProc.push(
      //           {param: 'Тиск при попереднiй обробцi', value: 'Р = 180 кПа'}
      //   );
      //
      //   if (this.valuePh < 5){
      //     this.totalResult.preProc.push(
      //             {param: 'Кислотнiть при попереднiй обробцi', value: 'pH = 5'}
      //     );
      //     this.totalResult.preProc.push(
      //             {param: 'Стабiлiзацiя кислотностi', value: 'Оцтова кислота (CH3COOH)'}
      //     );
      //   }
      //
      //   if (this.valueSalts < 5){
      //     this.totalResult.preProc.push(
      //             {param: 'Додавання мiнеральних солей', value: 7 - this.valueSalts + ' %'}
      //     );
      //   }
      //
      //   this.totalResult.preProc.push(
      //           {param: 'Перемiшування при попереднiй обробцi', value: '10 об/хв'}
      //   );
      //   this.totalResult.preProc.push(
      //           {param: 'Нейтралiзацiя лугу пiсля попередньої обробки', value: 'стiчною водою'}
      //   );
      }


      this.totalResult.mainProc.push(
              {param: 'Температура', value: 'Т = 35°C'}
      );
      this.totalResult.mainProc.push(
              {param: 'Концентрацiя сировини', value: '30 г/дм3'}
      );
      this.totalResult.mainProc.push(
              {param: 'Вмiст iнокуляту', value: inoculum.toString() + ' кг' }
      );
      this.totalResult.mainProc.push(
              {param: 'Кислотнiть', value: 'рН = 7'}
      );
      this.totalResult.mainProc.push(
              {param: 'Стабiлiзацiя кислотностi', value: 'Оцтова кислота (CH3COOH)'}
      );
      this.totalResult.mainProc.push(
              {param: 'Перемiшування', value: 'Перiодичне, 10 об/хв'}
      );
      this.totalResult.mainProc.push(
              {param: 'Перiод перемiшування', value: '5 год'}
      );
      this.totalResult.mainProc.push(
              {param: 'Тривалiть перемiшування', value: '10 хв'}
      );

      if (this.valueDryMatter < 20){

        this.totalResult.mainProc.push(
                {param: 'Тривалiсть процесу', value: 'τ = 264 год.'}
        );
      }
      if (this.valueDryMatter >= 20 && this.valueDryMatter < 29){

        this.totalResult.mainProc.push(
                {param: 'Тривалiсть процесу', value: 'τ = 240 год.'}
        );
      }
      if (this.valueDryMatter >= 29 && this.valueDryMatter < 39){

        this.totalResult.mainProc.push(
                {param: 'Тривалiсть процесу', value: 'τ = 216 год.'}
        );

      }
      if (this.valueDryMatter >= 39 && this.valueDryMatter < 49){

        this.totalResult.mainProc.push(
                {param: 'Тривалiсть процесу', value: 'τ = 192 год.'}
        );
      }
      if (this.valueDryMatter >= 49 && this.valueDryMatter < 59){

        this.totalResult.mainProc.push(
                {param: 'Тривалiсть процесу', value: 'τ = 168 год.'}
        );
      }
      if (this.valueDryMatter >= 59 && this.valueDryMatter < 69){

        this.totalResult.mainProc.push(
                {param: 'Тривалiсть процесу', value: 'τ = 144 год.'}
        );
      }
      if (this.valueDryMatter >= 69){

        this.totalResult.mainProc.push(
                {param: 'Тривалiсть процесу', value: 'τ = 120 год.'}
        );
      }
    },

    calcResult: function(e) {

      this.allStages.stage1.length = 0;
      this.allStages.stage2.length = 0;
      this.allStages.stage3.length = 0;
      this.allStages.stage4.length = 0;
      this.allStages.stage5.length = 0;
      this.allStages.stage6.length = 0;
      this.allStages.stage7.length = 0;
      this.allStages.stage8.length = 0;
      this.allStages.stage9.length = 0;

      var stepCount = 0;


      if ((this.valueLignin === '20% - 30%' || this.valueLignin === '30% - 40%' || this.valueLignin === '40% <') &&
          (this.valueCellulose === '0% - 10%' || this.valueCellulose === '10% - 20%' || this.valueCellulose === '20% - 30%') &&
          (this.value1 === 'солома пшеницi' || this.value1 === 'вiдходи рiпаку' || this.value1 === 'вiдходи соняшника' ||
           this.value1 ===  'деревина берези' || this.value1 === 'деревина сосни')){

        this.allStages.stage1.push({
          stepID: stepCount + 1, stepDesc: 'Підготовка розчину лугу', stepParam: 'С=2 моль/дм3, насичений'
        });
        stepCount = stepCount + 1;

        if (this.valueShredding !== '1-3 мм'){
          this.allStages.stage1.push({
            stepID: stepCount + 1, stepDesc: 'Подрібнення біоенергетичної сировини', stepParam: 'dч=1-3 мм'
          });

          this.allStages.stage1.push({
            stepID: stepCount + 2, stepDesc: 'Попередня обробка сировини', stepParam: 'pH = 5, Р=180 кПа, Т=120°C, τ=2 год.'
          });
          stepCount = stepCount + 2;
        }
        else {
          this.allStages.stage1.push({
            stepID: stepCount + 1, stepDesc: 'Попередня обробка сировини', stepParam: 'pH = 5, Р=180 кПа, Т=120°C, τ=2 год.'
          });
          stepCount = stepCount + 1;
        }

      }

      else if ((this.valueLignin === '0% - 10%' || this.valueLignin === '10% - 20%') &&
              (this.valueCellulose === '30% - 40%' || this.valueCellulose === '40% <') &&
              (this.value1 === 'солома ячменю' || this.value1 === 'вiдходи кукурудзи')){

        this.allStages.stage1.push({
          stepID: stepCount + 1, stepDesc: 'Підготовка пари', stepParam: 'Т=120°C'
        });
        stepCount = stepCount + 1;

        if (this.valueShredding !== '1-3 мм'){
          this.allStages.stage1.push({
            stepID: stepCount + 1, stepDesc: 'Подрібнення біоенергетичної сировини', stepParam: 'dч=1-3 мм'
          });

          this.allStages.stage1.push({
            stepID: stepCount + 2, stepDesc: 'Попередня обробка сировини', stepParam: 'Ph=5, Р=250 кПа, Т=130°C, τ=1 год.'
          });
          stepCount = stepCount + 2;
        }
        else {
          this.allStages.stage1.push({
            stepID: stepCount + 1, stepDesc: 'Попередня обробка сировини', stepParam: 'Ph=5, Р=250 кПа, Т=130°C, τ=1 год.'
          });
          stepCount = stepCount + 1;
        }
      }

      this.allStages.stage2.push({
        stepID: stepCount + 1, stepDesc: 'Отримання асоціації мікроорганізмів для деструкції полімерних речовин ', stepParam: 'рН=7, Т=35°C, n=10 об/хв.'
      });
      stepCount = stepCount + 1;
      this.allStages.stage2.push({
        stepID: stepCount + 1, stepDesc: 'Термічна обробка посівного матеріалу ', stepParam: 'Т=90 °C, τ=30 хв.'
      });
      stepCount = stepCount + 1;
      this.allStages.stage2.push({
        stepID: stepCount + 1, stepDesc: 'Вирощування посівного матеріалу для одержання водню ', stepParam: 'Т=35°С, рН=7±0.5, n=10об/хв.'
      });
      stepCount = stepCount + 1;
      this.allStages.stage3.push({
        stepID: stepCount + 1, stepDesc: 'Мікробіологічна деструкція біоенергетичної сировини', stepParam: 'Т=35°С, рН=5±0.5, n=10об/хв.'
      });
      stepCount = stepCount + 1;
      this.allStages.stage4.push({
        stepID: stepCount + 1, stepDesc: 'Відстоювання', stepParam: 'τ=1 год, анаеробні умови'
      });
      stepCount = stepCount + 1;
      this.allStages.stage5.push({
        stepID: stepCount + 1, stepDesc: 'Нейтралізація рідини для одержання водню', stepParam: 'рН=7±0.5, n=10 об/хв, анаеробні умови'
      });
      stepCount = stepCount + 1;
      this.allStages.stage6.push({
        stepID: stepCount + 1, stepDesc: 'Одержання біоводню', stepParam: 'Т=35 °С, рН=7±0.5, n=10об/хв.'
      });
      stepCount = stepCount + 1;
      this.allStages.stage7.push({
        stepID: stepCount + 1, stepDesc: 'Відстоювання', stepParam: 'τ=9 год, анаеробні умови'
      });
      stepCount = stepCount + 1;
      this.allStages.stage8.push({
        stepID: stepCount + 1, stepDesc: 'Очищення енергоносія від (СО2, Н2S)', stepParam: 'ν=0.5 м3/хв'
      });
      stepCount = stepCount + 1;
      this.allStages.stage8.push({
        stepID: stepCount + 1, stepDesc: 'Осушення СН4, або Н2', stepParam: 'τ=2 год,  W=0,65'
      });
      stepCount = stepCount + 1;
      this.allStages.stage9.push({
        stepID: stepCount + 1, stepDesc: 'Одержання Na2СО3', stepParam: 'Т=100 °C'
      });
      stepCount = stepCount + 1;


    },

    exportPDF() {

      var quotes = document.getElementById('export-container');
      var canvasElement = document.createElement('canvas');

      html2canvas(document.body, { canvas: canvasElement
         }).then(function (canvas) {

          var contentWidth = canvas.width;
          var contentHeight = canvas.height;

          //The height of the canvas which one pdf page can show;
          var pageHeight = contentWidth / 592.28 * 841.89;
          //the height of canvas that haven't render to pdf
          var leftHeight = contentHeight;
          //addImage y-axial offset
          var position = -35;
          //a4 format [595.28,841.89]
          var imgWidth = 595.28;
          var imgHeight = 592.28/contentWidth * contentHeight;

          var pageData = canvas.toDataURL('image/jpeg', 1.0);

          var pdf = new jsPDF('', 'pt', 'a4');

          if (leftHeight < pageHeight) {
            pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
          } else {
            while(leftHeight > 0) {
              pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight;
              position -= 841.89;
              //avoid blank page
              if(leftHeight > 0) {
                pdf.addPage();
              }
            }
          }
          var obj = new Date();
          pdf.save('DMY-'  + obj.getUTCDate() +  '/' + (obj.getUTCMonth() + 1) + '/' +
                  obj.getUTCFullYear() + '-' + obj.getTime() + '.pdf');
          console.log(pdf);
          pdf.output('dataurlnewwindow');

      });


      // html2canvas(quotes, { canvas: canvasElement
      // }).then(function (canvas) {
      //
      //     //! MAKE YOUR PDF
      //     var pdf = new jsPDF('p', 'pt', 'letter');
      //
      //     for (var i = 0; i <= quotes.clientHeight/980; i++) {
      //       //! This is all just html2canvas stuff
      //       var srcImg  = canvas;
      //       var sX      = 0;
      //       var sY      = 980*i; // start 980 pixels down for every new page
      //       var sWidth  = 900;
      //       var sHeight = 980;
      //       var dX      = 0;
      //       var dY      = 0;
      //       var dWidth  = 900;
      //       var dHeight = 980;
      //
      //       window.onePageCanvas = document.createElement("canvas");
      //       onePageCanvas.setAttribute('width', 900);
      //       onePageCanvas.setAttribute('height', 980);
      //       var ctx = onePageCanvas.getContext('2d');
      //       // details on this usage of this function:
      //       // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
      //       ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);
      //
      //       // document.body.appendChild(canvas);
      //       var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);
      //
      //       var width         = onePageCanvas.width;
      //       var height        = onePageCanvas.clientHeight;
      //
      //       //! If we're on anything other than the first page,
      //       // add another page
      //       if (i > 0) {
      //         pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
      //       }
      //       //! now we declare that we're working on that page
      //       pdf.setPage(i+1);
      //       //! now we add content to that page!
      //       pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width*.62), (height*.62));
      //
      //     }
      //      //! after the for loop is finished running, we save the pdf.
      //      pdf.save('test.pdf');
      // });




      // const doc = new jsPDF();
      // const contentHtml = this.$refs.pdf.innerHTML;
      // doc.fromHTML(contentHtml, 15, 15, {
      //   width: 170
      // });
      // doc.save("sample.pdf");



      // const doc = new jsPDF();
      // const contentHtml = this.$refs.content.innerHTML;
      // doc.fromHTML(contentHtml, 15, 15, {
      //   width: 170
      // });
      // doc.save("sample.pdf");



      //
      // /** WITH CSS */
      //
      // const doc = new jsPDF({
      //   format: 'a2', orientation: "landscape"});
      //
      // var canvasElement = document.createElement('canvas');
      //
      // html2canvas(this.$refs.content, { canvas: canvasElement
      // }).then(function (canvas) {
      //   const img = canvas.toDataURL("image/png");
      //   // doc.addImage(img,'JPEG', 40,0);
      //   doc.addImage(img,'JPEG', -15,0);
      //
      //   doc.save("sample.pdf");
      //
      // });



      //
      // var HTML_Width = this.$refs.content.width();
      // var HTML_Height = this.$refs.content.height();
      // var top_left_margin = 15;
      // var PDF_Width = HTML_Width+(top_left_margin*2);
      // var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
      // var canvas_image_width = HTML_Width;
      // var canvas_image_height = HTML_Height;
      //
      // var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
      //
      //
      // html2canvas(this.$refs.content[0],{allowTaint:true}).then(function(canvas) {
      //   canvas.getContext('2d');
      //
      //   console.log(canvas.height+"  "+canvas.width);
      //
      //
      //   var imgData = canvas.toDataURL("image/jpeg", 1.0);
      //   var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
      //   pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
      //
      //
      //   for (var i = 1; i <= totalPDFPages; i++) {
      //     pdf.addPage(PDF_Width, PDF_Height);
      //     pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
      //   }
      //
      //   pdf.save("HTML-Document.pdf");
      // });


    },

},

}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped lang="sass">

  .main
    width: 100%

  .main-content
    display: flex
    width: 100%
    flex-direction: column
    h2
      text-align: left

  .main-content_title
    width: 90%
    margin: 15px auto 0 auto
    display: flex
    flex-direction: row
    justify-content: space-between
    h2
      margin: 0
    h3
      margin: 0
      color: #ff5345
    .main-content_title_text
      height: auto
      margin-top: auto
      margin-bottom: 15px


  .main-content_input_data
    display: flex
    width: 90%
    box-sizing: border-box
    margin: 0 auto 15px auto
    border: 1px solid #262626

    /*background: url("../assets/images/bioreactor.jpg") no-repeat*/
    /*background-position-x: right*/
    /*background-position-y: bottom*/
    /*background-origin: content-box*/

  .main-content_input_data_content
    display: flex
    width: 97.5%
    margin: 0 auto
    flex-direction: row
    flex-wrap: wrap
    justify-content: flex-start
    padding: 10px 15px
    height: auto

  .main-content-input
    width: 270px
    height: auto
    margin: 10px 10px 10px 10px
    h4
      margin-bottom: 6px
      margin-top: 5px
      color: #262626
      text-align: left

  .main-content-input_field
    height: 40px
    width: 270px
    margin: 0 auto 10px auto
    box-sizing: border-box
    input
      height: 30px
      width: 261px
      padding-left: 5px

  .invalidInputValidation
    height: 40px
    border-bottom: 2px solid #ff5345
    box-sizing: border-box


  .main-content_input_data-calc
    width: 270px
    height: auto
    margin: 39px 10px 10px 10px
    button
      width: 270px
      height: 36px
      border: 2px solid #42b983
      background-color: #42b983
      color: white
      font-size: 15px
      font-weight: bold

  .main-content-result_description_invalid
    h3
      opacity: 0.7 !important

  .main-content-input_empty
    h3
      opacity: 0.4

  .main-content_result
    display: flex
    flex-direction: column
    width: 90%
    margin: 0 auto
    border-left: 1px solid #262626
    border-right: 1px solid #262626

  .main-content_result_invalid
    display: flex
    flex-direction: column
    width: 90%
    margin: 0 auto
    border: 1px solid #262626


  .main-content_result_border_top
    border-top: 1px solid #262626

  .main-content_result_border_bottom
    border-bottom: 1px solid #262626

  .main-content_result_empty
    height: 20px

  .main-content-result_graphic_set
    display: flex
    width: 100%
    flex-direction: column
    padding-top: 20px

  .main-content_result_title
    display: flex
    width: 95%
    background-color: #42b983
    margin: 0 auto
    h3
      margin-right: auto
      color: white
      padding: 4px 22px

  .main-content-result_description
    display: flex
    flex-direction: column
    width: 90%
    margin: 20px auto

  .result-item_title
    display: flex
    margin-left: auto
    margin-right: auto
    width: 100%
    border-bottom: 1px solid #b7c2ce
    padding: 12px 2px
    h4
      font-weight: bold



  .export_result_pdf_button
    margin: 0 0 0 auto


  .mainInputMultiselect::v-deep
    height: 30px
    width: 270px
    .multiselect__select
      height: 36px
    .multiselect__content-wrapper
      max-height: 250px!important
      border-top-left-radius: 0px
      border-top-right-radius: 0px
      .multiselect__option &:hover
        background-color: #42b983
      .multiselect__option--highlight
        background-color: #42b983
        &:hover
          background-color: #42b983
      .multiselect__option--selected
        background-color: white
        color: #262626
        &:hover
          color: white
    .multiselect__tags
      min-height: 30px
      padding-top: 3px
      padding-bottom: 3px
      padding-left: 5px
      border: 1px solid #A9A9A9
      border-radius: 0
      .multiselect__input
        margin-bottom: 4px
        margin-top: 4px
        font-size: 13px
      .multiselect__placeholder
        color: #A9A9A9
        display: inline-block
        margin-bottom: 6px
        padding-top: 6px
      .multiselect__single
        margin-top: 4px
        margin-bottom: 4px

</style>
