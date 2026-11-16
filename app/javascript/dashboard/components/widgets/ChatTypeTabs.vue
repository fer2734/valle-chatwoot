<script setup>
import { computed } from 'vue';
import { useKeyboardEvents } from 'dashboard/composables/useKeyboardEvents';
import wootConstants from 'dashboard/constants/globals';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  activeTab: {
    type: String,
    default: wootConstants.ASSIGNEE_TYPE.ME,
  },
});

const emit = defineEmits(['chatTabChange']);

const activeTabIndex = computed(() => {
  return props.items.findIndex(item => item.key === props.activeTab);
});

const onTabChange = selectedTabIndex => {
  if (selectedTabIndex >= 0 && selectedTabIndex < props.items.length) {
    const selectedItem = props.items[selectedTabIndex];
    if (selectedItem.key !== props.activeTab) {
      emit('chatTabChange', selectedItem.key);
    }
  }
};

const keyboardEvents = {
  'Alt+KeyN': {
    action: () => {
      if (props.activeTab === wootConstants.ASSIGNEE_TYPE.ALL) {
        onTabChange(0);
      } else {
        const nextIndex = (activeTabIndex.value + 1) % props.items.length;
        onTabChange(nextIndex);
      }
    },
  },
};

useKeyboardEvents(keyboardEvents);
</script>

<template>
  <woot-tabs
    :index="activeTabIndex"
    class="w-full px-4 mt-1 py-1 h-12 md:mt-0 md:px-3 md:py-0 md:h-10 [&_ul]:gap-2 [&_ul]:overflow-x-auto [&_ul]:p-0 [&_ul]:scrollbar-none"
    @change="onTabChange"
  >
    <woot-tabs-item
      v-for="(item, index) in items"
      :key="item.key"
      class="shrink-0 whitespace-nowrap text-sm [&_a]:rounded-full [&_a]:px-4 [&_a]:font-medium"
      :index="index"
      :name="item.name"
      :count="item.count"
      is-compact
    />
  </woot-tabs>
</template>
