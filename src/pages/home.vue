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
        <f7-list>

        </f7-list>

    </f7-page>
</template>
<script>
    import {ref} from "vue";
    import { onMounted } from 'vue';
    import useAuthentication from "../model/useAuthentication";
    const {logout, initializeLogin} = useAuthentication();

    /** True to open the file details popup. */
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
                    // TODO Initialize data
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

            return {
                onLogout,
                popupOpened,
            };
        }
    }
</script>
<style scoped>
    .page {
        background-color: #333333;
    }
</style>