<template>
  <BModal
    v-model="modalVisible"
    no-backdrop
    no-header
    no-footer
    no-close-on-backdrop
    centered
    content-class="custom-modal"
  >
    <div
      class="modal-inner-container d-flex flex-column gap-4 overfwlow-hidden"
    >
      <MessageOutput :message="currentMessage" @remove="removeFromAllowed" />
      <MessageList
        :messages="messages"
        :current="currentMessage"
        :allowedMessageIndexes="allowedMessages"
        @add="addToAllowed"
      />
      <MessageCreationInput
        v-model="newMessageText"
        @submit="() => onCreateMessage(newMessageText)"
      />
    </div>
  </BModal>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

import MessageOutput from "./components/MessageOutput.vue";
import MessageList from "./components/MessageList.vue";
import MessageCreationInput from "./components/MessageCreationInput.vue";

import { Message } from "./models/Message";
import { useLoopMessages } from "./composables/useLoopMessages";

const modalVisible = ref(false);
const newMessageText = ref("");
let interval: ReturnType<typeof setInterval>;

const {
  current: currentMessage,
  allowedMessages,
  messages,
  next,
  addMessage,
  addToAllowed,
  removeFromAllowed,
} = useLoopMessages();

const onCreateMessage = (messageText: string) => {
  const message = new Message({ id: messages.value.length, text: messageText });
  addToAllowed(message.id);
  addMessage(message);
  newMessageText.value = "";
};

const init = () => {
  for (let i = 0; i < 3; i++) {
    onCreateMessage(`Message number ${i}`);
  }

  interval = setInterval(() => {
    next();
  }, 1000);
};

onMounted(() => {
  init();

  setTimeout(() => {
    modalVisible.value = true;
  }, 300);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>
