<template>
    <div>


        <el-table :data="tableList" :expand-row-keys="expand_key" :row-key="getRowKeys">
            <el-table-column type="expand" :hidden="true">
                <template slot-scope="props">
                    <div v-show="props.row.current_info==='table'">
                        <b>Table Detail:</b>
                        <el-table :data="tableInfo[props.row.name].cols">
                            <el-table-column label="Number" prop="[0]"></el-table-column>
                            <el-table-column label="Column Name" prop="[1]"></el-table-column>
                            <el-table-column label="Column Type" prop="[2]"></el-table-column>
                            <el-table-column label="Not Null" prop="[3]"></el-table-column>
                            <el-table-column label="Default Value" prop="[4]"></el-table-column>
                            <el-table-column label="PK" prop="[5]"></el-table-column>
                        </el-table>
                    </div>
                    <div v-show="props.row.current_info==='showRows'">
                        <b>Rows info:</b>
                        <el-table :data="rows['detail']">
                            <el-table-column
                                    v-for="row_name in tableInfo[props.row.name].cols"
                                    :label="row_name[1]" :key="row_name[0]" >
                                <template slot-scope="props">
                                    {{props.row[row_name[0]]}}
                                </template>
                            </el-table-column>
                            <el-table-column label="opt">
                                <template slot-scope="props">
                                    <el-button size="mini" >删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <el-table :data="[0]">
                            <el-table-column
                                    v-for="row_name in tableInfo[props.row.name].cols"
                                    :label="row_name[1]" :key="row_name[0]" >
                                <input v-model="tableInfo[props.row.name].new_rows[row_name[0]]"></input>
                            </el-table-column>

                            <el-table-column>
                                <el-button size="mini" @click="handleAddRow(props.$index, props.row)">add</el-button>

                            </el-table-column>

                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="id" prop="id"></el-table-column>
            <el-table-column label="name" prop="name"></el-table-column>
            <el-table-column label="description" prop="description"></el-table-column>
            <el-table-column label="sql" prop="sql"></el-table-column>
            <el-table-column label="opt">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleTableDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button size="mini" @click="handleShowRows(scope.$index, scope.row)">Rows</el-button>
                    <el-button size="mini" @click="handleTableInfo(scope.$index, scope.row)">tableInfo</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    
</template>

<script>
    export default {
        name: "TableManage",
        data() {
            return {
                idSchema: this.$route.params.idSchema,
                schemaInfo: this.$route.params.row,
                tableList: [],
                tableNameList: [],
                tableInfo: {},
                current_info: 'table',
                rows: {},
                expand_key: [],
                new_rows:[]
            }
        },
        mounted() {
            this.getTableList()
        },
        methods: {
            getTableList() {
                this.$axios.get('schema/' + this.idSchema + '/table', {headers: {'session': this.$store.getters.Token}}).then(res => {
                    this.tableList = res.data['data']
                    for(var i=0;i<this.tableList.length;i++){
                        this.tableList[i]['current_info']='table'
                    }
                    this.tableNameList = res.data['table_name']
                    this.tableInfo = res.data['table']
                    for(var key in this.tableInfo){
                        this.tableInfo[key]['new_rows']=Array(this.tableInfo[key]['cols'].length).fill('')
                    }
                }).catch(res => {
                    this.$message.error(res.toString())
                })
            },
            handleTableDelete(index, row) {
                this.$axios.delete('schema/' + this.idSchema + '/table' + row.id, {
                    data: {
                        'session': this.$store.getters.Token,
                    }
                }).then(res => {
                    this.$message.success('success')
                }).catch(res => {
                    this.$message.error(res.toString())
                })
            },
            handleShowRows(index, row){
                this.$axios.get('table/'+ row.id+'/rows',{headers: {'session': this.$store.getters.Token}}).then(res=>{
                    this.rows=res.data
                    row.current_info='showRows'
                    this.$set(this.tableList,index,row)
                    // if(this.expand_key.includes(row.id)){
                    //     this.expand_key.splice(this.expand_key.indexOf(row.id),1)
                    // }
                    this.expand_key = []
                    this.expand_key.push(row.id)
                }).catch(res=>{
                    this.$message.error(res.toString())
                })

            },
            getRowKeys(row) {
                return row.id;
            },
            handleTableInfo(index,row){
                row.current_info='table'
                this.$set(this.tableList,index,row)
                // if(this.expand_key.includes(row.id)){
                //     this.expand_key.splice(this.expand_key.indexOf(row.id),1)
                // }
                // this.expand_key.push(row.id)
                this.expand_key = []
                this.expand_key.push(row.id)
            },
            handleAddRow(index,row){
                console.log(row.name)

                this.$axios.post('/table/'+row.id+'/rows',{
                    'session':this.$store.getters.Token,
                    'data':this.tableInfo[row.name]['new_rows'],
                }).then((res)=>{
                    this.$message.success('成功')
                    this.handleShowRows(index,row)
                    this.tableInfo[row.name]['new_rows']=Array(this.tableInfo[row.name]['new_rows'].length).fill('')
                }).catch((res)=>{
                    this.$message.error(res.toString())
                })
            }
        }
    }
</script>

<style scoped>

</style>