<template>
  <ul class="message-list d-flex flex-column gap-2 bg-secondary p-4 rounded-2 flex-grow-1">
    <li v-for="message in messages" :key="message.id" class="d-flex gap-2">
      <button
        class="border-0 bg-transparent"
        :class="{ hidden: allowedMessageIndexes.has(message.id) }"
        @click="emit('add', message.id)"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.00053 3.39983L8.20046 0.199896L9.80043 1.79986L6.60049 4.9998L9.80043 8.19973L8.19977 9.80039L4.99984 6.60046L1.7999 9.80039L0.199934 8.20042L3.39987 5.00049L0.199934 1.80055L1.80059 0.199896L5.00053 3.39983Z"
            fill="#2B312C"
          />
        </svg>
      </button>
      <div class="top d-flex flex-column">
        <span>{{ message.text }}</span>
        <span class="text-sm text-muted">({{ message.createdAtDate + " / " + message.createdAtTime }})</span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Message } from "../models/Message";

const emit = defineEmits<{
  add: [messageId: number];
}>();

defineProps<{
  messages: Message[];
  allowedMessageIndexes: Set<number>;
}>();
</script>
