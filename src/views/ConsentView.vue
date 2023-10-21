<template>
  <v-container>
    <h1>Consent Form</h1>
    <p>This is study is supported by Northwestern University</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eligendi enim, vero ipsum cum voluptatem, ex
      molestiae nesciunt distinctio fugiat beatae voluptatum dicta, et quaerat. Libero beatae eius sint ullam?</p>
    <p>If you agree to proceed, please click 'I consent'</p>
    <p>Otherwise, click 'I do not consent'</p>
    
      <v-btn @click="agree" color="success" class="mr-2 mt-4">I Consent <v-icon>check_circle</v-icon></v-btn>
      <v-btn @click="disagree" color="error" class="mt-4">I Do Not Consent <v-icon>cancel</v-icon></v-btn>
  </v-container>
</template>

<script setup>
import {useRouter } from 'vue-router'
const router = useRouter();



const agree = () => {
  router.push("/experiment")
}

const disagree = () => {
  alert("You may now close the browser");
}
</script>