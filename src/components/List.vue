<template>
  <div :for="id">{{name}}</div>
</template>
<script>
export default {
props: {
  name: {required: true, type: String},
  id: {required: true, type: String}
  }
}
</script>
