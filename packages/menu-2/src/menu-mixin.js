export default {
    inject: ['rootMenu'],
    computed: {
        indexPath() {
            const path = [this.index];
            return path;
        },
        paddingStyle() {
            let padding = 20;
            let parent = this.$parent;

            while(parent && parent.$options.componentName !== 'SxMenu') {
                if(parent.$options.componentName === 'SxSubmenu') {
                    padding += 20;
                }
                parent = parent.$parent;
            }
            return {paddingLeft: padding + 'px'};
        }
    }
}