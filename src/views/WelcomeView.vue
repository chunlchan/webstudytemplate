<template>
  <v-container>
    <h1>Welcome</h1>
    <p>Instructions here</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eligendi enim, vero ipsum cum voluptatem, ex
      molestiae nesciunt distinctio fugiat beatae voluptatum dicta, et quaerat. Libero beatae eius sint ullam?</p>
    <v-btn color="primary mt-4" @click="next" :disabled="store.pid == null || store.pid == ''">Next
      <v-icon>chevron_right</v-icon></v-btn>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useStore } from "@/stores/store.js"
import Swal from "sweetalert2";
const router = useRouter();
const route = useRoute();
const store = useStore();

onMounted(async () => {
  if (route.query.pid == null || route.query.pid == "") {
    store.pid = null;
    Swal.fire({
      title: 'Missing participant ID',
      icon: 'error',
      text: 'Try reloading the page or contact the experimenter if this error persists.'
    })
    return;
  }

  try {
    const f = await fetch("list.json");
    store.list = await f.json();
  } catch (error) {
    Swal.fire({
      title: 'Error loading list',
      icon: 'error',
      text: 'Try reloading the page or contact the experimenter if this error persists.'
    })
    return;
  }

  store.pid = route.query.pid

})

const next = () => {
  router.push("/consent");

}
</script>