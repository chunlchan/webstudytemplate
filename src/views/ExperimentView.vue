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
            <div class="d-flex flex-column align-center elevation-1 pa-2 mb-2 rounded">
                <h1>{{ store.currentItem?.sentence }}</h1>
                <v-btn variant="outlined" :disabled="isPlaying" @click="play">Play <v-icon>play_circle_filled</v-icon></v-btn>     
            </div>
            <img :src="getItem('stimuli/' + store.currentItem?.image)"/>       
            <v-radio-group v-model="rating" inline class="mt-4" hide-details="">
                <v-radio label="1" value="1" class="mr-4"></v-radio>
                <v-radio label="2" value="2" class="mr-4"></v-radio>
                <v-radio label="3" value="3" class="mr-4"></v-radio>
                <v-radio label="4" value="4" class="mr-4"></v-radio>
                <v-radio label="5" value="5" class="mr-4"></v-radio>
            </v-radio-group>
            <v-btn @click="next" :disabled="rating==null || isPlaying" class="mt-2" color="primary">next <v-icon>chevron_right</v-icon></v-btn>
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
import UsePlaySound from "@/composables/UsePlaySound";
import { useStore } from "@/stores/store.js"
import UsePreload from "@/composables/UsePreload.js";
const { getItem } = UsePreload(); 

//uncomment here to save to firebase
/*
import { getDatabase, ref as dbRef, child, serverTimestamp, push } from "firebase/database";
*/

const router = useRouter();
const state = ref('fixation');
const {wait} = UseWait();
const store = useStore();

onMounted(async ()=>{
    await preloaderComponent.value.startPreload();
    await wait(250);//wait 250ms before displaying stimuli
    state.value = 'stimuli'
})


const progress = computed(() => store.index + 1 + "/" + store.list.length)

const rating = ref(null);

const { playSoundAsync, isPlaying } = UsePlaySound();
const play = async () => {

    //await playSoundAsync(getItem("sounds/" + store.currentItem.sentence_recording), 1, 0)
    await playSoundAsync(getItem("stimuli/" + store.currentItem?.audio, 1, 0));
}

const next = async () => {
    //uncomment here to save to firebase
    //note that firebase realtime database rules will need to be configured appropriately
    /*
    if(store?.currentItem){
        let dataToSave = {};
        dataToSave.currentItem = store.currentItem;
        dataToSave.rating = rating.value;
        dataToSave.timestamp = serverTimestamp();
        let rtdbRef = child(dbRef(getDatabase()), "/data/" + store.pid + "/");
        push(rtdbRef, dataToSave);
    }
    */
    rating.value = null;

    if(store.nextItem() == "end"){
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
    if (store.index == null) {
        store.index = -1;
    } else {
        store.index--
    }    
/*     if (store.index == null) {
        store.index = -1;
    } else {
        store.index--
    } */
    next();
}
</script>
