<template>
  <BModal v-model="modalVisible" no-backdrop centered content-class="custom-modal">
    <MessageOutput :message="currentMessage" />
    <MessageList :messages="messages" :allowedMessageIndexes="allowedMessageIndexes" @remove="onRemoveMessage" />
    <MessageCreationInput v-model="newMessageText" @submit="onCreateMessage" />
  </BModal>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

import MessageOutput from "./components/MessageOutput.vue";
import MessageList from "./components/MessageList.vue";
import MessageCreationInput from "./components/MessageCreationInput.vue";

import { Message } from "./models/Message";

const modalVisible = ref(true);
const messages = ref<Message[]>([]);
const currentMessageId = ref<number | null>(null);
const allowedMessageIndexes = ref<number[]>([]);

const newMessageText = ref("");
const idCounter = ref(0);
let interval: ReturnType<typeof setInterval>;

const currentMessage = computed(() => messages.value.find((msg) => msg.id === currentMessageId.value));

const onCreateMessage = () => {
  const newMessage = createNewMessage(newMessageText.value);
  messages.value.push(newMessage);
  allowedMessageIndexes.value.push(newMessage.id);
  newMessageText.value = "";
};

const onRemoveMessage = (messageId: number) => {
  if (allowedMessageIndexes.value.includes(messageId)) {
    allowedMessageIndexes.value = allowedMessageIndexes.value.filter((id) => id !== messageId);
    return;
  }
  allowedMessageIndexes.value.push(messageId);
};

const createNewMessage = (messageText: string) => {
  return new Message({ id: ++idCounter.value, text: messageText });
};

const init = () => {
  for (let i = 0; i < 6; i++) {
    const message = createNewMessage(`Message number ${i}`);
    allowedMessageIndexes.value.push(message.id);
    messages.value.push(message);
  }
  currentMessageId.value = messages.value[0].id;
};

const cycleMessages = () => {
  interval = setInterval(() => {
    allowedMessageIndexes.value.sort();

    const currentMessageIdx = allowedMessageIndexes.value.findIndex((id) => id === currentMessageId.value);

    const nextMessageIdx = allowedMessageIndexes.value[currentMessageIdx + 1] ?? allowedMessageIndexes.value[0];
    currentMessageId.value = nextMessageIdx;
  }, 1000);
};

onMounted(() => {
  init();
  cycleMessages();
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style lang="scss" module></style>
