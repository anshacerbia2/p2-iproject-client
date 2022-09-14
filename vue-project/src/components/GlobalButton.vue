<template>
  <button class="custom-btn-1" :type="btnType">{{ btnName }} <span class="material-symbols-outlined">{{ btnIcon ?
  btnIcon : '' }}</span></button>
</template>

<script>
export default {
  props: ['btnType', 'btnName', 'btnIcon'],
}
</script>