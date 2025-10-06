<script setup>
import MovementForm from '../shared/MovementForm.vue';
</script>
<template>
    <div class=" px-16 py-4">
        <div class="grid grid-rows-[5rem_1fr] grid-cols-3 gap-4 h-full">
            <div class="col-span-3">
                <div class="w-full h-full bg-white rounded-lg shadow-md flex items-center">
                    <MovementForm />
                </div>
            </div>

            <!-- Tabla -->
            <div class="col-span-2 row-start-2">
                <div class="w-full max-h-[46.5rem] bg-white rounded-lg shadow-md p-5 flex flex-col">
                    <div class="flex justify-end mb-2">
                        <button class="px-4 py-2 bg-orange-ebd text-white rounded hover:bg-orange-500 cursor-pointer">
                            + Nuevo
                        </button>
                    </div>

                    <div class="overflow-y-auto flex-1">
                        <table class="w-full text-sm text-left rtl:text-right text-black">
                            <thead class="text-xs text-white uppercase bg-orange-ebd sticky top-0 z-10">
                                <tr>
                                    <th scope="col" class="px-6 py-3">Nombre</th>
                                    <th scope="col" class="px-6 py-3">Serie</th>
                                    <th scope="col" class="px-6 py-3">Empleado actual</th>
                                    <th scope="col" class="px-6 py-3">Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b border-gray-200 hover:bg-gray-200">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        device.name
                                    </th>
                                    <td class="px-6 py-4">device.series</td>
                                    <td class="px-6 py-4"> device.employee_name</td>
                                    <td class="px-6 py-4">
                                        <a
                                            class="font-medium text-orange-ebd hover:underline cursor-pointer">Detalles</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- Detalles -->
            <div class="col-start-3 row-start-2">
                <div class="w-full h-full bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 justify-center">
                    <!-- Título -->
                    <h2 class="text-center text-2xl font-bold text-blue-ebd">deviceDetails.name</h2>

                    <!-- Info general -->
                    <div class="grid grid-cols-2 gap-4 text-gray-700 text-sm">
                        <div class="bg-gray-100 p-3 rounded-lg">
                            <p class="font-semibold">Tipo:</p>
                            <span>deviceDetails.type</span>
                        </div>
                        <div class="bg-gray-100 p-3 rounded-lg">
                            <p class="font-semibold">Serie:</p>
                            <span> deviceDetails.series </span>
                        </div>
                        <div class="col-span-2 bg-gray-100 p-3 rounded-lg">
                            <p class="font-semibold">Descripción:</p>
                            <span> deviceDetails.description</span>
                        </div>
                        <div class="col-span-2 bg-gray-100 p-3 rounded-lg">
                            <p class="font-semibold">Estado:</p>
                            <span> deviceDetails.status</span>
                        </div>
                    </div>

                    <!-- Línea de tiempo con scroll -->
                    <div class="flex-1 overflow-y-auto max-h-64 mt-2 pr-2">
                        <ol class="relative border-s-2 border-blue-ebd space-y-6">
                            <li class="ms-4">
                                <div class="absolute w-3 h-3 bg-blue-ebd rounded-full mt-1.5 -start-1.5"></div>
                                <time class="block text-sm text-gray-400"> movement.date </time>
                                <div class="flex gap-2">
                                    <h3 class="text-base font-semibold text-gray-800">movement.typeMovement.name
                                    </h3>
                                    <div class="
                    relative
                    before:content-[attr(data-tip)]
                    before:absolute
                    before:px-3 before:py-2
                    before:top-1/2 before:left-full before:ml-2
                    before:w-max before:max-w-28
                    before:-translate-y-1/2
                    before:text-white before:bg-gray-800 before:text-[12px]
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
                                                stroke-width="1.5" stroke="currentColor" class="size-5">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <p class="text-sm text-gray-600"> movement.observations</p>
                                <p class="text-sm font-bold text-orange-ebd">
                                    Origen:
                                    <span class="font-normal text-gray-600"> movement.employeeOrigin.name</span>
                                    <svg class="w-7 h-7 fill-current inline-block" viewBox="0 0 25 25"
                                        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                                        </g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                d="M7.96967 12.5303C8.26256 12.8232 8.73744 12.8232 9.03033 12.5303C9.32322 12.2374 9.32322 11.7626 9.03033 11.4697L7.96967 12.5303ZM5.53033 7.96967C5.23744 7.67678 4.76256 7.67678 4.46967 7.96967C4.17678 8.26256 4.17678 8.73744 4.46967 9.03033L5.53033 7.96967ZM5 7.75C4.58579 7.75 4.25 8.08579 4.25 8.5C4.25 8.91421 4.58579 9.25 5 9.25V7.75ZM19 9.25C19.4142 9.25 19.75 8.91421 19.75 8.5C19.75 8.08579 19.4142 7.75 19 7.75V9.25ZM4.46967 7.96967C4.17678 8.26256 4.17678 8.73744 4.46967 9.03033C4.76256 9.32322 5.23744 9.32322 5.53033 9.03033L4.46967 7.96967ZM9.03033 5.53033C9.32322 5.23744 9.32322 4.76256 9.03033 4.46967C8.73744 4.17678 8.26256 4.17678 7.96967 4.46967L9.03033 5.53033ZM16.0303 11.4697C15.7374 11.1768 15.2626 11.1768 14.9697 11.4697C14.6768 11.7626 14.6768 12.2374 14.9697 12.5303L16.0303 11.4697ZM18.4697 16.0303C18.7626 16.3232 19.2374 16.3232 19.5303 16.0303C19.8232 15.7374 19.8232 15.2626 19.5303 14.9697L18.4697 16.0303ZM19 16.25C19.4142 16.25 19.75 15.9142 19.75 15.5C19.75 15.0858 19.4142 14.75 19 14.75V16.25ZM5 14.75C4.58579 14.75 4.25 15.0858 4.25 15.5C4.25 15.9142 4.58579 16.25 5 16.25V14.75ZM19.5303 16.0303C19.8232 15.7374 19.8232 15.2626 19.5303 14.9697C19.2374 14.6768 18.7626 14.6768 18.4697 14.9697L19.5303 16.0303ZM14.9697 18.4697C14.6768 18.7626 14.6768 19.2374 14.9697 19.5303C15.2626 19.8232 15.7374 19.8232 16.0303 19.5303L14.9697 18.4697ZM9.03033 11.4697L5.53033 7.96967L4.46967 9.03033L7.96967 12.5303L9.03033 11.4697ZM5 9.25H19V7.75H5V9.25ZM5.53033 9.03033L9.03033 5.53033L7.96967 4.46967L4.46967 7.96967L5.53033 9.03033ZM14.9697 12.5303L18.4697 16.0303L19.5303 14.9697L16.0303 11.4697L14.9697 12.5303ZM19 14.75H5V16.25H19V14.75ZM18.4697 14.9697L14.9697 18.4697L16.0303 19.5303L19.5303 16.0303L18.4697 14.9697Z"
                                                fill="#ffffff"></path>
                                        </g>
                                    </svg>
                                    Destino: <span class="font-normal text-gray-600">
                                        movement.employeeDestination.name </span>
                                </p>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Form register device -->
    <div class="hidden fixed inset-0 bg-gray-800 opacity-95 flex justify-center items-center z-60">
        <div class="relative bg-blue-ebd rounded-lg shadow-sm">
            <div
                class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Registrar Nuevo Dispositivo
                </h3>
                <button type="button"
                    class="text-white bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-blue-950"
                    data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <form class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2">
                        <label for="category"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del
                            Producto</label>
                        <select
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option>Selecciona un Producto</option>
                            <option>name</option>
                        </select>
                    </div>
                    <div class="col-span-1">
                        <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo</label>
                        <input type="text" formControlName="type"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Ejemplo: Switch" required="">
                    </div>
                    <div class="col-span-1">
                        <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Serie</label>
                        <input type="text" formControlName="series"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Ejemplo: CS9300A1Z8X" required="">
                    </div>
                    <div class="col-span-1">
                        <label for="category" class="block mb-2 text-sm font-medium text-white">Estado</label>
                        <select
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option value="">Selecciona un estado</option>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                            <option value="mantenimiento">Mantenimiento</option>
                        </select>
                    </div>
                    <div class="col-span-1">
                        <label for="description" class="block mb-2 text-sm font-medium  text-white">
                            ID Contratro</label>
                        <input type="number" formControlName="idContract"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="A-1" required="">
                    </div>
                </div>
                <button type="submit"
                    class="text-white inline-flex items-center bg-orange-ebd cursor-pointer rounded-lg text-sm px-5 py-2.5 text-center">
                    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                    Guardar
                </button>
            </form>
        </div>

    </div>
</template>