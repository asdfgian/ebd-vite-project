<script setup>
import AsideProfile from '../shared/AsideProfile.vue';
import Header from '../shared/Header.vue';
import Sidebar from '../shared/Sidebar.vue';

</script>

<template>
    <Sidebar></Sidebar>
    <div class="flex">
        <div class="xl:ml-72 flex flex-col w-full">
            <Header></Header>
            <div class="h-full bg-gray-100">
                <RouterView/>
            </div>
        </div>
        <AsideProfile></AsideProfile>
    </div>
</template>