import RecordRTC from 'recordrtc';
import * as Tone from 'tone';
import { ref } from "vue";

let recorder;
let stream;
export default function () {
    const getMicAccess = () => {
        let prm = new Promise((resolve, reject) => {
            if (recorder != null) {
                recorder.destroy();
            }
            if(stream == null){
                navigator.mediaDevices
                .getUserMedia({
                    audio: {
                        autoGainControl: false,
                        echoCancellation: false,
                        noiseSuppression: false,
                    },
                })
                .then((newStream) => {
                    stream = newStream;
                    initiateRecordRTC(stream);
                    resolve();
                })
                .catch(()=>{
                    reject();
                })
            } else {
                initiateRecordRTC(stream);
                resolve();
            }
            
        });
        return prm;
    };

    const initiateRecordRTC = (stream) => {
        recorder = RecordRTC(stream, {
            type: 'audio',
            recorderType: RecordRTC.StereoAudioRecorder,
            mimeType: 'audio/wav',
            numberOfAudioChannels: 1,
        });
        console.log('mic access success');

        //let track = stream.getAudioTracks();
        try {
            console.log(stream.getAudioTracks()[0].getConstraints());
            //console.log(navigator.mediaDevices.getSupportedConstraints())
        } catch (error) {
            console.log(error);
        }

    }

    const startRecorder = () => {
        getMicAccess().then(() => {
            recorder.startRecording();
            startMeter();
        })
    };


    const stopRecorder = () => {
        let prm = new Promise((resolve) => {
            recorder.stopRecording(()=>{
                resolve(recorder.getBlob());
            })
            stopMeter();
        })
        return prm
    };

    const meter = new Tone.Meter();
    const volume = ref(null);
    var int = null;
    const startMeter = () => {
        const mic = new Tone.UserMedia();
        Tone.context.resume();
        meter.normalRange = true;
        meter.channelCount = 1;
        meter.smoothing = 0.5;
        mic.open();
        mic.connect(meter);
        int = setInterval(() => {
            volume.value = meter.getValue() * 380
            //volume.value = Math.pow(10, (meter.getValue() * 10))
            //console.log(volume.value)
        }, 20);
    };

    const stopMeter = () => {
        clearInterval(int);
    };

    return { getMicAccess, startRecorder, stopRecorder, volume };
}
