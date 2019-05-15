<template>
    <div>
        <h2>答案管理</h2>
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

        <div v-show="showSegment">
            <h3>Answer ID:{{currentShowAnswerId}}</h3>
            <el-table :data="segments" >
                <el-table-column label="id" prop="id"></el-table-column>
                <el-table-column label="子句" prop="data">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.data" :disabled="!scope.row.edit" size="mini"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="score" prop="score">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.score" :disabled="!scope.row.edit" size="mini"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="extra" prop="extra">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.extra" :disabled="!scope.row.edit" size="mini"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="opt">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEditSegment(scope.$index, scope.row)">{{scope.row.edit?'提交':'编辑'}}</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>

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
                },
                showSegment: false,
                currentShowAnswerId: -1,
                segments: []
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
                if(this.currentShowAnswerId===row.id && this.showSegment===true){
                    this.showSegment = false
                    this.currentShowAnswerId = -1
                    return
                }

                this.$axios.get('/answer/'+row.id+'/segment',{headers:{'session':this.$store.getters.Token}}).then(res=>{
                    this.segments = res.data['data']
                    for(var i=0;i<this.segments.length;i++){
                        this.segments[i]['edit'] = false
                    }
                    this.showSegment = true
                    this.currentShowAnswerId = row.id
                }).catch(res=>{
                    this.$message.error(res.toString())
                })
            },
            handleEditSegment(index, row){
                console.log(row)
                if(row.edit){
                    this.$axios.patch('/answer/'+row.id+'/segment/'+row.id,{
                        'session':this.$store.getters.Token,
                        'data': row.data,
                        'extra': row.extra,
                        'score': row.score
                    }).then((res)=>{
                        row.edit = false
                        this.$message.success('done')
                        this.$set(this.segments,index,row)
                    }).catch((res)=>{
                        this.$message.error(res.toString())
                    })
                }else {
                    row.edit=true
                    console.log(index)
                    this.$set(this.segments,index,row)
                }
            }

        }
    }
</script>

<style scoped>

</style>