<script>
  import Emitter from 'element-ui/src/mixins/emitter';
  import menuMixin from './menu-mixin';
  import ElCollapseTransition from 'element-ui/src/transitions/collapse-transition';
  export default {
    name: 'SxSubmenu',

    componentName: 'SxSubmenu',

    mixins: [menuMixin, Emitter],

    components: { ElCollapseTransition },

    props: {
      index: {
        type: String,
        required: true
      }
    },

    computed: {
      opened() {
        return this.rootMenu.openedMenus.indexOf(this.index) > -1;
      },
    },

    methods: {
      handleClick() {
         // 显示子菜单
        this.dispatch('SxMenu', 'submenu-click', this);
      },
    },

    render(h) {
      const {
        opened,
        paddingStyle,
        $slots,
        rootMenu
      } = this;

      const inlineMenu = (
        <el-collapse-transition>
          <ul
            class="el-menu el-menu--inline"
            v-show={opened}
            >
            {$slots.default}
          </ul>
        </el-collapse-transition>
      );

      const submenuTitleIcon = 'el-icon-arrow-down'

      return (
        <li
          class={{
            "el-submenu": true,
            'is-opened': opened,
          }}
        >
          <div 
            class="el-submenu__title"
            on-click={this.handleClick}
            style={[paddingStyle]}
          >
            { $slots.title }
            <i class={[ 'el-submenu__icon-arrow',submenuTitleIcon ]}></i>
          </div>
          {inlineMenu}
        </li>
      )
    }
  }

</script>