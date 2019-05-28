<template>
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
</template>

<script>
    export default {
        name: "MainForExport"
    }
</script>

<style scoped lang="sass">

    .main
        width: 100%

        .main-content
            display: flex
            width: 50%
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
            width: 50%
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


        .main-content-result_description_invalid
            h3
                opacity: 0.7 !important

        .main-content-input_empty
            h3
                opacity: 0.4


</style>