<template>
  <v-container>
    <div v-for="(page, index) in pages" v-bind:key="index">
      <slot :name="page" v-if="page == currentPage">
        <p>default instructions message</p>
      </slot>
    </div>
    <v-row class="mt-10" :justify="buttonRowJustify">
      <v-btn @click="prevPage()" class="mr-5" :disabled="currentPage == 0"
        ><v-icon>chevron_left</v-icon> Back</v-btn
      >
      <v-btn @click="nextPage()">Next <v-icon>chevron_right</v-icon></v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "InstructionsComponent",
  props: {
    numberOfPages: { type: Number, required: true },
    buttonRowJustify: { type: String, required: false, default: "start" },
  },
  setup(props, { emit }) {
    const pages = ref([]);
    const currentPage = ref(0);

    onMounted(() => {
      pages.value = [];
      currentPage.value = 0;
      for (var k = 0; k < props.numberOfPages; k++) {
        pages.value.push(k);
      }
    });

    const nextPage = () => {
      currentPage.value += 1;
      if (currentPage.value >= props.numberOfPages) {
        currentPage.value -= 1;
        emit("instructions-complete");
      }
    };

    const prevPage = () => {
      currentPage.value -= 1;
    };

    return { pages, nextPage, currentPage, prevPage };
  },
};
</script>