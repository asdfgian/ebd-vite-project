<script setup>
import AsideProfile from '../shared/AsideProfile.vue';
import Header from '../shared/Header.vue';
import Sidebar from '../shared/Sidebar.vue';

</script>

<template>
    <Sidebar></Sidebar>
    <div class="flex h-full">
        <div class="xl:ml-72 flex flex-col w-full h-screen">
            <Header></Header>
            <div class="flex-1 bg-gray-100">
                <router-view></router-view>
            </div>
        </div>
        <AsideProfile></AsideProfile> 
    </div>
</template>