<template>
<div>
  <!-- <div class="infinite-list" style="overflow:auto">
      <ul  v-infinite-scroll="load">
        <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
      </ul>
  </div> -->

 <ul  v-infinite-scroll="load" class="infinite-list" style="overflow:auto" infinite-scroll-immediate="false" a=1 infinite-scroll-distance="25" infinite-scroll-delay="200" infinite-scroll-disabled="false" >
        <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
      </ul>
  <hr>

</div>

</template>
<script>
export default {
  data() {
    return {
      count: 10,
    };
  },
  methods: {
    load () {
        this.count += 2
      },
  }
}
</script>

<style>
.infinite-list {
    height: 300px;
    padding: 0;
    margin: 0;
    list-style: none;
}
.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: #e8f3fe;
    margin: 10px;
    color: #7dbcfc;
}
</style>
