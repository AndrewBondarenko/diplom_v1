<template>
  <div>
  <div v-if="$root.currentUser!=''" class="main">
    <div class="main-content">
      <h2>Вхiднi данi</h2>
      <div class="main-content_input_data">
        <div class="main-content-input">
          <h4>Сировина</h4>
          <div class="main-content-input-multiselect">
            <multiselect
                    class="mainInputMultiselect"
                    v-model="value1"
                    :options="raw"
                    :show-labels="false"
                    :close-on-select="true"
                    :clear-on-select="false"
                    placeholder="Оберiть сировину">
            </multiselect>
          </div>
        </div>
        <div class="main-content-input">
          <h4>Вмiст лiгнiну</h4>
          <div class="main-content-input-multiselect">
            <multiselect
                    class="mainInputMultiselect"
                    v-model="value2"
                    :options="lignin"
                    :show-labels="false"
                    :close-on-select="true"
                    :clear-on-select="false"
                    placeholder="Вмiст лiгнiну">
            </multiselect>
          </div>
        </div>
        <div class="main-content-input">
          <h4>Кислотнiсть (pH)</h4>
           <input type="text" placeholder="Кислотнiсть" class="main-content-input_field" />
        </div>
        <div class="main-content-input">
          <h4>Подрiбненiсть</h4>
          <div class="main-content-input-multiselect">
            <multiselect
                    class="mainInputMultiselect"
                    v-model="value3"
                    :options="shredding"
                    :show-labels="false"
                    :close-on-select="true"
                    :clear-on-select="false"
                    placeholder="Подрiбненiсть">
            </multiselect>
          </div>
        </div>
        <div class="main-content-input" >
          <h4>Заповненiсть бiореактора</h4>
          <div class="main-content-input-multiselect" >
            <multiselect
                    class="mainInputMultiselect"
                    v-model="value4"
                    :options="fulness"
                    :show-labels="false"
                    :close-on-select="true"
                    :clear-on-select="false"
                    placeholder="Заповненiсть">
            </multiselect>
          </div>
        </div>
        <div class="main-content_input_data-calc">
          <button @click="calcResult">Розрахувати</button>
        </div>
      </div>

      <h2>Результат</h2>
      <div class="main-content_result">
        <div class="main-content-result_graphic_set">
          <div class="main-content-result_graphic">
            <img src="../assets/images/graphic.jpg" alt="Graphic">
          </div>
          <div class="main-content-result_graphic">
            <img src="../assets/images/graphic.jpg" alt="Graphic">
          </div>
        </div>

        <div class="main-content-result_description">

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

