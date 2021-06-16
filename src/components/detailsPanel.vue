<template>
    <f7-page>
        <f7-navbar v-bind:title="getTitle()">
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
        setup(props) {

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

            /**
             * Gets the title.
             */
            function getTitle() {
                let title = 'Details';
                if (props.selectedRow && dataConfig) {
                    const selectedRow = props.selectedRow
                    const config = dataConfig.value;
                    if (config.mainField) {
                        title = selectedRow[config.fieldsMap[config.mainField].name];
                    } else if (config.fields && (config.fields.length > 0)){
                        title = selectedRow[config.fields[0].name];
                    }
                }
                return title;
            }

            return {
                dataConfig,
                getFields,
                format,
                getTitle
            }
        }
    }
</script>