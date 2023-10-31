<template>
  <v-container>
    <h3>Mic Test</h3>
    <p>
      Speak naturally and adjust your microphone input levels so that the black
      bar below extends into the green area.
    </p>
    <p>
      If needed, increase the recording level in your microphone settings so the
      black bar reaches into the green region for most if not all of your
      utterance. Try lowering the recording level if the black bar stays at the
      far right end of the green region for most or all of your utterance.
    </p>
    <p>
      If you are unable to access your microphone, or if the volume meter below
      is not responding, please do NOT refresh your browser. Try reloading the
      experiment from Sona or contact the experimenter for assistance.
    </p>
    <p>
      Click on the buttons below for instructions on adjusting your microphone
      levels to obtain an optimal signal.
    </p>
    <v-btn color="blue-grey" dark text x-large>
      Windows 10
      <v-dialog v-model="dialog" width="500" activator="parent">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Windows Microphone Settings</v-card-title>
          <v-card-text>
            <ul class="mt-5">
              <li>
                Type "control panel" in the search box on the taskbar and then
                select Control Panel option
              </li>
              <li>Click on the "Sound" option.</li>
              <li>On the Hardware and Sound window, select the Sound option.</li>
              <li>
                Select the "Recording" tab. A list of recording devices are
                displayed. Right click on the microphone you are using to audio
                and then click on the Properties option.
              </li>
              <li>
                Select the "Level" tab. Adjust the microphone level accordingly.
              </li>
            </ul>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>

    <v-btn color="blue-grey" class="ml-4" text dark x-large>
      Mac OSX
      <v-dialog v-model="dialog2" width="500" activator="parent">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Macintosh Settings</v-card-title>
          <v-card-text>
            <ul class="mt-5">
              <li>Launch the "System Preferences" app.</li>
              <li>Select "Sound", then select the "Input" tab.</li>
              <li>Select your microphone from the device list.</li>
              <li>Adjust the "Input Volume" slider accordingly.</li>
            </ul>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog2 = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>

    <mic-level gain-indicator :volume="volume"></mic-level>
    <v-btn color="primary" @click="next()" class="mt-10">
      Next
      <v-icon>navigate_next</v-icon>
    </v-btn>
  </v-container>
</template>

<script setup>
import router from "../router";
import MicLevel from "@/components/MicLevel.vue";
import { onMounted, ref } from "vue";
import useRecorder from '@/composables/useRecorder';



const dialog = ref(false);
const dialog2 = ref(false);

const { startRecorder, stopRecorder, volume } = useRecorder();
onMounted(() => {
  startRecorder();
})

const next = () => {
  stopRecorder().then((blob) => {
    console.log(blob);
  })
  router.push("/audioTest");
};

</script>
