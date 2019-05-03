<template>
    <div>
        <el-row>
            <h1>{{'标题: '+idQuestion+' '+questionInfo.title}}</h1>
        </el-row>
        <el-collapse v-model="activeNames">
            <el-collapse-item title="问题描述" name="1">
                <el-row>
                    <el-input type="textarea" v-model="questionInfo.text" readonly>
                    </el-input>
                </el-row>
            </el-collapse-item>
            <el-collapse-item :title="'数据库: '+questionInfo.database.name+' 描述'" name="2">
                <el-row>
                    <el-input type="textarea" v-model="questionInfo.database.description" readonly>
                    </el-input>
                </el-row>
            </el-collapse-item>

            <el-collapse-item title="数据库表描述" name="3">
                <el-row>
                    数据库表描述
                    <p></p>
                </el-row>
            </el-collapse-item>
        </el-collapse>

        <div v-show="showResult" align="left" id="result">
            <h2>Result:</h2>
            <p>result-tag: <el-tag :type="result['tag']">{{result['type_info']}}</el-tag></p>
            <p>your-score: <el-tag :type="result['tag']">{{result['score']}}</el-tag></p>
            <p>拼写错误统计: {{result['spelling_count']}}</p>
            <p>Your Answer: <span v-html="result['errorInfo']"></span></p>
            <p>Format Answer:<span>{{result['correct']}}</span></p>
            <p>语法错误: {{result['syntax_error_msg']}}</p>
        </div>
        <h3>Your Answer?</h3>
        <el-input type="textarea" v-model="answer">
        </el-input>
        <el-button type="primary" @click="handleSubmit">
            提交
        </el-button>
    </div>

</template>

<script>
    export default {
        name: "Question",
        data(){
            console.log(this.$route.params.row)
            return {
                idQuestion:this.$route.params.idQuestion,
                questionInfo: this.$route.params.row,
                answer: '',
                activeNames:['1','2','3'],
                showResult:false,
                result:{},
                colorMap:{
                    0:'#FFFFFF',
                    1:'#FF0000',
                    2:'#008000'
                }
            }
        },
        methods:{
            handleSubmit(){
                if(this.answer===''){
                    this.$message.error('answer不能为空')
                    return
                }
                this.$axios.post('/question/'+this.idQuestion+'/submit',{
                    'session':this.$store.getters.Token,
                    'answer': this.answer
                }).then((res)=>{
                    console.log(res.data)
                    this.result=res.data
                    this.result['syntax_error_msg']=this.result['info'].slice(this.result['info'].indexOf('\n')+1)
                    console.log(this.result['syntax_error_msg'])
                    var erroInfo = this.result['info'].slice(0,this.result['info'].indexOf('\n')).split(' ').map(x=>{
                        return Number(x)
                    })
                    this.result['errorInfo']=this.parseErroInfo2HTML(this.result['your_answer'],erroInfo)

                    this.showResult=true
                    this.result['tag']=this.result['score']===this.questionInfo['score']?'success':'danger'
                    const anchorEle = document.querySelector("#result");
                    if (!anchorEle) {
                        anchorEle.scrollIntoView(true);
                    }
                }).catch((res)=>{
                    this.$message.error(res.toString())
                })
            },
            parseErroInfo2HTML(answer,erroInfo){
                if(answer.length!==erroInfo.length){
                    this.$message.error('length not match')
                    return ''
                }
                else{
                    if (!String.prototype.format) {
                        String.prototype.format = function() {
                            var args = arguments;
                            return this.replace(/{(\d+)}/g, function(match, number) {
                                return typeof args[number] != 'undefined'
                                    ? args[number]
                                    : match
                                    ;
                            });
                        };
                    }
                    var s=0
                    var template='<font color="{0}">'
                    var ret=template+answer[0]
                    for(var i=1;i<answer.length;i++){
                        if(erroInfo[i-1].toString()!==erroInfo[i].toString()){
                            ret = ret.format(this.getColor(erroInfo[i-1]))
                            ret+='</font>'
                            ret+=template
                            s=i
                        }
                        ret+=answer[i]
                    }
                    ret = ret.format(this.getColor(erroInfo[s]))+'</font>'
                    return ret
                }
            },
            getColor(x){
                x = Number(x)
                if(x===0) return '#FFFFFF'
                else if (0<x && x<1) return '#FF0000'
                else if (x===1) return '#008000'
                else return '#000000'
            }
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    }
</style>