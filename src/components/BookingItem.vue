<template>
    <SectionCard>
        <div class="flex justify-between">
           <div class="flex space-x-2">
            <div>{{ title }}</div>
            <div><component :is="icon" :class="{'animate-spin': pending}"/></div>
        </div>
            <RoundButton 
            @click="$emit('cancelled')"
            variant="danger">Cancel</RoundButton>
        </div>
    </SectionCard>

</template>

<script setup>

import SectionCard from './SectionCard.vue';
import RoundButton from './RoundButton.vue';
import { LoaderCircle, Check } from 'lucide-vue-next';
import {computed} from 'vue';

defineEmits(['cancelled'])

const props = defineProps({
    title: String,
    status: String
})

const pending = computed( () =>  props.status === 'pending...');
console.log(pending.value);
const icon = computed( () => pending.value ? LoaderCircle : Check);
</script>