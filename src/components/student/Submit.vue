<template>
    <div>
        <el-table :data="questionList" style="width: 100%">
            <el-table-column label="id" prop="id" width="180">
<!--                <template slot-scope="scope">-->
<!--                </template>-->
            </el-table-column>

            <el-table-column label="标题" prop="title" width="180">
<!--                <template slot-scope="scope">-->
<!--                </template>-->
            </el-table-column>

            <el-table-column  label="分数" prop="score" width="180">
<!--                <template slot-scope="scope">-->

<!--                </template>-->
            </el-table-column>

            <el-table-column label="database" width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>name: {{ scope.row.database.name }}</p>
                        <p>description: {{ scope.row.database.description }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.database.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="tag">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>id: {{ scope.row.max_score.id }}</p>
                        <p>type: {{ scope.row.max_score.type }}</p>
                        <p>score: {{ scope.row.max_score.score }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium" :type="scope.row.tag">{{ scope.row.max_score.type }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="opt">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleSubmit(scope.$index, scope.row)">做题</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    export default {
        name: "Submit",
        data(){
            return {
                questionList:[],
                databaseMap:{}
            }
        },
        mounted() {
            this.refresh()
        },
        methods:{
            refresh(){
                this.$axios.get('/schema',{headers:{'session':this.$store.getters.Token}}).then((res)=>{
                    var schemaList=res.data['data']
                    for(var i=0;i<schemaList.length;i++){
                        this.databaseMap[schemaList[i]['id']]=schemaList[i]
                    }

                    this.questionList=[]
                    this.$axios.get('/question',{headers:{'session':this.$store.getters.Token}}).then((res)=>{
                        this.questionList.push(...res.data['data'])
                        for(var i=0;i<this.questionList.length;i++){
                            this.questionList[i]['database']=this.databaseMap[this.questionList[i]['idSchema']]
                            var max_score = this.questionList[i]['max_score']
                            if(this.questionList[i]['score']>=0)
                                this.questionList[i]['tag']=this.questionList[i]['score']===max_score['score']?'success':'danger'
                            else
                                this.questionList[i]['tag']='warning'
                        }
                    }).catch((res)=>{
                        this.$message.error(res.toString())
                    })

                }).catch((res)=>{
                    this.$message.error(res.toString())
                })
            },
            handleSubmit(index, row){

            }

        }
    }
</script>

<style scoped>

</style>