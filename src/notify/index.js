import VantNotify from './index.vue'

const types = {
  success: 'success',
  primary: 'primary',
  warning: 'warning',
  danger: 'danger',
}

let hidden = false
// 这个变量是用来判断当前是否已有notify框进入页面
let pending = false
let id = null

function createElement() {
  if (createElement.el) return createElement.el
  const el = document.createElement('div')
  el.classList.add('vant-notify')
  el.addEventListener('transitionend', () => {
    if (!hidden) return
    pending = false
    el.style.display = 'none'
  })
  document.body.appendChild(el)
  return createElement.el = el
}

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)        
  })
}

async function transition(el, duration) {
  pending = true
  await sleep(20)
  hidden = false
  el.style.transform = 'translateY(0)'
  id = setTimeout(() => {
    hidden = true
    el.style.transform = 'translateY(-100%)'
  }, duration)
}

function notify({ type, message, duration = 3000 }) {
  const el = createElement()
  el.innerText = message
  const flag = Object.keys(types).some((key) => {
    if (el.classList.contains(`vant-notify-${key}`)) {
        el.classList.replace(`vant-notify-${key}`, `vant-notify-${type}`)
    }
    return false
  })
  if (!flag) el.classList.add(`vant-notify-${type}`)
  if (pending) {
    clearTimeout(id)
    id = setTimeout(() => {
      hidden = true
      el.style.transform = 'translateY(-100%)'
    }, duration)
    return
  }
  el.style.display = 'block'
  transition(el, duration)
}

// 使用Vue.use时会调用此方法，如果不熟悉的同学可以看vue官方文档关于use的使用
notify.install = function(Vue) {
  Vue.prototype.$notify = notify
  Vue.component('VantNotify', VantNotify)
}

export const Notify = notify