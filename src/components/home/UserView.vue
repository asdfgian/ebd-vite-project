<script setup></script>
<template>
    <div class="h-full px-16 py-5">
        <div class="overflow-x-auto shadow-2xl sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-black">
                <thead class="text-xs text-white uppercase bg-orange-ebd">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Nombre de usuario
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Departamento
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Estado
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Rol
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Accion
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b border-gray-200 hover:bg-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            hola
                        </th>
                        <td class="px-6 py-4">
                            nose
                        </td>
                        <td class="px-6 py-4">
                            sdd
                        </td>
                        <td class="px-6 py-4 text-green-600 font-bold">
                            Activo
                        </td>
                        <td class="px-6 py-4 flex items-center">
                            <p>
                                dfvmdfov
                            </p>
                            <div class="
              relative
              before:content-[attr(data-tip)]
              before:absolute
              before:px-3 before:py-2
              before:top-1/2 before:left-full before:ml-2
              before:w-max before:max-w-28
              before:-translate-y-1/2
              before:text-white before:bg-gray-800
              before:rounded-md before:opacity-0
              before:transition-all before:z-50

              after:absolute
              after:top-1/2 after:left-full after:ml-[1px]
              after:h-0 after:w-0
              after:-translate-y-1/2 after:border-8
              after:border-l-gray-800
              after:border-t-transparent
              after:border-b-transparent
              after:border-r-transparent
              after:opacity-0
              after:transition-all after:z-50

              hover:before:opacity-100 hover:after:opacity-100
            ">
                                <span class="cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg>
                                </span>
                            </div>

                        </td>
                        <td class="px-6 py-4">
                            <a class="font-medium text-orange-ebd hover:underline cursor-pointer">Editar</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between py-2 px-3">
                <span class="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">Mostrando
                    <span class="font-semibold text-gray-900">1-10</span> de <span
                        class="font-semibold text-gray-900">{{ 10 }}</span>
                </span>
                <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <button type="button"
                            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-white bg-orange-ebd border border-orange-ebd rounded-s-lg hover:bg-gray-100 hover:text-gray-700">Previo</button>
                    </li>
                    <li>
                        <a href="#"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                    </li>
                    <li>
                        <a href="#"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page"
                            class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                    </li>
                    <li>
                        <a href="#"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                    </li>
                    <li>
                        <a href="#"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                    </li>
                    <li>
                        <button type="button"
                            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-white bg-orange-ebd border border-orange-ebd rounded-r-lg hover:bg-gray-100 hover:text-gray-700">Siguiente</button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>

</template>