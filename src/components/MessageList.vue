<template>
  <ul class="message-list">
    <li
      v-for="message in messages"
      :key="message.id"
      :class="{ selected: !allowedMessageIndexes.includes(message.id) }"
    >
      <button @click="emit('remove', message.id)">X</button>
      <span>{{ message.text }}</span>
      <!-- <span>{{ message.id }}</span> -->
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Message } from "../models/Message";

const emit = defineEmits<{
  remove: [messageId: number];
}>();

defineProps<{
  messages: Message[];
  allowedMessageIndexes: number[];
}>();
</script>
