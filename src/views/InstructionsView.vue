<template>
    <v-container>
        <InstructionsComponent :numberOfPages="4" @instructions-complete="next()">
            <template #0>
                <p>Welcome</p>
                <p>Some instructions here</p>
            </template>
            <template #1>
                <p>Example</p>
                <p>More instructions here</p>
            </template>
            <template #2>
                <p>Example 2</p>
                <p>Even more instructions here</p>
            </template>
            <template #3>
                <p>Example 3</p>
                <p>Yet more instructions</p>
            </template>
        </InstructionsComponent>
    </v-container>
</template>

<script setup>
import InstructionsComponent from "@/components/InstructionsComponent.vue";
import { useRouter } from "vue-router";
const router = useRouter();


const next = () => {
    router.push("/experiment");
};

</script>