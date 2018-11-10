<template>
  <div class="home">
      <div class="head">
        <div class='head_bg'>
          <div class="personalMsg clearfloat">
            <div class="avatar">
              <img :src="user.headImg" class="img">
            </div>
            <div class="nameMsg">
              <div class="name">
                {{user.wxNickName}}
                <img v-if='user.sex==1' class="man" src='../../assets/img/man.png' />
                <img v-else-if='user.sex==2' class="woman" src='../../assets/img/woman.png' />
              </div>
              <span class="phone" v-if="user.mobile!=0">{{user.mobile}}</span>
              <span class="phone" v-else-if="user.mobile!=''">{{user.mobile}}</span>
              <span class="role" v-if="user.roleName!=''">{{user.roleName}}</span>
            </div>
          </div>
          <div class="join">
            <div  @click="jump(2)"  v-if="user.role==0">
              <img src='../../assets/img/join.png' />
              <p>加入合伙人</p>
            </div>
            <div  @click="jump(1)"  v-else-if="user.role!=0">
              <img src='../../assets/img/earnings.png' />
              <p>推广收益</p>
            </div>
            <div  @click="jump(3)" >
              <img src='../../assets/img/team.png' />
              <p>团队</p>
            </div>
            <div  @click="jump(2)"  v-if="user.role==0">
              <img src='../../assets/img/grading.png' />
              <p>段位</p>
            </div>
            <div @click="jump(4)"  v-else-if="user.role!=0">
              <img src='../../assets/img/grading.png' />
              <p>段位</p>
            </div>
          </div>
          <div class="setUp" @click="jump(6)">
            <img src="../../assets/img/setup.png" />
            <span> 设置</span>
            <img src="../../assets/img/setupClick.png" />
          </div>
        </div>
      </div>
      <div class="strip">
        <div  class="common" @click="jump(11)" >
          <img src="../../assets/img/hfriend.png" style="width:0.36rem;height:0.36rem;padding-right:0.06rem" />
          <span>购物车</span>
        </div>  
        <div  class="common" @click="jump(10)" >
          <img src="../../assets/img/hfriend.png" style="width:0.36rem;height:0.36rem;padding-right:0.06rem" />
          <span>邀请好友</span>
        </div>  
        <div  class="common" @click="jump(7)">
          <img src="../../assets/img/century.png" />
          <span>百年商学院</span>
        </div>

        <div  class="common" @click="jump(8)">
          <img src="../../assets/img/service.png" />
          <span>联系客服</span>
        </div>
        <div  class="common" @click="jump(5)">
          <img src="../../assets/img/we.png" />
          <span>关于</span>
        </div>
      </div> 
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["user"])
  },

  methods: {
    jump(n) {
     //路由跳转
      switch (n) {
        case 1:
          "/profit"
          break;
        case 2:
          "/jointTeam"
          break;
        case 3:
          "/team"
          break;
        case 4:
          "/grid"
          break;
        case 5:
          "/setup"
          break;
        case 6:
          if (this.user.ins) {
            "/lookInfo?point=mySelf"
          } else {
            "/setupInfo"
          }
          break;
        case 7:
          "/college?type=2&title=百年商学院"
          break;
        case 8:
          "/Customer"
          break;
        case 9:
          "/robList"
          break;
        case 10:
           "/invitation"
          break;
        case 11:
          this.$router.push({
            name:"ShopCar"
          })
          
          break;
      }
    }
  }
};
</script>
<style scoped>
.home{
  height:100vh;
  background:#f5f5f5;
}
.join {
  height:1.6rem;
  margin:0 0.3rem;
  background-color: #fff;
  border-radius: 0.12rem;
  display: flex;
  justify-content:center;
  align-items: center;
}
.join>div{
  width:33.3%;
  text-align:center;
  font-size:0;
}

.join  div:nth-child(2) {
  border-left: 0.01rem solid #ccc !important;
  border-right: 0.01rem solid #ccc !important;
}

