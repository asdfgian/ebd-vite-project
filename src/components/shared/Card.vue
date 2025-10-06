<template>
    <div class="bg-orange-ebd/10 border border-orange-ebd rounded-md p-4 flex flex-col justify-between w-full">
        <div>
            <h3 class="text-sm text-gray-600 font-semibold">{{ title }}</h3>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ value }}</p>
        </div>
        <span class="text-green-600 text-sm font-semibold mt-1">{{ growth }}</span>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    value: String,
    growth: String,
});
</script>
