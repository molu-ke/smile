<template>
    <div class="selectList  Oflex">
        <div :class="{'noneSalse':num==1}"  @click='sendNetwork(1)'>
        综合
        </div>
        <div :class="num==2?'onArrowSales':'arrowSales'" @click='sendNetwork(2)'>
        销量
        </div>
        <div :class="num==3?arrow:'arrowComm'"  @click='sendNetwork(3)'>
        券后价
        </div>
        <div :class="num==4?arrow:'arrowComm'" @click='sendNetwork(4)' v-if="seek!=1">
        佣金
        </div>
        <image v-if="mode=='3-1-0-6'" class="change" @click='setMode("3-1-0-5")' src='/static/img/change_1.png'/>
        <image v-else-if="mode=='3-1-0-5'" class="change" @click='setMode("3-1-0-6")' src='/static/img/change.png'/>
    </div>
</template>
<script>
import { mapState,mapMutations } from "vuex";
export default {
  props: {
    seek: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      num: 1,
      arrow: "",
      updown: 1 //判断箭头向上 1，还是向下2
    };
  },
  methods: {
    ...mapMutations(['setMode']),
    sendNetwork(rankNum) {
      console.log(rankNum);
      let sortType = ""; //排序类型
      let arrow = ""; //箭头的方向

      if (rankNum == this.num && (rankNum == 1 || rankNum == 2)) {
        return;
      } else if (rankNum != this.num) {
        this.updown = 2;
      }
      switch (rankNum) {
        case 1: //综合排序
          sortType = "";
          break;
        case 2: //销量
          sortType = 8;
          break;
        case 3: //券后价
          if (this.updown == 2) {
            this.updown = 1;
            arrow = "onDownArrowComm";
            sortType = 3;
          } else {
            this.updown = 2;
            arrow = "onUpArrowComm";
            sortType = 4;
          }
          break;
        case 4: //佣金比例
          if (this.updown == 2) {
            this.updown = 1;
            arrow = "onDownArrowComm";
            sortType = 9;
          } else {
            this.updown = 2;
            arrow = "onUpArrowComm";
            sortType = 10;
          }
          break;
        case 22:
          sortType = 31;
          break;
      }
      this.num = rankNum;
      this.arrow = arrow;

      this.$emit("customEvent", sortType);
    }
  },
  computed: {
    ...mapState(["mode", "role"])
  }
};
</script>
<style>
/* 商品例表 */

.commList .selectList {
  display: flex;
  background: #fff;
  padding: 20rpx 10rpx 10rpx 0;
  font-size: 60rpx;
  justify-content: space-around;
  width: 100%;
}

.commList .selectList div {
  text-align: center;
  display: table;
  vertical-align: middle;
  font-size: 28rpx;
  color: #333;
  padding-right: 28rpx;
  background-size: 21rpx 11rpx;
}

.commList .selectList .select {
  color: #e84d74;
  font-size: 28rpx;
  background-size: 21rpx 11rpx;
}

.commList .selectList .downArrow {
  color: #e84d74;
  font-size: 28rpx;
  background-size: 21rpx 11rpx;
}

.commList .swiper .carousel {
  background: #fff;
  height: 50rpx;
  line-height: 50rpx;
  padding: 0 30rpx;
  color: #333;
  text-align: left;
}

/* 排序类型样式 */

.commList .selectList .noneSalse {
  color: #ed2d3c !important;
}

.commList .selectList .arrowSales {
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAPCAMAAADJev/pAAAAIVBMVEVHcEzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMyvnkSjAAAACnRSTlMA0EgTwSnx3ZpwvaxCMwAAAFNJREFUeNp1zkEOwCAIRFEKKND7H9iYpmGg9i8nER/9JnodUiHi+xDvN/Hd47nmfff3H627JsBwN0namLnPQRAjqBQJanmCWoogTKyCkIYgjBG0AMbkBYdE20HPAAAAAElFTkSuQmCC")
    no-repeat right 54%;
  background-size: 21rpx 11rpx;
}

