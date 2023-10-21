<template>
  <v-container>
    <h1>Welcome</h1>
    <p>Instructions here</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eligendi enim, vero ipsum cum voluptatem, ex
      molestiae nesciunt distinctio fugiat beatae voluptatum dicta, et quaerat. Libero beatae eius sint ullam?</p>
    <v-btn color="primary mt-4" @click="next">Next <v-icon>chevron_right</v-icon></v-btn>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';
import {useRouter, useRoute } from 'vue-router'
import { useStore } from "@/stores/store.js"
const router = useRouter();
const route = useRoute();
const store = useStore();

onMounted(() => {
  window.onbeforeunload = function () {
    return "Are you sure you want to leave?";
  };

  if (route.query.pid == null || route.query.pid == "") {
    //show error message
    alert("missing participant ID")
    return;
  } else {
    store.pid = route.query.pid
  }
})

const next = () => {
  router.push("/consent")

}
</script>