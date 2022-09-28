<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" @select="handleSelect" style="width:200px;">
      <el-menu-item index="1">Processing Center</el-menu-item>
      <el-submenu index="2">
        <template slot="title">Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>Info</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">Orders</a></el-menu-item>
    </el-menu>

    <hr>
    <sx-menu :default-active="activeIndex" class="el-menu-demo"  @select="handleSelect"  style="width:200px;">
      <sx-menu-item index="1">Processing Center</sx-menu-item>
      <sx-submenu index="2">
          <template slot="title">Workspace</template>
          <sx-menu-item index="2-1">item one</sx-menu-item>
          <sx-menu-item index="2-2">item two</sx-menu-item>
          <sx-menu-item index="2-3">item three</sx-menu-item>
          <sx-submenu index="2-4">
            <template slot="title">item four</template>
            <sx-menu-item index="2-4-1">item one</sx-menu-item>
            <sx-menu-item index="2-4-2">item two</sx-menu-item>
            <sx-menu-item index="2-4-3">item three</sx-menu-item>
            <sx-submenu index="2-4-4">
            <template slot="title">item four</template>
            <sx-menu-item index="2-4-4-1">item one</sx-menu-item>
            <sx-menu-item index="2-4-4-2">item two</sx-menu-item>
            <sx-menu-item index="2-4-4-3">item three</sx-menu-item>
          </sx-submenu>
          </sx-submenu>
      </sx-submenu>
      <sx-menu-item index="3" disabled>Info</sx-menu-item>
      <sx-menu-item index="4"><a href="https://www.ele.me" target="_blank">Orders</a></sx-menu-item>
    </sx-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
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
