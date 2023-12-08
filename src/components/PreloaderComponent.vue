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
        </v-card-text>
    </v-card>
</template>

<script setup>
import UsePreload from "@/composables/UsePreload.js";
import Swal from 'sweetalert2';
import * as Tone from 'tone';
const { progress, loadItems, status } = UsePreload();


const emit = defineEmits(["continue"]);

const startPreload = async () => {
    let items;
    const fetchList = await fetch("manifest.json");
    let manifest = await fetchList.json();
    if(manifest == null){
        Swal.fire({
            title: 'Could not load manifest',
            icon: 'error',
            text: 'Try refreshing the browser or contact the experiment if this problem persists',
        })
        return null;
    }

    try {
        await loadItems(manifest);
    } catch (error) {
        Swal.fire({
            title: 'Could not preload items',
            icon: 'error',
            text: 'Try refreshing the browser or contact the experiment if this problem persists',
        })
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