export default {
  name: 'main',
  components: {
    Multiselect,
    Steps,
    Stages,
    Login
  },
  data(){
    return{
      value1: null,
      value2: null,
      value3: null,
      value4: null,
      selected: '',
      raw: ['солома пшеницi', 'солома ячменю', 'вiдходи кукурудзи', 'вiдходи рiпаку', 'вiдходи соняшника', 'деревина берези', 'деревина сосни'],
      lignin: ['0% - 10%','10% - 20%','20% - 30%','30% - 40%','40% - 50%','50% <'],
      shredding: ['мiлкоподрiбнена','середньоподрiбнена','крупноподрiбнена'],
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

    }
  },
  methods: {
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

      if (this.value2 === '0% - 10%' ||
      this.value2 === '10% - 20%' ||
      this.value1 === 'солома пшеницi' ||
      this.value1 ===  'вiдходи рiпаку' ||
      this.value1 ===  'вiдходи соняшника' ||
      this.value1 ===  'деревина берези' ||
      this.value1 ===  'деревина сосни' ){
        this.allStages.stage1.push({
          stepID: stepCount + 1, stepDesc: 'Підготовка розчину лугу', stepParam: 'С=2-3 моль/дм3, насичений'
        });
        stepCount = stepCount + 1;
      }
      else {
        this.allStages.stage1.push({
          stepID: stepCount + 1, stepDesc: 'Підготовка пари', stepParam: 'Т=105-110 °C'
        });
        stepCount = stepCount + 1;
      }
      if (this.value3 !== 'мiлкоподрiбнена'){
        this.allStages.stage1.push({
          stepID: stepCount + 1, stepDesc: 'Подрібнення біоенергетичної сировини', stepParam: 'dч=1-3 мм'
        });
        this.allStages.stage1.push({
          stepID: stepCount + 2, stepDesc: 'Попередня обробка сировини', stepParam: 'Р=150-200 кПа, Т=120-150 °C, τ=1 год.'
        });
        stepCount = stepCount + 2;
      }
      else {
        this.allStages.stage1.push({
          stepID: stepCount + 1, stepDesc: 'Попередня обробка сировини', stepParam: 'Р=150-200 кПа, Т=120-150 °C, τ=1 год.'
        });
        stepCount = stepCount + 1;
      }
      this.allStages.stage2.push({
        stepID: stepCount + 1, stepDesc: 'Отримання асоціації мікроорганізмів для деструкції полімерних речовин ', stepParam: 'рН=5-6, Т=35±5 °C, n=10-100об/хв.'
      });
      stepCount = stepCount + 1;
      this.allStages.stage2.push({
        stepID: stepCount + 1, stepDesc: 'Термічна обробка посівного матеріалу ', stepParam: 'Т=90 °C, τ=30 хв.'
      });
      stepCount = stepCount + 1;
      this.allStages.stage2.push({
        stepID: stepCount + 1, stepDesc: 'Вирощування посівного матеріалу для одержання водню ', stepParam: 'Т=35±5 °С, рН=7±0,5, n=10-100об/хв.'
      });
      stepCount = stepCount + 1;
      this.allStages.stage3.push({
        stepID: stepCount + 1, stepDesc: 'Мікробіологічна деструкція біоенергетичної сировини', stepParam: 'Т=35±5 °С, рН=5-6±0,5, n=10-100об/хв.'
      });
      stepCount = stepCount + 1;
      this.allStages.stage4.push({
        stepID: stepCount + 1, stepDesc: 'Відстоювання', stepParam: 'τ=1год, анаеробні умови'
      });
      stepCount = stepCount + 1;
      this.allStages.stage5.push({
        stepID: stepCount + 1, stepDesc: 'Нейтралізація рідини для одержання водню', stepParam: 'рН=7±0,5, n=10-100об/хв, анаеробні умови'
      });
      stepCount = stepCount + 1;
      this.allStages.stage6.push({
        stepID: stepCount + 1, stepDesc: 'Одержання біоводню', stepParam: 'Т=35±5 °С, рН=7±0,5, n=10-100об/хв.'
      });
      stepCount = stepCount + 1;
      this.allStages.stage7.push({
        stepID: stepCount + 1, stepDesc: 'Відстоювання', stepParam: 'τ=8-10 год, анаеробні умови'
      });
      stepCount = stepCount + 1;
      this.allStages.stage8.push({
        stepID: stepCount + 1, stepDesc: 'Очищення енергоносія від (СО2, Н2S)', stepParam: 'ν=0,5 м3/хв'
      });
      stepCount = stepCount + 1;
      this.allStages.stage8.push({
        stepID: stepCount + 1, stepDesc: 'Осушення СН4, або Н2', stepParam: 'τ=1-2 год,  W=0,65'
      });
      stepCount = stepCount + 1;
      this.allStages.stage9.push({
        stepID: stepCount + 1, stepDesc: 'Одержання Na2СО3', stepParam: 'Т=100 °C'
      });
      stepCount = stepCount + 1;


    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped lang="sass">

  .main
    display: flex
    width: 100%

  .main-content
    display: flex
    width: 90%
    margin-left: auto
    margin-right: auto
    flex-direction: column
    h2
      text-align: left

  .main-content_input_data
    display: flex
    width: auto
    border: 1px solid #262626
    flex-direction: row
    flex-wrap: wrap
    justify-content: flex-start
    padding: 10px
    height: 230px
    margin-bottom: 15px
    background: url("../assets/images/bioreactor.jpg") no-repeat
    background-position-x: right
    background-position-y: bottom
    background-origin: content-box

  .main-content_result
    display: flex
    flex-direction: column
    width: auto
    border: 1px solid #262626

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
    height: 36px
    width: 270px
    margin: 0 auto 10px auto
    box-sizing: border-box
    padding-left: 5px

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


  .main-content-result_graphic_set
    display: flex
    width: 100%
    flex-direction: row
    padding-top: 20px

  .main-content-result_graphic
    display: flex
    padding: 15px
    margin-left: auto
    margin-right: auto
    height: 350px
    width: 500px
    img
      height: 350px
      width: 500px

  .main-content-result_description
    display: flex
    flex-direction: column
    width: 90%
    margin: 20px auto
    .result-description-stage
      margin-top: 0
      .result-description-stage_title
        display: flex
        margin-right: auto
        flex-direction: column
        background-color: #42b983
        background-size: 100%
        /*border-left: 5px solid white*/
        h3
          width: max-content
          margin: 10px auto 5px 0
          padding-left: 10px
          color: #fff
        h4
          width: max-content
          margin: 0 auto 10px 0
          padding-left: 10px
          color: #fff

      .result-description-stage_content
        margin: 5px auto 15px auto
        .result-description-step
          display: flex
          flex-direction: column
          width: 95%
          margin: 10px auto
          .result-description-step_title
            display: flex
            margin-right: auto
            h4
              margin: 7px auto 7px 0
          .result-description-step_content
            display: flex
            flex-direction: row
            border: 1px solid #bbb
            .result-description-step_content_description
              width: 60%
              height: 100%
              border-right: 1px dashed #bbb
              padding: 5px
              p
                width: max-content
                margin: 5px auto 5px 10px
            .result-description-step_content_param
              width: 40%
              height: 100%
              padding: 5px
              p
                width: max-content
                margin: 5px auto 5px 15px


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