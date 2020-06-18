<template>
  <div ref="notify" class="vant-notify" :class="`vant-notify-${type}`">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'VantNotify',
    props: {
      // 调用此组件是会使用v-model指令，那么默认是用value获取指令绑定的值，
      // 对此有疑问的可以去看vue官方文档
      value: {
          type: Boolean,
          required: true,
      },
      // 指定notify框的停留时间
      duration: {
          type: Number,
          default: 3000,
      },
      // 提示类型
      type: {
          type: String,
          default: 'danger',
      },
    },
    data() {
      return {
          hidden: false,
      }  
    },
    watch:{
      value(val) {
        // 只有当value值为true时才需要弹出notify框
        if (val) {
          this.$refs.notify.style.display = 'block'
          this.transition()
        }
      },
    },
    mounted() {
      this.init()
      if (!this.value) {
        this.$refs.notify.style.display = 'none'
        return
      }
      this.transition()
    },
    beforeDestroy() {
      this.$refs.notify.removeEventListener('transitionend', this.bindTransitionEnd, false)
    },
    methods: {
      sleep(time) {
        return new Promise((resolve) => {
          window.setTimeout(() => {
            resolve()
          }, time)
        })  
      },
      init() {
        this.bindTransitionEnd = this.transitionEnd.bind(this)
        this.$refs.notify.addEventListener('transitionend', this.bindTransitionEnd, false)
      },
      transitionEnd() {
        // 注意会触发两次
        // 第一次是notify框进入页面，第二次是notify框离开页面
        if (!this.hidden) return
        this.$refs.notify.style.display = 'none'
        this.$emit('input', false)
      },
      async transition() {
        // 如果不延迟的话看不到notify框进入页面时过渡效果
        await this.sleep(20)
        this.hidden = false
        this.$refs.notify.style.transform = 'translateY(0)'
        await this.sleep(this.duration)
        this.hidden = true
        this.$refs.notify.style.transform = 'translateY(-100%)'
      },
    },
  }
</script>