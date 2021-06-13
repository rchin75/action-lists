import {reactive, computed} from 'vue';
import axios from "axios";
import {notify} from "../notifications";
import {f7} from "framework7-vue";

/**
 * Stores the current user.
 * @type {UnwrapNestedRefs<{user: null}>}
 */
const state = reactive({
    data: null,
    dataConfig: null
});

export default function useSpreadSheet() {

    const data = computed(() => state.data);
    const dataConfig = computed(() => state.dataConfig);

    async function readFile() {
        console.log('readFile');
        f7.preloader.show();
        const url = 'api/readFile';
        try {
            const result = await axios.get(url);
            console.log('readFile2', result.data);
            f7.preloader.hide();
            if (result.data) {
                state.data = result.data.data;
                state.dataConfig = result.data.config;
            }
            return state.data;
        } catch (ex) {
            console.log('readFile error', ex);
            f7.preloader.hide();
            notify('Error', 'Could not read data from server');
            throw (ex);
        }
    }

    return {
        data,
        dataConfig,
        readFile
    }
}