<template>
  <!-- <div :class="$style['message-input']"> -->
  <BForm class="d-flex flex-row align-items-end justify-content-between gap-2 flex-wrap" @submit.prevent="emit('submit')">
    <!-- <BFormInput id="input-1" v-model.trim="inputModel" type="text" placeholder="Enter message" required />
    <div class="col-lg-3 my-2"> -->
    <fieldset class="flex-grow-1">
      <legend>Новое сообщение</legend>
      <input v-model.trim="inputModel" class="custom-new-message-input"/>
    </fieldset>
    <BButton type="submit" variant="success" class="custom-button">Отправить</BButton>
    <!-- </div> -->
  </BForm>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const inputModel = defineModel<string>();

const emit = defineEmits<{
  submit: [];
}>();
</script>

<style lang="scss" module>
.message-input {
  // display: flex;
}
</style>
