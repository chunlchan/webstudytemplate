import Preload from 'preload-it';
import { ref } from "vue";

const preload = Preload();

export default function UsePreload() {
    const progress = ref(0);
    const status = ref(null);
    
    const loadItems = (items) => {
        let prm = new Promise((resolve, reject) => {
            status.value = "loading";
            preload.fetch(items).then(() => {
                status.value = "complete";
                resolve();
            }).catch((error) => {
                reject(error);
            });

            preload.onerror = (error) => {
                reject(error);
            }
        })
        return prm;
    }

    preload.onprogress = (event) => {
        progress.value = event.progress;
    }

    const getItem = (itemUrl) => {
        try {
            let blobUrl = preload.getItemByUrl(itemUrl).blobUrl;
            return blobUrl;
        } catch {
            return null;
        }

    }

    return { progress, loadItems, getItem, status }
}