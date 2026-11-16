<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAccount } from 'dashboard/composables/useAccount';
import Auth from 'dashboard/api/auth';
import Button from 'dashboard/components-next/button/Button.vue';

const emit = defineEmits(['openMenu']);
const route = useRoute();
const router = useRouter();
const { accountScopedRoute } = useAccount();

const links = computed(() => [
  {
    label: 'SIDEBAR.TODAY',
    icon: 'i-lucide-sun',
    names: ['account_overview_reports'],
    to: accountScopedRoute('account_overview_reports'),
  },
  {
    label: 'SIDEBAR.CHATS',
    icon: 'i-lucide-message-circle',
    names: [
      'home',
      'inbox_conversation',
      'conversation_through_inbox',
      'conversations_through_label',
      'conversation_through_mentions',
      'conversation_through_participating',
      'conversation_through_unattended',
    ],
    to: accountScopedRoute('home'),
  },
  {
    label: 'SIDEBAR.AGENDA',
    icon: 'i-lucide-calendar-days',
    names: ['conversation_agenda', 'conversation_through_agenda'],
    to: accountScopedRoute('conversation_agenda'),
  },
  {
    label: 'SIDEBAR.CONTACTS',
    icon: 'i-lucide-users-round',
    names: ['contacts_dashboard_index', 'contacts_dashboard_active'],
    to: accountScopedRoute(
      'contacts_dashboard_index',
      {},
      { page: 1, search: undefined }
    ),
  },
]);

const isActive = item => item.names.includes(route.name);
const navigate = target => router.push(target);
const openSearch = () => document.querySelector('ninja-keys')?.open();
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-n-weak bg-n-surface-2 px-4 md:hidden"
  >
    <button
      class="flex min-w-0 items-center gap-2.5 text-left"
      :aria-label="$t('SIDEBAR.TODAY')"
      @click="navigate(accountScopedRoute('account_overview_reports'))"
    >
      <span
        class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-n-teal-9 text-sm font-bold text-white"
      >
        VA
      </span>
      <span class="min-w-0 leading-tight">
        <span class="block truncate text-sm font-bold text-n-slate-12">
          VALLE AUTOMOTORES
        </span>
        <span class="block text-[0.65rem] font-medium tracking-[0.16em] text-n-slate-11">
          CRM
        </span>
      </span>
    </button>
    <div class="flex items-center gap-1">
      <Button
        icon="i-lucide-search"
        :aria-label="$t('SIDEBAR.SEARCH')"
        slate
        ghost
        sm
        @click="openSearch"
      />
      <Button
        icon="i-lucide-log-out"
        :aria-label="$t('SIDEBAR_ITEMS.LOGOUT')"
        slate
        ghost
        sm
        @click="Auth.logout()"
      />
    </div>
  </header>

  <nav
    class="fixed inset-x-0 bottom-0 z-30 grid grid-cols-6 border-t border-n-weak bg-n-surface-2 px-1 pb-[env(safe-area-inset-bottom)] md:hidden"
    :aria-label="$t('SIDEBAR.CHATS')"
  >
    <button
      v-for="item in links"
      :key="item.label"
      class="flex min-w-0 flex-col items-center justify-center gap-1 py-2 text-[0.65rem] font-medium transition-colors"
      :class="isActive(item) ? 'text-n-blue-11' : 'text-n-slate-11'"
      :aria-current="isActive(item) ? 'page' : undefined"
      @click="navigate(item.to)"
    >
      <span :class="[item.icon, 'size-5']" aria-hidden="true" />
      <span class="truncate">{{ $t(item.label) }}</span>
    </button>
    <button
      class="flex min-w-0 flex-col items-center justify-center gap-1 py-2 text-[0.65rem] font-medium text-n-slate-11"
      @click="emit('openMenu')"
    >
      <span class="i-lucide-kanban size-5" aria-hidden="true" />
      <span class="truncate">{{ $t('SIDEBAR.SALES_NAV') }}</span>
    </button>
    <button
      class="flex min-w-0 flex-col items-center justify-center gap-1 py-2 text-[0.65rem] font-medium text-n-slate-11"
      @click="emit('openMenu')"
    >
      <span class="i-lucide-ellipsis size-5" aria-hidden="true" />
      <span class="truncate">{{ $t('SIDEBAR.MORE') }}</span>
    </button>
  </nav>
</template>
