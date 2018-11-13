<template>
    <div class="list">
        <van-nav-bar    
            left-text="返回"
            left-arrow
            fixed
            @click-left="onClickLeft"
            :title="$route.query.title"/>

        <!-- 排序 -->
        <div class="selectList">
            <div :class="sel_num==1?'noneSalse':''"  @click='sendNetwork(1)'>
                综合
            </div>
            <div :class="sel_num==2?'onArrowSales':'arrowSales'" @click='sendNetwork(2)'>
                销量
            </div>
            <div :class="sel_num==3?arrow:'arrowComm'"  @click='sendNetwork(3)'>
                券后价
            </div>
            <div :class="sel_num==4?arrow:'arrowComm'" @click='sendNetwork(4)'>
                佣金
            </div>
            <img class="change" @click='change(0)' v-if="mode=='3-1-0-6'"
                 src='../../assets/img/change_1.png'/>
            <img class="change" @click='change(1)'  v-else-if="mode=='3-1-0-5'"
                  src='../../assets/img/change.png'/>
        </div>
        <van-pull-refresh v-model="isLoading" @refresh="pullDown">
            <van-list
            v-model="loading"
            :finished="finished"
            @load="pullUp"
            >
                <goodsList  :goodsList="goodsList"></goodsList>
            </van-list>
            <div class="bottom" v-show="finished">----我是有底线的----</div>
        </van-pull-refresh>
    </div>
</template>

