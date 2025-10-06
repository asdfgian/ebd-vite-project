<template>
    <div class="h-full px-16 py-5">
        <div v-if="loading">Cargando usuarios...</div>
        <div v-else-if="error" class="text-red-600">{{ error }}</div>
        <div class="overflow-x-auto shadow-2xl sm:rounded-lg max-h-[500px] overflow-y-auto">
            <table class="w-full text-sm text-left rtl:text-right text-black">
                <thead class="text-xs text-white uppercase bg-orange-ebd">
                    <tr>
                        <th scope="col" class="px-6 py-3">Nombre de usuario</th>
                        <th scope="col" class="px-6 py-3">Nombre</th>
                        <th scope="col" class="px-6 py-3">Estado</th>
                        <th scope="col" class="px-6 py-3">Rol</th>
                        <th class="px-6 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id"
                        class="bg-white border-b border-gray-200 hover:bg-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ user.username }}
                        </th>
                        <td class="px-6 py-4">
                            {{ user.name }}
                        </td>
                        <td class="px-6 py-4" :class="user.status == 'A'
                                ? 'text-green-600 font-bold'
                                : 'text-red-600 font-bold'
                            ">
                            {{ user.status == "A" ? "Activo" : "Inactivo" }}
                        </td>
                        <td class="px-6 py-4">
                            {{ user.roleName }}
                        </td>
                        <td class="px-6 py-4 flex gap-4">
                            <a class="font-medium text-orange-ebd hover:underline cursor-pointer"
                                @click="openDetail(user.id)">
                                Ver detalle
                            </a>
                            <a class="font-medium text-orange-ebd hover:underline cursor-pointer"
                                @click="openEdit(user.id)">
                                Editar
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between py-2 px-3">
                <span class="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">Mostrando
                    <span class="font-semibold text-gray-900">{{ users.length }}</span>
                </span>
            </nav>
            <!-- Detalle -->
            <div v-if="showDetail" class="fixed inset-0 z-20 bg-gray-100/40 flex justify-center items-center">
                <div class="bg-blue-ebd p-6 rounded-lg shadow-lg max-w-lg w-full">
                    <h2 class="text-xl font-bold mb-4 text-white">Detalle de Usuario</h2>
                    <img :src="detail?.avatarUrl" alt="avatar" class="w-35 h-35 rounded-full mb-4 mx-auto" />
                    <p class="text-white"><strong>Email:</strong> {{ detail?.email }}</p>
                    <p class="text-white">
                        <strong>Usuario:</strong> {{ detail?.username }}
                    </p>
                    <p class="text-white"><strong>Nombre:</strong> {{ detail?.name }}</p>
                    <p class="text-white">
                        <strong>Teléfono:</strong> {{ detail?.phone || "-" }}
                    </p>
                    <p class="text-white">
                        <strong>Estado:</strong>
                        {{ detail?.status == "A" ? "Activo" : "Inactivo" }}
                    </p>
                    <p class="text-white"><strong>Rol:</strong> {{ detail?.roleName }}</p>
                    <p class="text-white">
                        <strong>Función:</strong> {{ detail?.roleDto.description }}
                    </p>
                    <p class="text-white">
                        <strong>Departamento:</strong> {{ detail?.departmentDto.name }}
                    </p>
                    <p class="text-white">
                        <strong>Creado:</strong> {{ formatDate(detail?.createdAt) }}
                    </p>
                    <p class="text-white">
                        <strong>Actualizado:</strong> {{ formatDate(detail?.updatedAt) }}
                    </p>

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
                    <h2 class="text-xl font-semibold text-white mb-3">Editar empleado</h2>
                    <form @submit.prevent="updateUser()">
                        <div class="mb-2">
                            <label class="block text-sm text-white mb-2">Usuario</label>
                            <input v-model="editForm.username" type="text"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                required="" />
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm text-white mb-2">Teléfono</label>
                            <input v-model="editForm.phone" type="text"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                required="" />
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm text-white mb-2">Avatar URL</label>
                            <input v-model="editForm.avatarUrl" type="text"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                required="" />
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm text-white mb-2">Departamento</label>
                            <select v-model="editForm.departmentId"
                                class="border text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-gray-600 border-gray-500 dark:placeholder-gray-400 text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option :value="1">Tecnología de la Información</option>
                                <option :value="2">Redes y Comunicaciones</option>
                                <option :value="3">Soporte Técnico</option>
                                <option :value="4">Mantenimiento de Hardware</option>
                                <option :value="5">Seguridad Informática</option>
                                <option :value="6">Gestión de Inventarios</option>
                                <option :value="7">Compras y Proveedores</option>
                                <option :value="8">Logística y Almacén</option>
                                <option :value="9">Desarrollo de Software</option>
                                <option :value="10">Auditoría de Sistemas</option>
                                <option :value="11">Sin Asignar</option>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm text-white mb-2">Rol</label>
                            <select v-model="editForm.roleId"
                                class="border text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-gray-600 border-gray-500 dark:placeholder-gray-400 text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option :value="1">ADMINISTRADOR</option>
                                <option :value="2">INVENTARISTA</option>
                                <option :value="3">AUDITOR</option>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm text-white mb-2">Estado</label>
                            <select v-model="editForm.status"
                                class="border text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-gray-600 border-gray-500 dark:placeholder-gray-400 text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="A">Activo</option>
                                <option value="I">Inactivo</option>
                            </select>
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
import { ref, onMounted } from "vue";
import {
    getAllUsers,
    getUserDetail,
    updateUserApi,
} from "../../services/UserService";

const users = ref([]);
const loading = ref(true);
const error = ref("");
const showDetail = ref(false);
const detail = ref(null);
const showEdit = ref(false);
const editForm = ref({});

onMounted(async () => {
    try {
        const response = await getAllUsers();
        users.value = response.data;
    } catch (err) {
        error.value = err.response?.data?.message || "Error al cargar usuarios";
    } finally {
        loading.value = false;
    }
});

const openDetail = async (id) => {
    try {
        const response = await getUserDetail(id);
        detail.value = response.data;
        showDetail.value = true;
    } catch (err) {
        console.error("Error al traer detalle:", err);
    }
};

const openEdit = async (id) => {
    try {
        const response = await getUserDetail(id);
        const user = response.data;

        editForm.value = {
            id: user.id,
            username: user.username,
            phone: user.phone || "",
            avatarUrl: user.avatarUrl || "",
            departmentId: user.departmentDto.id || null,
            roleId: user.roleDto.id,
            status: user.status,
        };

        showEdit.value = true;
    } catch (err) {
        console.error("Error al traer usuario para editar:", err);
    }
};

const updateUser = async () => {
    try {
        await updateUserApi(editForm.value.id, editForm.value);
        showEdit.value = false;
        const response = await getAllUsers();
        users.value = response.data;
    } catch (err) {
        console.error("Error al actualizar usuario:", err);
    }
};

const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString();
};
</script>
