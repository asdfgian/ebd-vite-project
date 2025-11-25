<template>
    <div class="h-full px-16 py-5">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-gray-800">Contratos</h2>
            <button class="px-4 py-2 bg-orange-ebd text-white rounded hover:bg-orange-500 cursor-pointer">
                + Nuevo
            </button>
        </div>
        <div class="flex gap-3 pb-3 flex-wrap pr-4">
            <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-orange-ebd pl-4 pr-4">
                <p class="text-white text-sm font-medium leading-normal">Proveedor</p>
            </div>
            <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-orange-ebd pl-4 pr-4">
                <p class="text-white text-sm font-medium leading-normal">Estado</p>
            </div>
            <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-orange-ebd pl-4 pr-4">
                <p class="text-white text-sm font-medium leading-normal">Start Date</p>
            </div>
            <div class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-orange-ebd pl-4 pr-4">
                <p class="text-white text-sm font-medium leading-normal">End Date</p>
            </div>
        </div>

        <div class="overflow-x-auto shadow-2xl sm:rounded-lg max-h-[500px] overflow-y-auto">
            <table class="w-full text-sm text-left rtl:text-right text-black">
                <thead class="text-xs text-white uppercase bg-orange-ebd">
                    <tr>
                        <th scope="col" class="px-6 py-3">Titulo</th>
                        <th scope="col" class="px-6 py-3">Proveedor</th>
                        <th scope="col" class="px-6 py-3">Monto (S/)</th>
                        <th scope="col" class="px-6 py-3">Fecha de inicio</th>
                        <th scope="col" class="px-6 py-3">Fecha de vencimiento</th>
                        <th scope="col" class="px-6 py-3">Estado</th>
                        <th class="px-6 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between py-2 px-3">
                <span class="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    Mostrando
                    <span class="font-semibold text-gray-900">0</span>
                </span>
            </nav>
        </div>
    </div>
</template>

<script setup></script>