<script>
import goodsList from "@/components/component/goodsList";
import { mapState,mapMutations } from "vuex";
export default {
  name: "List",
  data(){
      return{
        pams:{},
        sel_num: 1,
        arrow: "",
        updown: 1, //判断箭头向上 1，还是向下2 
        goodsList:[],
        loading: false,
        finished: false,
        isLoading: false,
      }
  },
  methods: {
    ...mapMutations(['change']),
    getData: function(page, load) {
      this.$request("pdd/goods/list",this.pams,"GET",load,(res)=> {
        if (res.list.length == 0 && page == 99) {
           this.loading = false;
          this.finished = true;
          return;
        } else if (res.list.length == 0 && page == 100) {
         this.isLoading = false;
        }
        if (page == 99) {
          this.goodsList = this.goodsList.concat(res.list);
        } else {
          this.isLoading = false;
          this.goodsList = res.list;
        }
        
      });
    },
    sendNetwork(rankNum) {
      let sortType = ""; //排序类型
      let arrow = ""; //箭头的方向

      if (rankNum == this.sel_num && (rankNum == 1 || rankNum == 2)) {
        return;
      } else if (rankNum != this.sel_num) {
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
      
      this.sel_num=rankNum;
      this.arrow=arrow;
      this.pams.sortType = sortType; //排序类型
      this.pams.st = 1;
       this.finished = false;
      this.getData(100, 1);
    },

    //上拉加载
    pullUp: function() {
      this.pams.st++;
      this.getData(99, 0);
    },

    //下拉刷新
    pullDown(){
      this.finished = false;
      this.pams.st=1;
      this.getData(100, 0);
    },
    onClickLeft(){
        this.$router.go(-1)
    }
  },
  created(){
    this.pams = {
        sortType : '', // 默认综合排序 2
        st :0, //分页  默认1
        ifOnlyCoupon : true,
        themeId:this.$route.query.themeId
    }; 
  },
  components: {
    goodsList
  },
   computed: {
    ...mapState(["mode"])
  },
};
</script>

<style scoped>
.list{
   margin-top: 1.6rem;
}
.selectList {
  width:100%;
  position:fixed;
  top:46px;
  left:0;
  z-index:1;
  display: flex;
  background: #fff;
  padding: 0.2rem 0.1rem 0.1rem 0;
  font-size: 0.6rem;
  justify-content: space-around;
}

.selectList div {
  text-align: center;
  display: table;
  vertical-align: middle;
  font-size: 0.28rem;
  color: #333;
  padding-right: 0.28rem;
  background-size: 0.21rem 0.11rem;
}

.selectList .select {
  color: #e84d74;
  font-size: 0.28rem;
  background-size: 0.21rem 0.11rem;
}

.selectList .downArrow {
  color: #e84d74;
  font-size: 0.28rem;
  background-size: 0.21rem 0.11rem;
}

.swiper .carousel {
  background: #fff;
  height: 0.5rem;
  line-height: 0.5rem;
  padding: 0 0.3rem;
  color: #333;
  text-align: left;
}

/* 排序类型样式 */

.selectList .noneSalse {
  color: #ed2d3c !important;
}

.selectList .arrowSales {
  background: url("data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAPCAMAAADJev/pAAAAIVBMVEVHcEzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMyvnkSjAAAACnRSTlMA0EgTwSnx3ZpwvaxCMwAAAFNJREFUeNp1zkEOwCAIRFEKKND7H9iYpmGg9i8nER/9JnodUiHi+xDvN/Hd47nmfff3H627JsBwN0namLnPQRAjqBQJanmCWoogTKyCkIYgjBG0AMbkBYdE20HPAAAAAElFTkSuQmCC")
    no-repeat right 54%;
  background-size: 0.21rem 0.11rem;
}

.selectList .onArrowSales {
  background: url("data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAPCAMAAADJev/pAAAAIVBMVEVHcEztLTztLTztLTztLTztLTztLTztLTztLTztLTztLTwCiYvXAAAACnRSTlMA0EgTwSnx3ZpwvaxCMwAAAFNJREFUeNp1zkEOwCAIRFEKKND7H9iYpmGg9i8nER/9JnodUiHi+xDvN/Hd47nmfff3H627JsBwN0namLnPQRAjqBQJanmCWoogTKyCkIYgjBG0AMbkBYdE20HPAAAAAElFTkSuQmCC")
    no-repeat right 54%;
  background-size: 0.21rem 0.11rem;
  color: #ed2d3c;
}

.selectList .arrowComm {
  background: url("data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAnCAMAAAAihXiyAAAAJFBMVEVHcEzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzK9Xc7AAAAC3RSTlMA0EgTwfEp3ZpwBsPkLTYAAAB3SURBVHja5ZNBDoAwCARroS0t//+vxhgJUIJ35wiXCeyWL9S6n/fW+m4Og3mAny/kC1xuQXxDdj75YRohfqlaSBatayFhgBISRI3YQCJkmEZIqQEeGxDKX4lPEh0xOnv0qOS1Pgx5fHzg8ohKqJMapMWRquXlPAHWHQxN0v+T3AAAAABJRU5ErkJggg==")
    no-repeat right 50%;
  background-size: 0.21rem 0.31rem;
}

.selectList .onUpArrowComm {
  background: url("data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAnCAMAAAAihXiyAAAAQlBMVEVHcEztLTztLTzMzMztLTzMzMzMzMzMzMztLTzdgojMzMztLTzMzMztLTzMzMztLTztLTztLTzMzMzMzMzMzMztLTzdH16QAAAAFHRSTlMAE8HBSEgT0NAGKfHxKd3dcJpwmhU8jjsAAACUSURBVHja5dE5EsIwEETR1gqyvGhh7n9VXC4YSWMF5Lywo1/V+IW1mNpi3DChDqJD4SZoOukAKdMlQ0j0kUQQMTsGEYvbEMQ4jYNYS8skZA6Skgga0pR+TmiF/+XNY8J4wL0mHE7lvhdcqtzr91oz7iZwwN7vuwdb1ravCzpOBDWlBQmVg4RgOEjw+xjUp3GQ4PqgN9DHF2+I12QDAAAAAElFTkSuQmCC")
    no-repeat right 50%;
  background-size: 0.21rem 0.31rem;
  color: #ed2d3c;
}

.selectList .onDownArrowComm {
  background: url("data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAnCAMAAAAihXiyAAAAQlBMVEVHcEzMzMzMzMztLTzMzMztLTztLTzMzMztLTzdgojtLTzMzMzMzMztLTztLTzMzMzMzMzMzMztLTztLTzMzMztLTybMnDSAAAAFHRSTlMAwRPBSEgT0NAG3SnxKfHdmnCacKWtyGcAAACUSURBVHja5dE5EsIwEETR1gqSNy3D/a+KywUjaayAnBd29Ksav7AWU8u6LpjQB9GhcRMUnVSAlOiSIGT6yCKImB2DiK3LEMQ4jYNYS0skJA6Ssgga0rR6TCiN/+XNc8J4wL0mHE71vldcitzL91oz7iZwQOz36MG2ve37ho4TQU1tQULhICEYDhJ8HIP6NA4SXB/0BsZQF2/PA4ZyAAAAAElFTkSuQmCC")
    no-repeat right 50%;
  background-size: 0.21rem 0.31rem;
  color: #ed2d3c;
}
.change {
  height:0.35rem;
  width:0.35rem;
}
</style>