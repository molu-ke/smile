<template>
    <div class="share">
        <!-- 点击分享 -->
        <div class="popWindow" v-show="isShow" @click="closeSharePanel"></div>
        <div class="sharePanel" :style="'transform:translateY('+sliderOffset+'rem)'"> 
             <div class="sharewrite">分享至</div>
            <div class="panel">
                <div class='friend pfc' @click="call('wechatFriend')">
                    <img src="../../assets/img/share_wx_icon.png" />
                    <p>微信</p>
                </div>
                <div class="circle pfc" @click="call('wechatTimeline')">
                    <img src="../../assets/img/share_cir_icon.png" />
                    <p>朋友圈</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NativeShare from "nativeshare";
export default {
  props: ["isShow", "goodsInfo"],
  data() {
    return {
      sliderOffset: 3.78,
      nativeShare: "" //分享的实例
    };
  },
  created() {
    // 在组件加载时创建实例
    this.nativeShare = new NativeShare();
  },
  methods: {
    closeSharePanel() {
      this.$emit("csPanelEvent");
    },
    //移动端分享
    call(command) {
      this.closeSharePanel();//先关闭弹框

      let shareData = {
        title: "Smile商城",
        link: window.location.href
      };
      //设分享信息
      if (this.goodsInfo) {
        (shareData.desc = this.goodsInfo.goodsName),
        (shareData.icon = this.goodsInfo.goodsGalleryUrls[0]);
      } else {
        (shareData.desc = "淘超值商品,领超值优惠券,天天都是双十一!"),
        (shareData.icon =
            "http://wx.qlogo.cn/mmopen/Q3auHgzwzM6sLMdPaD6nM3JdrYP5nKEQr27V2MXYxZ5aibkN7A5pxlCnXic1LibycLK7dEmUdMyXnGvM9GwG9Qu2Sutsjib7q1adRKEbxTuiaxdA/0");
      }
      this.nativeShare.setShareData(shareData);
      try {
        this.nativeShare.call(command);
      } catch (err) {
        this.$dialog.alert({
            title: '出错啦',
            message: '你的浏览器不支持分享，请换个浏览器再尝试'
        });
      }
    }
  },
  watch: {
    isShow() {
      if (this.isShow) {
        this.sliderOffset = 0;
      } else {
        this.sliderOffset = 3.78;
      }
    }
  }
};
</script>

<style scoped>
.popWindow {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 11;
}
.sharePanel {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 12;
  transition: transform 0.2s;
  background: #fff;
}

.sharePanel .sharewrite {
  padding-top: 0.5rem;
  padding-bottom: 0.3rem;
  text-align: center;
  font-size: 0.36rem;
}

.sharePanel .panel {
  width: 100%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sharePanel .panel .pfc {
  margin: 0;
  padding: 0 0.5rem;
  text-align: center;
  font-size: 0.3rem;
  border: none;
}

.sharePanel .panel .friend img {
  width: 1rem;
  height: 1rem;
}

.sharePanel .panel .circle img {
  width: 1rem;
  height: 1rem;
}
</style>