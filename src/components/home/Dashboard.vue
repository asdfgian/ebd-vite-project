<template>
    <div class="h-[calc(100vh-4rem)] px-16 py-4">
        <div class="bg-white w-full h-full overflow-y-auto p-4 rounded-md space-y-6">

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card v-for="(card, index) in cards" :key="index" :title="card.title" :value="card.value"
                    :growth="card.growth" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div
                    class="bg-orange-ebd/10 border border-orange-ebd rounded-md p-4 h-64 flex items-center justify-center">
                    <span class="text-gray-500">[ Gráfica: Monthly Contract Amount Trends ]</span>
                </div>
                <div
                    class="bg-orange-ebd/10 border border-orange-ebd rounded-md p-4 h-64 flex items-center justify-center">
                    <span class="text-gray-500">[ Gráfica: Device Status ]</span>
                </div>
                <div
                    class="bg-orange-ebd/10 border border-orange-ebd rounded-md p-4 h-64 flex items-center justify-center">
                    <span class="text-gray-500">[ Gráfica: Spending by Supplier ]</span>
                </div>
            </div>

            <div class="mt-6">
                <table class="w-full text-sm text-left text-black">
                    <thead class="text-xs text-white uppercase bg-orange-ebd">
                        <tr>
                            <th scope="col" class="px-6 py-3">Brand Country</th>
                            <th scope="col" class="px-6 py-3">Equipment Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(country, index) in countries" :key="index"
                            class="bg-white border-b border-gray-200 hover:bg-gray-200">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {{ country.name }}
                            </th>
                            <td class="px-6 py-4 text-gray-700">
                                {{ country.count }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</template>

<script setup>
import Card from '../shared/Card.vue';

const cards = [
    { title: "Órdenes de compra", value: "350", growth: "+5%" },
    { title: "Dispositivos Activos", value: "875", growth: "+15%" },
    { title: "Proveedores Registrador", value: "50", growth: "+20%" },
];

const countries = [
    { name: "USA", count: 250 },
    { name: "Germany", count: 150 },
    { name: "Japan", count: 120 },
    { name: "China", count: 100 },
    { name: "Other", count: 25 },
];
</script>