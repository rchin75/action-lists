<template>
    <f7-page name="home">
        <!-- The NavBar -->
        <f7-navbar title="Action Lists">
            <f7-nav-right>
                <f7-link icon-f7="bars" popover-open=".popover-menu"></f7-link>
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

    </f7-page>
</template>
<script>
    import {ref} from "vue";
    import { onMounted } from 'vue';
    import useAuthentication from "../model/useAuthentication";
    import useSpreadSheet from "../model/useSpreadSheet";
    const {logout, initializeLogin} = useAuthentication();
    const {readFile, data, dataConfig} = useSpreadSheet();

    /** True to open the details popup. */
    const popupOpened = ref(false);

    export default {
        components: {},
        props: {
            f7router: Object
        },
        setup(props) {
            onMounted(() => {
                console.log('mounted!');
                initializeLogin(()=>{
                    // Initialize data
                    readFile();
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
            }

            return {
                onLogout,
                popupOpened,
                data,
                dataConfig,
                getDataValue,
                onOpen
            };
        }
    }
</script>
<style scoped>
    .page {
        background-color: #333333;
    }
</style>