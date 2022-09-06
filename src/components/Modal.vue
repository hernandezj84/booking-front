<template>
  <div :class="isLoading ? 'modal-custom' : 'modal-custom hidden'">
    <div class="container">
      <div class="body">
        <div class="spinner-grow text-primary" role="status">
          <!-- <span class="sr-only">Loading...</span> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
<style scoped>
.modal-custom {
  background-color: rgba(0, 0, 0, 0.4); /* Transparent dimmed overlay */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
  animation: fadeIn ease 2s;
  -webkit-animation: fadeIn ease 2s;
  z-index: 1050;
}

.modal-custom.hidden {
  display: none;
  animation: fadeIn ease 2s;
  -webkit-animation: fadeIn ease 2s;
}
.modal-custom .container {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  width: 200px;
}

.modal-custom .body {
  display: inline-block;
}
</style>
