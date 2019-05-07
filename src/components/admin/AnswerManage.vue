<template>
    <div>
        <el-table :data="answerList">
            <el-table-column label="id" prop="id"></el-table-column>
            <el-table-column label="sql" prop="sql"></el-table-column>
            <el-table-column label="json" prop="json"></el-table-column>
            <el-table-column label="opt">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleDeleteAnswer(scope.$index, scope.row)">Delete</el-button>
                    <el-button size="mini" @click="handleSegment(scope.$index, scope.row)">Segment</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-form ref="newAnswerForm" :model="newAnswerForm">
            <el-form-item label="sql">
                <el-input v-model="newAnswerForm.sql"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="addAnswer">Add</el-button>
            </el-form-item>

        </el-form>

    </div>
</template>

<script>
    export default {
        name: "AnswerManage",
        data(){
            return {
                idQuestion: this.$route.params.idQuestion,
                questionInfo: this.$route.params.row,
                answerList: [],
                newAnswerForm:{
                    'sql':''
                }
            }
        },
        mounted(){
          this.getAnswerList()
        },
        methods:{
            getAnswerList(){
                this.$axios.get('/question/'+this.idQuestion+'/answer',{headers:{'session':this.$store.getters.Token}}).then(res=>{
                    this.answerList=[]
                    this.answerList=res.data['data']
                }).catch(res=>{
                    this.$message.error(res.toString())
                })
            },
            addAnswer(){
                this.newAnswerForm['session']=this.$store.getters.Token
                this.$axios.post('/question/'+this.idQuestion+'/answer',this.newAnswerForm).then(res=>{
                    this.$message.success('成功')
                    this.getAnswerList()
                    this.newAnswerForm['session']=''
                    this.newAnswerForm['sql']=''
                }).catch(res=>{
                    this.$message.error(res.toString())
                })
            },
            handleDeleteAnswer(index,row){
                this.$axios.delete('/question/'+this.idQuestion+'/answer/'+row.id,{
                    data:{
                        'session':this.$store.getters.Token,
                    }
                }).then(res=>{
                    this.$message.success(res.data)
                    this.getAnswerList()
                }).catch(res=>{
                    this.$message.error(res.toString())
                })
            },
            handleSegment(index,row){

            }
        }
    }
</script>

<style scoped>

</style>