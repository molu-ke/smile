<template>
    <div class="study">
        <div v-for="item in arrayList" :key="item.name">
           {{item.id}}---- {{item.name}}
        </div>
        <button @click="pushAdd">push新增</button>
        <button @click="indexAdd">用下标的方法修改第一条数据</button>
        <button @click="vueSetAdd">Vue.set()</button>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                arrayList:[
                    {id:1,name:'铠'},
                    {id:2,name:'阿轲'},
                    {id:3,name:'女祸'}
                ]
            }
        },
        methods:{
            pushAdd(){
                this.arrayList.push({id:4,name:'王昭君'})
            },
            indexAdd(){
                this.arrayList[0]={id:1,name:'梦奇'};
                console.log("数据修改成功，由于 JavaScript 的限制，Vue 不能检测出数据的改变，所以当我们需要动态改变数据的时候，要使用Vue.set()");
                console.log(this.arrayList);
            },
            vueSetAdd(){
                //Vue.set的用法，用于动态修改视图数据
                this.$set(this.arrayList,0,{id:1,name:'梦奇'})
            }   
        
        }
    }
</script>

<style scoped>
.study{
    font-size:18px;
}
</style>