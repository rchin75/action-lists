<template>
    <f7-page>
        <f7-navbar title="Menu"></f7-navbar>
        <f7-block-title>Contents:</f7-block-title>
        <f7-list>
            <f7-list-item
                    v-for="(item, index) in menu" :key="index"
                    v-bind:title="item.title"
                    panel-close="left"
                    @click="onOpen(item)"
                    link="#"
            ></f7-list-item>
        </f7-list>
    </f7-page>
</template>
<script>
    import useSpreadSheet from "../model/useSpreadSheet";
    const {menu, readFile} = useSpreadSheet();

    export default {
        name: 'left-panel',
        props: [],
        setup() {

            function onOpen(item) {
                console.log('Opening', item);
                readFile(item.file);
            }

            return {
                menu,
                onOpen
            }
        }
    }
</script>