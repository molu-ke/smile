<template>
    <div>
        <!-- <keep-alive> -->
            <router-view/>
        <!-- </keep-alive> -->
        <van-tabbar v-model="active" @change="changeTab">
            <van-tabbar-item style="margin:0" to="/Store">
                <span>商城</span>
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? iconStore.active : iconStore.normal"
                >
            </van-tabbar-item>
            <van-tabbar-item to="/Classification">
                <span>分类</span>
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? iconClass.active : iconClass.normal"
                >
            </van-tabbar-item>
            <van-tabbar-item to="/Home">
                <span>会员中心</span>
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? iconHome.active : iconHome.normal"
                >
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0,
            iconStore: {
                normal: require('../../assets/img/foot_m1.png'),
                active: require('../../assets/img/foot_s1.png')
            },
            iconClass: {
                normal: require('../../assets/img/foot_m2.png'),
                active: require('../../assets/img/foot_s2.png')
            },
            iconHome: {
                normal: require('../../assets/img/foot_m4.png'),
                active: require('../../assets/img/foot_s4.png')
            },
        }
    },
    methods:{
        changeTab(active){
            // console.log(active)
        }
    },
    created(){
        //刷新后tabbar选中
        switch(this.$route.name){
            case "Store":
                this.active=0;
                break;
            case 'Classification':
                this.active=1;
                break;
            case "Home":
                this.active=3;
                break;
        }
    }
};
</script>

<style scoped>
.van-tabbar-item__icon img{
    width:0.6rem;
    height:0.6rem;
}
.van-tabbar-item--active{
    color:#ED2D3C;
}
</style>