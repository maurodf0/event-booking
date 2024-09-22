<template>

<template v-if="error">
  <ErrorCard :retry="fetchEvents">
    Could not load events at the moment. Please try again
  </ErrorCard>
</template>

    <section class="grid grid-col-1 md:grid-cols-2 gap-8">
      <!-- Il tag template viene usato per evitare un div inutile 
           e permette di raggruppare componenti senza introdurre elementi DOM -->
      <template v-if="!eventsLoading">
        <!-- Ciclo sui dati degli eventi con v-for -->
         <template v-if="events.length">
            <EventCard 
            v-for="event in events" :key="event.id"
            :title="event.title" 
            :when="event.date"
            :description="event.description"
            @register="handleRegistration(event)" 
            />
      </template>

      <template v-else>
        <div class="col-span-2 text-center text-gray-500">No Events Yet</div>
      </template>

    </template>

      <!-- Mostra un loading state se gli eventi sono ancora in caricamento -->
      <template v-else>
        <LoadingEventCard v-for="i in 4" :key="i" />
      </template>

    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import useBookings from '@/composables/useBooking';
import EventCard from '@/components/EventCard.vue';
import LoadingEventCard from '@/components/LoadingEventCard.vue';
import ErrorCard from '@/components/ErrorCard.vue';

const {handleRegistration} = useBookings();

/* events e bookings sono reattivi e vengono inizializzati come array vuoti */
const events = ref([]);
const eventsLoading = ref(false); // Booleano per gestire il caricamento degli eventi
const error = ref(null);

/* Funzione per ottenere la lista di eventi */
const fetchEvents = async () => {
  eventsLoading.value = true;
  error.value = null; //riassegno l'error a null nel caso un cui succeda nuovamente
  try {
    const response = await fetch('http://localhost:3001/events');
    events.value = await response.json();
  } catch (e) {
    error.value = e;
  }
  finally {
    eventsLoading.value = false;
  }
};

onMounted(()=>{
    fetchEvents();
}) 


</script>