<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="4" >
                <el-input placeholder="id" v-model="new_id"></el-input>
            </el-col>
            <el-col :span="4">
                <el-input placeholder="姓名" v-model="new_name"></el-input>
            </el-col>
            <el-col :span="4">
                <el-input placeholder="密码" v-model="new_password"></el-input>
            </el-col>
            <el-col :span="4">
                <el-button @click="addStudent">add</el-button>
            </el-col>
        </el-row>

        <el-table :data="studentList" style="width: 100%">
            <el-table-column label="id" width="180">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.id" :disabled="true" size="mini"></el-input>
                </template>
            </el-table-column>

            <el-table-column label="姓名" width="180">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.name" :disabled="!scope.row.edit" size="mini"></el-input>
                </template>
            </el-table-column>

            <el-table-column  label="密码" width="180">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.password" :disabled="!scope.row.edit" size="mini"></el-input>
                </template>
            </el-table-column>

            <el-table-column label="opt" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{scope.row.edit?'提交':'编辑'}}</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    export default {
        name: "StudentManage",
        data(){
            return {
                studentList:[],
                new_id:'',
                new_name:'',
                new_password:''
            }
        },
        mounted(){
            this.refresh()
        },
        methods:{
            addStudent(){
                if(this.new_password==='' || this.new_name==='' || this.new_id==='')
                    this.$message.error('输入错误')
                else{
                    this.$axios.post('/student',{
                        'session':this.$store.getters.Token,
                        'id':this.new_id,
                        'name':this.new_name,
                        'password': this.new_password
                    }).then((res)=>{
                        this.$message.info('成功')
                        this.new_password=''
                        this.new_id=''
                        this.new_name=''
                        this.refresh()

                    }).catch((res)=>{
                        this.$message.error(res.toString())
                    })
                }

            },
            addEdit(){
                for(let i=0; i<this.studentList.length;i++){
                    this.studentList[i]['edit']=false
                }
            },
            handleEdit(index, row) {
                if(row.edit){
                    this.$axios.patch('/student/'+row.id,{
                        'session':this.$store.getters.Token,
                        'name':row.name,
                        'password': row.password
                    }).then((res)=>{
                        this.$message.info('成功')
                        row.edit=false
                        this.$set(this.studentList,index,row)
                    }).catch((res)=>{
                        this.$message.error(res.toString())
                    })
                }
                else{
                    row.edit=true
                    this.$set(this.studentList,index,row)
                }

            },
            handleDelete(index, row) {
                this.$axios.delete('/student/'+row.id,{
                    data:{
                        'session':this.$store.getters.Token,
                    }
                }).then((res)=>{
                    this.$message.info('删除成功')
                    this.refresh()
                }).catch((res)=>{
                    this.$message.error(res.toString())
                })
            },
            refresh(){
                this.studentList=[]
                this.$axios.get('/student',{headers:{'session':this.$store.getters.Token}}).then((res)=>{
                    this.studentList.push(...res.data['data'])
                    this.addEdit()
                }).catch((res)=>{
                    this.$message.error(res.toString())
                })
            }
        }
    }
</script>

<style scoped>

</style>