.commList .selectList .onArrowSales {
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAPCAMAAADJev/pAAAAIVBMVEVHcEztLTztLTztLTztLTztLTztLTztLTztLTztLTztLTwCiYvXAAAACnRSTlMA0EgTwSnx3ZpwvaxCMwAAAFNJREFUeNp1zkEOwCAIRFEKKND7H9iYpmGg9i8nER/9JnodUiHi+xDvN/Hd47nmfff3H627JsBwN0namLnPQRAjqBQJanmCWoogTKyCkIYgjBG0AMbkBYdE20HPAAAAAElFTkSuQmCC")
    no-repeat right 54%;
  background-size: 21rpx 11rpx;
  color: #ed2d3c;
}

.commList .selectList .arrowComm {
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAnCAMAAAAihXiyAAAAJFBMVEVHcEzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzK9Xc7AAAAC3RSTlMA0EgTwfEp3ZpwBsPkLTYAAAB3SURBVHja5ZNBDoAwCARroS0t//+vxhgJUIJ35wiXCeyWL9S6n/fW+m4Og3mAny/kC1xuQXxDdj75YRohfqlaSBatayFhgBISRI3YQCJkmEZIqQEeGxDKX4lPEh0xOnv0qOS1Pgx5fHzg8ohKqJMapMWRquXlPAHWHQxN0v+T3AAAAABJRU5ErkJggg==")
    no-repeat right 50%;
  background-size: 21rpx 31rpx;
}

.commList .selectList .onUpArrowComm {
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAnCAMAAAAihXiyAAAAQlBMVEVHcEztLTztLTzMzMztLTzMzMzMzMzMzMztLTzdgojMzMztLTzMzMztLTzMzMztLTztLTztLTzMzMzMzMzMzMztLTzdH16QAAAAFHRSTlMAE8HBSEgT0NAGKfHxKd3dcJpwmhU8jjsAAACUSURBVHja5dE5EsIwEETR1gqyvGhh7n9VXC4YSWMF5Lywo1/V+IW1mNpi3DChDqJD4SZoOukAKdMlQ0j0kUQQMTsGEYvbEMQ4jYNYS8skZA6Skgga0pR+TmiF/+XNY8J4wL0mHE7lvhdcqtzr91oz7iZwwN7vuwdb1ravCzpOBDWlBQmVg4RgOEjw+xjUp3GQ4PqgN9DHF2+I12QDAAAAAElFTkSuQmCC")
    no-repeat right 50%;
  background-size: 21rpx 31rpx;
  color: #ed2d3c;
}

.commList .selectList .onDownArrowComm {
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAnCAMAAAAihXiyAAAAQlBMVEVHcEzMzMzMzMztLTzMzMztLTztLTzMzMztLTzdgojtLTzMzMzMzMztLTztLTzMzMzMzMzMzMztLTztLTzMzMztLTybMnDSAAAAFHRSTlMAwRPBSEgT0NAG3SnxKfHdmnCacKWtyGcAAACUSURBVHja5dE5EsIwEETR1gqSNy3D/a+KywUjaayAnBd29Ksav7AWU8u6LpjQB9GhcRMUnVSAlOiSIGT6yCKImB2DiK3LEMQ4jYNYS0skJA6Ssgga0rR6TCiN/+XNc8J4wL0mHE71vldcitzL91oz7iZwQOz36MG2ve37ho4TQU1tQULhICEYDhJ8HIP6NA4SXB/0BsZQF2/PA4ZyAAAAAElFTkSuQmCC")
    no-repeat right 50%;
  background-size: 21rpx 31rpx;
  color: #ed2d3c;
}
.Oflex {
  position: fixed;
  top: 0rpx;
  left: 0rpx;
  z-index: 111;
}

</style>
