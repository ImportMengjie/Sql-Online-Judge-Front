<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="4">
                <el-input placeholder="名字" v-model="new_name"></el-input>
            </el-col>
            <el-col :span="4">
                <el-input placeholder="描述" v-model="new_description"></el-input>
            </el-col>
            <el-col :span="4">
                <el-button @click="addDatabase">add database</el-button>
            </el-col>
        </el-row>
        <el-table :data="databaseList">
            <el-table-column label="id" prop="id"></el-table-column>
            <el-table-column label="name" prop="name"></el-table-column>
            <el-table-column label="description" prop="description"></el-table-column>
            <el-table-column label="opt">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleTable(scope.$index, scope.row)">管理</el-button>
                </template>
            </el-table-column>
            <el-table-column label="keywords" prop="keywords"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "DatabaseManage",
        data(){
          return {
              databaseList:[],
              new_name:'',
              new_description:''
          }
        },
        mounted(){
          this.getDatabaseList()
        },
        methods:{
            getDatabaseList(){
                this.databaseList=[]
                this.$axios.get('/schema',{headers:{'session':this.$store.getters.Token}}).then(res=>{
                    this.databaseList=res.data['data']
                }).catch(res=>{
                    this.$message.error(res.toString())
                })
            },
            handleTable(index, row){
                this.$router.push({
                    name: 'TableManage',
                    params:{
                        'idSchema':row['id'],
                        'row': row
                    }
                })
            },
            addDatabase(){
                if(this.new_name===''){
                    this.$message.error('name 不能为空')
                }
                else{
                    this.$axios.post('/schema',{
                        'session':this.$store.getters.Token,
                        'name':this.new_name,
                        'description':this.new_description
                    }).then(res=>{
                        this.$message.info('加入成功')
                        this.new_name=''
                        this.new_description=''
                        this.getDatabaseList()
                    }).catch(res=>{
                        this.$message.error(res.toString())
                    })
                }
            },

        }
    }
</script>

<style scoped>

</style>