<template>
  <main class="container mx-auto my-8 space-y-8">
    <!-- Titolo dell'applicazione -->
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Event</h2>
    <EventList />
    
    <!-- Sezione per visualizzare le prenotazioni -->
    <BookingList />

  </main>
</template>

<script setup>

import EventList from '@/components/EventList.vue';
import BookingList from '@/components/BookingList.vue';

</script>
