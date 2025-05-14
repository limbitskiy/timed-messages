<template>
  <BForm
    class="d-flex flex-row align-items-end justify-content-between gap-2 flex-wrap"
    @submit.prevent="emit('submit')"
  >
    <fieldset class="flex-grow-1">
      <legend>Новое сообщение</legend>
      <input v-model.trim="inputModel" class="custom-new-message-input" />
    </fieldset>
    <BButton type="submit" variant="success" class="custom-button">Отправить</BButton>
  </BForm>
</template>

<script setup lang="ts">
const inputModel = defineModel<string>();

const emit = defineEmits<{
  submit: [];
}>();
</script>

<style lang="scss" module></style>
