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
    dataConfig: null,
    menu: []
});

export default function useSpreadSheet() {

    const menu = computed(() => state.menu);
    const data = computed(() => state.data);
    const dataConfig = computed(() => state.dataConfig);

    /**
     * Gets the menu items.
     * @return {Promise<void>}
     */
    async function getMenu() {
        f7.preloader.show();
        const url = 'api/getMenu';
        try {
            const result = await axios.get(url);
            f7.preloader.hide();
            if (result.data && result.data.menu) {
                state.menu = result.data.menu;
            }
            return state.menu;
        } catch(ex) {
            console.log('getMenu error', ex);
            f7.preloader.hide();
            notify('Error', 'Could not get menu items from server');
            throw (ex);
        }
    }

    /**
     * Reads the spreadsheet as specified on the server.
     * @param [filename] The filename.
     * @return {Promise<void>}
     */
    async function readFile(filename) {
        f7.preloader.show();
        const url = 'api/readFile';
        const params = {
            filename : filename ? filename : ''
        }

        try {
            const result = await axios.get(url, {params});
            f7.preloader.hide();
            if (result.data) {
                state.data = result.data.data;
                state.dataConfig = processConfig(result.data.config);
            }
            return state.data;
        } catch (ex) {
            console.log('readFile error', ex);
            f7.preloader.hide();
            notify('Error', 'Could not read data from server');
            throw (ex);
        }
    }

    /**
     * Process the data config.
     * @param config The config.
     * @return {*}
     */
    function processConfig(config) {
        if (!config.fields) {
            return config;
        }
        const fieldsMap = {};
        config.fields.forEach(field => {
            fieldsMap[field.name] = field;
        });
        config['fieldsMap'] = fieldsMap;
        return config;
    }

    return {
        menu,
        data,
        dataConfig,
        getMenu,
        readFile
    }
}