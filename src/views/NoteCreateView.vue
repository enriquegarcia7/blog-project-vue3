<template>
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Write my Note</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST">
      <div>
        <label for="text" class="block text-sm font-medium leading-6 text-gray-900">My Note</label>
        <div class="mt-2">
          <input id="text" name="text" type="post" autocomplete="post" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="note" >
        </div>
      </div>
      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click.prevent="sendNote" >Save</button>
      </div>
    </form>
  </div>
  <p class="text-gray-600 text-center text-base mt-4">{{ feedback }}</p>
</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import useAuthStore from '@/stores/auth';
import router from '@/router';

const feedback = ref('')
const store = useAuthStore()
const note = ref('')

const sendNote = async () => {
  const response = await store.createNote(note.value)
  if (response == false) {
    feedback.value = 'Error...'
  } else {
    router.push({ name: 'notes' })
    feedback.value = 'Note saved'
  }
}

</script>