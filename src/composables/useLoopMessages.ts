import { ref } from "vue";

export const useLoopMessages = () => {
  const current = ref(null);
  const messages = ref([]);
  const allowedMessages = ref(new Set());

  const addMessage = (message) => {
    messages.value.push(message);

    if (!current.value) {
      current.value = message;
    }
  };

  const addToAllowed = (messageId: number) => {
    allowedMessages.value.add(messageId);

    if (!current.value) {
      const message = messages.value.find((msg) => msg.id === messageId);
      current.value = message;
    }
  };

  const removeFromAllowed = () => {
    if (current.value) {
      allowedMessages.value.delete(current.value.id);
    }
  };

  const next = () => {
    if (!messages.value) {
      console.error(`No messages in queue`);
      return;
    }

    if (!allowedMessages.value.size) {
      console.warn(`No items to loop over`);
      current.value = null;
      return;
    }

    const startIdx = messages.value.findIndex((msg) => msg.id === current.value.id);
    const length = messages.value.length;

    for (let i = 1; i < length; i++) {
      const idx = (startIdx + i) % length;
      const message = messages.value[idx];

      if (allowedMessages.value.has(message.id)) {
        current.value = message;
        break;
      }
    }
  };

  return {
    addMessage,
    next,
    addToAllowed,
    removeFromAllowed,
    allowedMessages,
    current,
    messages,
  };
};
