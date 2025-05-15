<template>
  <div
    class="message-output p-4 bg-accent rounded-2 d-flex gap-2 align-items-center"
  >
    <button class="border-0 bg-transparent" @click="emit('remove')">
      <svg
        width="14"
        height="15"
        viewBox="0 0 14 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.0008 6.08603L12.3041 0.78273L13.7183 2.19694L8.41501 7.50024L13.7183 12.8035L12.3041 14.2178L7.0008 8.91446L1.69749 14.2178L0.283281 12.8035L5.58658 7.50024L0.283281 2.19694L1.69749 0.78273L7.0008 6.08603Z"
          fill="#2C674D"
        />
      </svg>
    </button>
    <div class="top d-flex flex-column">
      <span>{{ message?.text }}</span>
      <span v-if="message" class="text-sm text-muted"
        >({{ message?.createdAtDate + " / " + message?.createdAtTime }})</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from "../models/Message";

const emit = defineEmits<{
  remove: [];
}>();

defineProps<{
  message?: Message;
}>();
</script>
