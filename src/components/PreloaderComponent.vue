<template>
    <v-card>
        <v-card-text>
            <v-progress-linear :model-value="status == 'complete' ? 100 : progress" height="25" color="light-blue">
                <template v-slot:default="{ value }">
                    <strong>{{ Math.ceil(value) }}%</strong>
                </template>
            </v-progress-linear>
            <div class="d-flex justify-center mt-1" v-if="complete==true || progress>=100">
                Audio & image file loading complete! Please click 'CONTINUE' to begin/resume the experiment
            </div>
            <div class="d-flex justify-center mt-1">
                <v-btn @click="next" :disabled="status != 'complete'" color="primary">Click to Continue
                    <v-icon>chevron_right</v-icon>
                </v-btn>
            </div>

            <v-alert v-if="errors && errors.length > 0" color="warning" icon="error" class="mt-4">
                <p v-for="(error, errorKey) in errors" :key="errorKey">
                    {{ error }}
                </p>
            </v-alert>
        </v-card-text>
    </v-card>
</template>

<script setup>
import UsePreload from "@/composables/UsePreload.js";
import * as Tone from 'tone';
const { progress, loadItems, status } = UsePreload();
import {ref} from "vue";

const emit = defineEmits(["continue"]);

const errors = ref([]);

const startPreload = async () => {
    let items;
    let manifest;

    try {
        const fetchList = await fetch("manifest.json");
        manifest = await fetchList.json();    
    } catch (error) {
        errors.value.push("Could not load manifest! Try refreshing the browser or contact the experiment if this problem persists");
        return null
    }
   

    try {
        await loadItems(manifest);
    } catch (error) {
        errors.value.push("Could not preload some items! Try refreshing the browser or contact the experiment if this problem persists");
        return null;
    }
    return (items);
}

const next = async () => {
    Tone.start()
    emit("continue")
}

defineExpose({ startPreload });

</script>