<template>
  <RouterLink
    :to="{ name: 'create' }"
    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >Create Note</RouterLink
  >
  <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click.prevent="logout">Logout</button>

  <div class="relative overflow-x-auto">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      v-if="notes"
    >
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">#</th>
          <th scope="col" class="px-6 py-3">Note</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          v-for="note in notes"
          :key="note.id"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ note.id }}
          </th>
          <td class="px-6 py-4">{{ note.content }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No notes found</p>
  </div>
</template>
<script lang="ts" setup>
import type INotes from '@/interfaces/INotes'
import router from '@/router'
import useAuthStore from '@/stores/auth'
import { ref, type Ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const store = useAuthStore()

const notes: Ref<Array<INotes>> = ref([])
onMounted(async () => {
  notes.value = await store.getNotes()
})

const logout = () => {
  store.logout()
  router.push({ name: 'login' })
}
</script>
