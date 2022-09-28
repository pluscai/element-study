<script>
  /* eslint-disable */
export default {
  name: 'SxMenu',

  methods: {
    openMenu(index, indexPath) {
      this.openedMenus.push(index);
      
    },
    closeMenu(index) {
      const i = this.openedMenus.indexOf(index);
      if( i !== -1) {
        this.openedMenus.splice(i, 1);
      }
    },
    handleSubmenuClick(submenu) {
      const { index, indexPath } = submenu;
      let isOpened = this.openedMenus.indexOf(index) !== -1;
      // 判断菜单是否展开
      // this.closeMenu(index);

      if(isOpened) {
        this.closeMenu(index);
      } else {
        this.openMenu(index)
      }
    },
    handleItemClick(item) {
      this.activeIndex = item.index;

      this.$emit('select', index, indexPath, item);
    }
  },

  render(h) {
    const component = (
      <ul
        role="menubar"
        class={{
          'el-menu': true
        }}
      >
        {this.$slots.default}
      </ul>
    );
    return component;
  },
  componentName: 'SxMenu',

  provide() {
    return {
      rootMenu: this
    }
  },
  props: {
    defaultActive: {
      type: String,
      default: ''
    },
    collapse: Boolean,
    backgroundColor: String
  },
  data() {
    return {
      activeIndex: this.defaultActive,
      openedMenus: []
    }
  },
  computed: {
    hoverBackground() {
      return this.backgroundColor ? this.mixColor(this.backgroundColor, 0.2) : '';
    }
  },
  mounted() {
    this.$on('submenu-click', this.handleSubmenuClick);
    this.$on('item-click',this.handleItemClick)
  }

}
</script>