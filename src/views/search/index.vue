<template>
  <div class="searchgood">
    <div class="searchgoodcontainer">
      <ul class="search_list_box">
        <li
          v-for="(item, index) in searchlist"
          :key="index"
          class="seachs_item"
          @click="searchgoodlist(item)"
        >
          <div class="list_box_img"><img :src="item.img_list[0]" alt="" /></div>
          <div class="secrch_title">
            {{ item.title }}
          </div>
          <div>
            <span class="searach_indrand text-overflow">
              {{ item.introduce }}
            </span>
          </div>
          <div class="secarchs_price">
            <span>￥{{ item.price }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { select_product } from "../../api/select_product";
export default {
  data() {
    return {
      searchlist: [],
    };
  },
  created() {
    select_product({ keyword: this.$route.query.keyword }).then((res) => {
      console.log(res.data);
      this.searchlist = res.data;
    });
  },
  methods: {
    searchgoodlist(item) {
      console.log(item);
    },
  },
};
</script>

<style>
.searchgoodcontainer {
  width: 80%;
  margin: 20px auto;
}
.searchgoodlist {
  width: 30%;
  display: flex;
  height: 300px;
}
.search_list_box {
  display: flex;
  flex-flow: row wrap;
  padding: 0 30px;
}
.list_box_img > img {
  height: 280px;
  width: 320px;
}
.seachs_item {
  width: 360px;
  padding: 10px 30px;
}
.text-overflow {
  width: 80%;
  /* 超出内容隐藏 单行打点  */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.secrch_title {
  color: #000;
  font-weight: 900;
  font-size: 22px;
  padding-bottom: 10px;
}
.secarchs_price {
  padding-top: 10px;
}
.secarchs_price > span {
  font-weight: 900;
  font-size: 24px;
  color: red;
}
.searach_indrand {
  font-size: 12px;
    color: #ccc;
}
</style>