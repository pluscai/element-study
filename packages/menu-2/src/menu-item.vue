<template>
    <li class="el-menu-item"
       role="menuitem"
       tabindex="-1" 
      :style="[paddingStyle]"
      :class="{
        'is-active': active,
        'is-disabled': disabled
      }"
      @click="handleClick"
      @mouseenter="onMouseEnter"
      @focus="onMouseEnter"
      @blur="onMouseLeave"
      @mouseleave="onMouseLeave"
    >
        <slot></slot>
    </li>
</template>

<script>
  import Menu from './menu-mixin';
  import Emitter from 'element-ui/src/mixins/emitter';
  export default {
    name: 'SxMenuItem',

    componentName: 'SxMenuItem',

    mixins: [Menu, Emitter],

    props: {
      index: {
        default: null, 
        validator: val => typeof val === 'string' || val === null
      },
      disabled: Boolean
    },

    computed: {
      active() {
        return this.index === this.rootMenu.activeIndex;
      },
      hoverBackground() {
        return this.rootMenu.hoverBackground
      },
      backgroundColor() {
        return this.rootMenu.backgroundColor || '';
      },
    },

    methods: {
      onMouseEnter() {
        this.$el.style.backgroundColor = this.hoverBackground;
      },
      onMouseLeave() {
        this.$el.style.backgroundColor = this.backgroundColor;
      },
      handleClick() {
        if(!this.disabled) {
          this.dispatch('SxMenu','item-click',this);
          // this.$emit('click', this);
        }
      }
    },

    mounted () {
      console.log("this==cc",this);
    }
  }
</script>

<style>
  .el-menu-item:hover, .el-menu-item:focus {
    outline: none;
    background-color: #ecf5ff;
}
</style>