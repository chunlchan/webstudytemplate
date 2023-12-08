<template>
    <v-container>
         
        <div class="d-flex flex-column align-center" v-if="state=='fixation'">
            <h1>+</h1>
        </div>
        
        <div class="d-flex flex-column align-center" v-else>
            <h3>How meaningful is this sentence?</h3>
            <div class="d-flex flex-column align-left">
                <p> 1 = This sentence doesn't make sense to me</p>
                <p> 5 = I completely understand this sentence</p>
            </div>
            <h1 class="elevation-2 pa-2 ma-2">{{ currentItem.sentence }}</h1>
            <img :src="getItem('stimuli/' + currentItem?.image)"/>            
            <v-radio-group v-model="rating" inline>
                <v-radio label="1" value="1" class="mr-4"></v-radio>
                <v-radio label="2" value="2" class="mr-4"></v-radio>
                <v-radio label="3" value="3" class="mr-4"></v-radio>
                <v-radio label="4" value="4" class="mr-4"></v-radio>
                <v-radio label="5" value="5" class="mr-4"></v-radio>
            </v-radio-group>
            <v-btn @click="next" :disabled="rating==null" color="primary" class="mt-4">next <v-icon>chevron_right</v-icon></v-btn>
            {{ progress }}
        </div>
    </v-container>
    <v-dialog v-model="preloaderDialog" persistent fullscreen>
        <PreloaderComponent ref="preloaderComponent" @continue="continueClicked" />
    </v-dialog>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import UseWait from "@/composables/UseWait.js"
import PreloaderComponent from "@/components/PreloaderComponent.vue";
//import { useStore } from "@/stores/store.js"
import UsePreload from "@/composables/UsePreload.js";
const { getItem } = UsePreload(); 
//import { getDatabase, ref as dbRef, child, serverTimestamp, push } from "firebase/database";


const router = useRouter();
const state = ref('fixation');
const {wait} = UseWait();
//const store = useStore();

onMounted(async ()=>{
    await preloaderComponent.value.startPreload();
    await wait(250);//wait 250ms before displaying stimuli
    state.value = 'stimuli'
})

const list = ref([
    {sentence:"The clown had a funny face", audio:"01_clown.mp3", image:"01_clown.jpg"},
    {sentence:"The theory should drag her home into the ocean.", audio:"01_clown.mp3", image:"02_ocean.jpg"},
    {sentence:"The house had nine rooms", audio:"01_clown.mp3", image:"03_house.jpg"},
    {sentence:"Her duplex would tutor a dubious truck.", audio:"01_clown.mp3", image:"04_truck.jpg"},
]);

const index = ref(0);

const currentItem = computed(() => list.value[index.value])

const progress = computed(() => index.value + 1 + "/" + list.value.length)

const rating = ref(null);

const next = async () => {
    //uncomment here to save to firebase
    //note that firebase realtime database rules will need to be configured appropriately
    /*
    let dataToSave = {};
    dataToSave.currentItem = currentItem.value;
    dataToSave.rating = rating.value;
    dataToSave.timestamp = serverTimestamp();
    let rtdbRef = child(dbRef(getDatabase()), "/data/" + store.pid + "/" + dataToSave);
    push(rtdbRef, dataToSave);
    */
    rating.value = null;

    index.value += 1;
    if (index.value >= list.value.length) {
        router.push("/end");
    } else {
        state.value = 'fixation'
        await wait(250);//wait 250ms before displaying stimuli
        state.value = 'stimuli'
    }
}


//preloader dialog
const preloaderDialog = ref(true)
const preloaderComponent = ref(null)
const continueClicked = () => {
    preloaderDialog.value = false;
    if (index.value == null) {
        index.value = -1;
    } else {
        index.value--
    }    
/*     if (store.index == null) {
        store.index = -1;
    } else {
        store.index--
    } */
    next();
}
</script>
