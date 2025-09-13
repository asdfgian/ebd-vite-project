<script setup></script>
<template>
    <nav
        class="w-full h-20 flex items-center justify-between px-4 sm:px-8 md:px-16 bg-white">
        <h6 class="text-2xl font-bold text-blue-ebd">EBD Perú</h6>

        <!-- desktop -->
        <div class="hidden md:flex items-center">
            <form class="flex items-center max-w-sm mx-auto w-full">
                <input type="text"
                    class="text-gray-900 text-sm rounded-l-lg block w-[16rem] p-2.5 bg-white focus:ring-2 focus:ring-orange-ebd outline-none transition-all"
                    placeholder="Buscar..." required />
                <button type="submit"
                    class="p-3 text-sm font-medium bg-orange-ebd text-white rounded-r-lg hover:bg-orange-500 transition-colors">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </button>
            </form>
        </div>

        <!-- buscador en mobile -->
        <div class="flex md:hidden">
            <button class="p-2 text-blue-ebd hover:text-orange-ebd transition">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-4-4m0-7a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </button>
        </div>
    </nav>
</template>