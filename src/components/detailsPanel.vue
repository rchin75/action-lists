<template>
    <f7-page>
        <f7-navbar v-bind:title="(selectedRow && dataConfig) ? selectedRow[dataConfig.fields[0].name] : ''">
            <f7-nav-right>
                <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-list>
            <f7-list-item
                v-for="(field, index) in getFields()" :key="index"
                v-bind:header="field.name"
                v-bind:title="selectedRow ? format(selectedRow[field.name], field.type ): ''"
            ></f7-list-item>
        </f7-list>
    </f7-page>
</template>
<script>
    import useSpreadSheet from "../model/useSpreadSheet";
    import { formatDate, formatTime } from "../filters";
    const {dataConfig} = useSpreadSheet();

    export default {
        name: 'details-panel',
        props: ['selectedRow'],
        setup() {

            /**
             * Gets the available fields.
             * @return {*[]|*}
             */
            function getFields() {
                if (dataConfig.value && dataConfig.value.fields) {
                    return dataConfig.value.fields;
                }
                return [];
            }

            /**
             * Formats a value.
             * @param value Value.
             * @param type Type.
             * @return {*}
             */
            function format(value, type) {
                let formatted;
                switch (type) {
                    case 'DATE':
                        formatted = formatDate(new Date(value));
                        break;
                    case 'TIME':
                        formatted = formatTime(new Date(value));
                        break;
                    default:
                        formatted = value;
                }
                return formatted;
            }

            return {
                dataConfig,
                getFields,
                format
            }
        }
    }
</script>