.join  div img {
  width: 0.64rem;
  height: 0.6rem;
}

.join  div p {
  text-align: center;
  font-size: 0.26rem;
  color: #333;
  line-height: 0.16rem;
  margin-top:0.1rem;
  margin-bottom:0;
}

.head {
  width: 100%;
  height: 3.2rem;
  position: relative;
  color: #fff;
  background: #ff4958;
}

.head .core {
  width: 100%;
  height: 1.2rem;
  position: absolute;
  bottom: 0;
  text-align: center;
}

.head .core div {
  float: left;
  width: 2.49rem;
  height: 100%;
  padding-top: 0.15rem;
  background: rgba(0, 0, 0, 0.1);
}

.head .core .team {
  margin: 0 0.02rem;
}

.head .core div p {
  font-size: 0.28rem;
  margin-top: 0.06rem;
}

.head .core div img {
  width: 0.5rem;
  height: 0.5rem;
}

.head .setUp {
  background: url("../../assets/img/ico_home_setupBg.png") no-repeat center;
  background-size: 1.74rem 0.6rem;
  width: 1.7rem;
  height: 0.6rem;
  position: absolute;
  top: 1.2rem;
  right: 0;
  padding-top: 0.03rem;
  text-align: left;
  line-height: 0.5rem;
  font-size:0;
}

.head .setUp span {
  display: inline-block;
  margin-top: 0.03rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 0.52rem;
  font-size:0.28rem;
}

.head .setUp img:first-child {
  width: 0.25rem;
  height: 0.26rem;
  padding: 0rem 0.14rem 0 0.22rem;
}

.head .setUp img:last-child {
  width: 0.12rem;
  height: 0.22rem;
  padding-left: 0.26rem;
}

.strip {
  position: relative;
  margin: 1.2rem 0.3rem 0;
  border-radius: 0.12rem;
  overflow: hidden;
}

.strip .common {
  padding: 0 0.32rem !important;
  line-height: 0.86rem;
  border-bottom: 0.02rem solid #f5f5f5 !important;
  text-align: left;
  background: #fff url("../../assets/img/ioc_index_arraw.png") no-repeat 95%
    center;
  background-size: 0.12rem 0.24rem;
}

.strip .common img {
  width: 0.4rem;
  height: 0.4rem;
}

.strip .common span {
  color: #333;
  font-size: 0.3rem;
}

.personalMsg {
  padding-top: 0.46rem;
  position: relative;
}

.personalMsg .avatar {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 0.52rem;
  margin-right: 0.2rem;
  float: left;
}

.avatar .img {
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
}

.personalMsg {
  line-height: 0.55rem;
  height: 1.96rem;
}

.personalMsg .nameMsg {
  float: left;
  text-align: left;
  font-size: 0.34rem;
  padding-top: 0.15rem;
}

.personalMsg .nameMsg span {
  display: inline-block;
}

.personalMsg .nameMsg .name .userNickName {
  display: inline-block;
  padding-right: 0.1rem;
  height: 0.46rem;
  max-width: 3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.personalMsg .nameMsg .name .man {
  display: inline-block;
  width: 0.24rem;
  height: 0.24rem;
  margin-top: -0.12rem;
}

.personalMsg .nameMsg .name .woman {
  display: inline-block;
  width: 0.24rem;
  height: 0.32rem;
  margin-top: -0.18rem;
}

.personalMsg .nameMsg .phone {
  font-size: 0.3rem;
  margin-right: 0.12rem;
}

.personalMsg .nameMsg .role {
  display: inline-block;
  border: 1px solid rgba(255, 255, 255, 0.8);
  font-size: 0.18rem;
  padding: 0rem 0.08rem;
  border-radius: 0.5rem;
  line-height: 0.28rem;
  color: rgb(255, 255, 255);
  position: relative;
  top: -0.04rem;
}
</style>

