import { defineProps } from "vue";

export const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});
