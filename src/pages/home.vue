<template>
    <f7-page name="home">
        <!-- The NavBar -->
        <f7-navbar>
            <f7-nav-left>
                <f7-link icon-f7="bars" panel-open="left"></f7-link>
            </f7-nav-left>
            <f7-nav-title v-bind:title="(dataConfig && dataConfig.title) ? dataConfig.title : 'Action Lists'"></f7-nav-title>
            <f7-nav-right>
                <f7-link icon-f7="ellipsis_vertical" popover-open=".popover-menu"></f7-link>
            </f7-nav-right>
        </f7-navbar>

        <!-- The NavBar menu -->
        <f7-popover class="popover-menu">
            <f7-list>
                <f7-list-item link="/about/" popover-close title="About"></f7-list-item>
                <f7-list-item link="#" @click="onLogout" popover-close title="Logout"></f7-list-item>
            </f7-list>
        </f7-popover>

        <!-- Page content -->
        <f7-list media-list>
            <f7-list-item
                    v-for="(row,index) in data" :key="index"
                    v-bind:title="getDataValue('title', row)"
                    v-bind:subtitle="getDataValue('subtitle', row)"
                    v-bind:footer="getDataValue('footer', row)"
                    v-bind:text="getDataValue('text', row)"
                    v-bind:after="getDataValue('after', row)"
                    @click="onOpen(row)"
                    link="#">
            </f7-list-item>
        </f7-list>

        <!-- A popup with file details. -->
        <f7-popup theme-dark color-theme="orange"
                  class="row-details-popup"
                  :opened="popupOpened"
                  @popup:closed="popupOpened = false">
            <details-panel v-bind:selected-row="selectedRow"></details-panel>
        </f7-popup>

        <!-- Left resizable Panel with Reveal effect -->
        <f7-panel left reveal resizable theme-dark color-theme="orange">
            <f7-view>
                <left-panel></left-panel>
            </f7-view>
        </f7-panel>
    </f7-page>
</template>
<script>
    import {ref} from "vue";
    import { onMounted } from 'vue';
    import useAuthentication from "../model/useAuthentication";
    import useSpreadSheet from "../model/useSpreadSheet";
    import DetailsPanel from "../components/detailsPanel";
    import LeftPanel from "../components/leftPanel";
    const {logout, initializeLogin} = useAuthentication();
    const {getMenu, readFile, data, dataConfig} = useSpreadSheet();

    /** True to open the details popup. */
    const popupOpened = ref(false);

    /** The selected row. */
    const selectedRow = ref(null);

    export default {
        components: {LeftPanel, DetailsPanel},
        props: {
            f7router: Object
        },
        setup(props) {
            onMounted(() => {
                console.log('mounted!');
                initializeLogin(()=>{
                    // Initialize data
                    getMenu().then((menu)=>{
                        // Open the first menu item if specified.
                        // Otherwise the server will fall back to the default file.
                        readFile(menu && menu.length > 0 ? menu[0].file : null);
                    }).catch(()=>{
                        readFile();
                    })
                }, ()=>{
                    props.f7router.navigate('/login');
                })
            });

            /**
             * Logout.
             */
            function onLogout() {
                logout().then(()=>{
                    props.f7router.navigate('/login');
                });
            }

            /**
             * Gets the data value.
             * @param type Type.
             * @param row Data row.
             * @return {null|*}
             */
            function getDataValue(type, row) {
                const card = dataConfig.value.card;
                if (Object.prototype.hasOwnProperty.call(card, type)) {
                    return row[card[type]];
                }
                return null;
            }

            /**
             * On open row.
             * @param row The selected row to open.
             */
            function onOpen(row) {
                console.log('onOpen', row);
                selectedRow.value = row;
                popupOpened.value = true;
            }

            return {
                onLogout,
                popupOpened,
                data,
                dataConfig,
                getDataValue,
                onOpen,
                selectedRow
            };
        }
    }
</script>
<style scoped>
    .page {
        background-color: #333333;
    }
</style>