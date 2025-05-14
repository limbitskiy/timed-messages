import { ref } from "vue";

export const useLoopMessages = () => {
  const currentId = ref<number | null>(null);
  const messages = ref([]);
  const allowedMessages = ref(new Set());

  const addMessage = (message) => {
    messages.value.push(message);

    if (!currentId.value) {
      currentId.value = message.id;
    }
  };

  const addToAllowed = (messageId: number) => {
    allowedMessages.value.add(messageId);
  };

  const removeFromAllowed = (messageId: number) => {
    allowedMessages.value.delete(messageId);
  };

  const next = (idx) => {
    const currentIdx = messages.value.findIndex((msg) => msg.id === currentId);

    const nextMessage = messages.value[currentIdx + 1];

    if (allowedMessages.value.has(nextMessage.id)) {
      next();
    }
    //   allowedMessageIndexes.value.sort();
    //   const currentx = allowedMessageIndexes.value.findIndex((id) => id === current.value);
    //   const nextMessageIdx = allowedMessageIndexes.value[currentx + 1] ?? allowedMessageIndexes.value[0];
    //   console.log("🚀 ~ interval=setInterval ~ nextMessageIdx:", nextMessageIdx);
    //   current.value = nextMessageIdx;
  };

  return {
    current,
    loop,
    add,
    remove,
    next,
  };
};
