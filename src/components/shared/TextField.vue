<script setup>
const props = defineProps({
    type: String,
    placeholder: String,
    modelValue: [String, Number]
})

const emit = defineEmits(['update:modelValue'])

const onInput = (e) => {
    emit('update:modelValue', e.target.value)
}
</script>

<template>
    <input :type="props.type" :placeholder="props.placeholder" :value="props.modelValue" @input="onInput"
        class="bg-white text-blue-ebd text-[17px] focus:outline rounded-md block w-full h-10 p-2.5 placeholder-gray-400 mt-1.5"
        v-bind="$attrs" />
</template>
