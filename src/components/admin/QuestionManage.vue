<template>
    <div>
        <el-table :data="questionList">
            <el-table-column label="id" prop="id"></el-table-column>
            <el-table-column label="title" prop="title"></el-table-column>
            <el-table-column label="text" prop="text"></el-table-column>
            <el-table-column label="score" prop="score"></el-table-column>
            <el-table-column label="idSchema" prop="idSchema"></el-table-column>
            <el-table-column label="opt">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleAnswer(scope.$index, scope.row)">Answer</el-button>
                    <el-button size="mini" @click="handleDeleteQuestion(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-form ref="newQuestionForm" :model="newQuestionForm" label-position="left">
            <el-form-item label="title">
                <el-input v-model="newQuestionForm.title"></el-input>
            </el-form-item>

            <el-form-item label="text">
                <el-input v-model="newQuestionForm.text"></el-input>
            </el-form-item>

            <el-form-item label="score">
                <el-input v-model="newQuestionForm.score"></el-input>
            </el-form-item>

            <el-form-item label="database">

                <el-select v-model="newQuestionForm.idSchema" placeholder="请选择一个数据库">
                    <el-option v-for="item in databaseOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="addQuestion">提交</el-button>
            </el-form-item>

    </el-form>

</div>
</template>

<script>
    export default {
        name: "QuestionManage",
        data(){
            return {
                questionList:[],
                newQuestionForm:{
                    idSchema:'',
                    title:'',
                    text:'',
                    score:'',
                },
                databaseList:[],
                databaseOptions:[]

            }
        },
        mounted(){
            this.getQuestionList()
        },
        methods:{
            addQuestion(){
                this.newQuestionForm['session']=this.$store.getters.Token
                this.$axios.post('/question',this.newQuestionForm).then(res=>{
                    this.$message.success('成功')
                    this.getQuestionList()
                    this.newQuestionForm.idSchema=''
                    this.newQuestionForm.score=''
                    this.newQuestionForm.text=''
                    this.newQuestionForm.title=''
                }).catch(res=>{
                    this.$message.error(res.toString())
                })

            },
            getQuestionList(){
                this.getDatabaseList()
                this.questionList=[]
                this.$axios.get('/question',{headers:{'session':this.$store.getters.Token}}).then(res=>{
                    this.questionList = res.data['data']
                }).catch(res=>{
                    this.$message.error(res.toString())
                })
            },
            handleAnswer(index, row){
                this.$router.push({
                    name: 'AnswerManage',
                    params:{
                        'idQuestion':row['id'],
                        'row': row
                    }
                })
            },
            handleDeleteQuestion(index,row){
                this.$axios.delete('/question/'+row.id,{
                     data:{
                        'session':this.$store.getters.Token,
                    }
                }).then(res=>{
                    this.$message.success('done')
                    this.getQuestionList()
                }).catch(res=>{
                    this.$message.error(res.toString())
                })
            },
            getDatabaseList(){
                this.databaseList=[]
                this.$axios.get('/schema',{headers:{'session':this.$store.getters.Token}}).then(res=>{
                    this.databaseList=res.data['data']
                    for(var i=0;i<this.databaseList.length;i++){
                        this.databaseOptions.push({
                            'value':this.databaseList[i]['id'],
                            'label':this.databaseList[i]['name']
                        })
                    }

                }).catch(res=>{
                    this.$message.error(res.toString())
                })
            },
        }
    }
</script>

<style scoped>

</style>