<template>
    <div>
        <el-row>
            <el-select v-model="select_question_id" placeholder="请选择" @change="handle_change_question">
                <el-option
                        v-for="item in questionList"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id">
                </el-option>
            </el-select>
        </el-row>

        <el-row>
            <el-col :span="12">
                <v-chart :options="score_chart" title="分数分布直方图" autoresize>
                    fensh
                </v-chart>
                <p>分数分布图</p>
            </el-col>
            <el-col :span="12">
                <v-chart :options="type_chart" title="答案类型饼状图" autoresize>
                </v-chart>
                <p>类型分布图</p>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Statistics",
        data(){
            return {
                questionList: [],
                select_question_id: -1,
                score_chart:{
                    title:{
                        text:'分数分布直方图',
                        x: 'center'
                    },
                    xAxis: {
                        type: 'category',
                        name: '分数',
                        data: [...Array(11).keys()]
                    },
                    yAxis: {
                        type: 'value',
                        name: '频次'
                    },
                    series: [{
                        name: '分数频次',
                        data: [],
                        type: 'bar',
                        smooth: true
                    }],
                    tooltip : {
                        show: true,
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                },
                type_chart:{
                    title : {
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        bottom: 'bottom',
                        data: []
                    },
                    series : [
                        {
                            name: '答案类型',
                            type: 'pie',

                            data:[],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ],

                }
            }
        },
        methods:{
            set_chart_data(questionId=null){
                let url = ''
                if(questionId===null || questionId===-1){
                    url = 'submit'
                }else{
                    url = 'question/'+questionId+'/submit'
                }
                this.$axios.get(url,{headers:{'session':this.$store.getters.Token}}).then((res)=>{
                    this.score_chart.series[0].data=res.data.chart.score
                    this.type_chart.legend.data = res.data.chart.type_name
                    this.type_chart.series[0].data = res.data.chart.type
                }).catch(res=>{
                    this.$message.error(res.toString())
                })
            },
            get_questionList(){
                this.questionList=[{id:-1,'title':'所有'}]
                this.$axios.get('/question',{headers:{'session':this.$store.getters.Token}}).then((res)=>{
                    this.questionList.push(...res.data['data'])


                }).catch((res)=>{
                    this.$message.error(res.toString())
                })

            },
            handle_change_question(id){
                this.set_chart_data(id)
            }
        },
        mounted() {
            this.set_chart_data()
            this.get_questionList()
        }
    }
</script>

<style scoped>

</style>