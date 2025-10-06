<template>
    <div class="h-full px-16 py-5">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-gray-800">Proveedores</h2>
            <button @click="openCreate"
                class="px-4 py-2 bg-orange-ebd text-white rounded hover:bg-orange-500 cursor-pointer">
                + Nuevo
            </button>
        </div>

        <div v-if="loading">Cargando proveedores...</div>
        <div v-else-if="error" class="text-red-600">error</div>

        <div class="overflow-x-auto shadow-2xl sm:rounded-lg max-h-[500px] overflow-y-auto">
            <table class="w-full text-sm text-left rtl:text-right text-black">
                <thead class="text-xs text-white uppercase bg-orange-ebd">
                    <tr>
                        <th scope="col" class="px-6 py-3">Nombre</th>
                        <th scope="col" class="px-6 py-3">Email</th>
                        <th scope="col" class="px-6 py-3">Contacto</th>
                        <th scope="col" class="px-6 py-3">Estado</th>
                        <th class="px-6 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="provider in providers" :key="provider.ruc"
                        class="bg-white border-b border-gray-200 hover:bg-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ provider.name }}
                        </th>
                        <td class="px-6 py-4">{{ provider.email }}</td>
                        <td class="px-6 py-4">{{ provider.phone }}</td>
                        <td class="px-6 py-4" :class="provider.status == 'ACTIVO'
                            ? 'text-green-600 font-bold'
                            : 'text-red-600 font-bold'
                            ">{{ provider.status }}</td>
                        <td class="px-6 py-4 flex gap-4">
                            <a class="font-medium text-orange-ebd hover:underline cursor-pointer"
                                @click="openDetail(provider.id)">Ver detalle</a>
                            <a class="font-medium text-orange-ebd hover:underline cursor-pointer"
                                @click="openEdit(provider.id)">Editar</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between py-2 px-3">
                <span class="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    Mostrando
                    <span class="font-semibold text-gray-900">{{ providers.length }}</span>
                </span>
            </nav>
            <!--Crear-->
            <div v-if="showCreate" class="fixed inset-0 z-20 bg-gray-100/40 flex justify-center items-center">
                <div class="bg-blue-ebd p-6 rounded-lg shadow-lg max-w-lg w-full">
                    <form @submit.prevent="createProviderFn">
                        <!-- RUC con botón buscar -->
                        <div class="grid grid-cols-3 gap-2 mb-3">
                            <div class="col-span-2">
                                <label class="block text-sm text-white mb-1">RUC</label>
                                <input v-model="createForm.ruc" type="number"
                                    class="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 text-white"
                                    required />
                            </div>
                            <div class="flex items-end">
                                <button type="button" @click="searchByRuc"
                                    class="px-4 py-2 bg-orange-ebd text-white rounded hover:bg-orange-600 cursor-pointer">
                                    Buscar
                                </button>
                            </div>
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm text-white mb-1">Nombre</label>
                            <input v-model="createForm.name" type="text" disabled
                                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-500 text-white" />
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm text-white mb-1">Dirección</label>
                            <input v-model="createForm.address" type="text" disabled
                                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-500 text-white" />
                        </div>
                        <div class="grid grid-cols-3 gap-2 mb-2">
                            <div>
                                <label class="block text-sm text-white mb-1">Distrito</label>
                                <input v-model="createForm.district" type="text" disabled
                                    class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-500 text-white" />
                            </div>
                            <div>
                                <label class="block text-sm text-white mb-1">Provincia</label>
                                <input v-model="createForm.province" type="text" disabled
                                    class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-500 text-white" />
                            </div>
                            <div>
                                <label class="block text-sm text-white mb-1">Departamento</label>
                                <input v-model="createForm.department" type="text" disabled
                                    class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-500 text-white" />
                            </div>
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm text-white mb-1">Estado</label>
                            <input v-model="createForm.status" type="text" disabled
                                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-500 text-white" />
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm text-white mb-1">Email</label>
                            <input v-model="createForm.email" type="email"
                                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 text-white" />
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm text-white mb-1">Teléfono</label>
                            <input v-model="createForm.phone" type="tel"
                                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 text-white" />
                        </div>
                        <div class="mt-4 flex justify-end gap-3">
                            <button type="button" @click="showCreate = false"
                                class="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer">
                                Cancelar
                            </button>
                            <button type="submit"
                                class="px-4 py-2 bg-orange-ebd text-white rounded cursor-pointer hover:bg-orange-600">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <!-- Detalle -->
            <div v-if="showDetail" class="fixed inset-0 z-20 bg-gray-100/40 flex justify-center items-center">
                <div class="bg-blue-ebd p-6 rounded-lg shadow-lg max-w-lg w-full">
                    <h2 class="text-xl font-bold mb-4 text-white">
                        Detalle del Proveedor
                    </h2>
                    <p class="text-white"><strong>RUC:</strong> {{ detail.ruc }}</p>
                    <p class="text-white"><strong>Nombre:</strong> {{ detail.name }}</p>
                    <p class="text-white">
                        <strong>Direccion:</strong>
                        {{ detail.address }}
                    </p>
                    <p class="text-white"><strong>Distrito:</strong> {{ detail.district }}</p>
                    <p class="text-white"><strong>Departamento:</strong> {{ detail.department }}</p>
                    <p class="text-white"><strong>Estado:</strong> {{ detail.status }}</p>
                    <p class="text-white"><strong>Email:</strong> {{ detail.email }}</p>
                    <p class="text-white"><strong>Telefono:</strong> {{ detail.phone }}</p>

                    <div class="mt-4 flex justify-end">
                        <button @click="showDetail = false"
                            class="px-4 py-2 bg-orange-ebd text-white rounded cursor-pointer">
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
            <!-- Editar -->
            <div v-if="showEdit" class="fixed inset-0 z-20 bg-gray-100/40 flex justify-center items-center">
                <div class="bg-blue-ebd p-6 rounded-lg shadow-lg max-w-lg w-full">
                    <form>
                        <div class="mb-2">
                            <label class="block text-sm text-white mb-2">Email</label>
                            <input type="text"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                required="" />
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm text-white mb-2">Telefono</label>
                            <input type="text"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                required="" />
                        </div>
                        <div class="mt-4 flex justify-end gap-3">
                            <button type="button" @click="showEdit = false"
                                class="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer">
                                Cancelar
                            </button>
                            <button type="submit" class="px-4 py-2 bg-orange-ebd text-white rounded cursor-pointer">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {
    getProviderByRuc,
    createProvider,
    getAllProviders,
    getProviderDetailById
} from "../../services/ProviderService";

