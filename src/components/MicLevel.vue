<template>
  <v-container fluid>
    <v-row align="start" class="mb-1" justify="center">
      <v-icon style="color:red" class="mb-5">mic</v-icon>
      <div
        style="width:100%;height:10px;border:1px solid black"
        v-bind:style="{'background':'linear-gradient(90deg, rgba(0,0,0,1)' +  volume + '%, rgba(255,255,255,0) ' +  volume + '%)'}"
      >
        <!--<v-icon v-if="gainIndicator==true" style="width:120%;color:red;font-size: 40px !important">arrow_drop_up</v-icon>-->
      </div>
    </v-row>
    <v-row align="start" class="">
      <div style="width:50%;height:10px;border-right:1px solid white;background-color:#FA6800"/> 
      <div style="width:50%;height:10px;background-color:#7AD61D"/> 
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MicLevel",
  props: {
      volume: Number,
      gainIndicator: {
          type:Boolean,
          default: false
      }
  }
  
};
</script>