const providers = ref([]);
const showDetail = ref(false);
const loading = ref(true);
const error = ref("");
const showEdit = ref(false);
const detail = ref(null);
const showCreate = ref(false);
const createForm = ref({
    ruc: "",
    name: "",
    address: "",
    district: "",
    province: "",
    department: "",
    status: "",
    email: "",
    phone: "",
});

onMounted(async () => {
    try {
        const response = await getAllProviders();
        providers.value = response.data;
    } catch (err) {
        error.value = err.response?.data?.message || "Error al cargar proveedores";
    } finally {
        loading.value = false;
    }
});

const openCreate = () => {
    showCreate.value = true;
};

const searchByRuc = async () => {
    try {
        const response = await getProviderByRuc(createForm.value.ruc);
        const data = response.data;

        createForm.value.name = data.socialReason;
        createForm.value.address = data.address;
        createForm.value.district = data.district;
        createForm.value.province = data.province;
        createForm.value.department = data.department;
        createForm.value.status = data.status;
    } catch (err) {
        console.error("Error buscando RUC:", err);
    }
};

const createProviderFn = async () => {
    try {
        console.log("Datos enviados:", createForm.value);
        await createProvider(createForm.value);
        showCreate.value = false;
    } catch (err) {
        console.error("Error al crear proveedor:", err);
    }
};

const openDetail = async (id) => {
    try {
        const response = await getProviderDetailById(id);
        detail.value = response.data;
        showDetail.value = true;
    } catch (err) {
        console.error("Error al traer detalle:", err);
    }
};

const openEdit = async (id) => {
    try {
        //const response = await getUserDetail(id);
        //const user = response.data;

        showEdit.value = true;
    } catch (err) {
        console.error("Error al traer usuario para editar:", err);
    }
};
</script>
