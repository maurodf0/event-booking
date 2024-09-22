<template>

<h2>Your Booking</h2>
<template v-if="error">
  <ErrorCard  :retry="fetchBookings">
    Could not load your booking at the moment. Please try again
  </ErrorCard>
</template>

    <template v-if="!bookingLoading">
      <BookingItem 
        v-for="booking in bookings" 
        @cancelled="cancelBooking(booking.id)"
        :key="booking.eventId"
        :title="booking.eventTitle"
        :status="booking.status"
      />
    </template>

    <!-- Mostra un loading state se le prenotazioni sono ancora in caricamento -->
    <template v-else>
      <LoadingBooking v-for="i in 2" :key="i" />
    </template>
</template>

<script setup>

import { onMounted } from 'vue';

import BookingItem from '@/components/BookingItem.vue';
import LoadingBooking from '@/components/LoadingBooking.vue';
import useBookings from '@/composables/useBooking';
import ErrorCard from '@/components/ErrorCard.vue';

// Using the composable useBooking
const {loading, bookings, fetchBookings, cancelBooking, error} = useBookings()

/* Carica eventi e prenotazioni quando il componente viene montato */
onMounted(() => {
  fetchBookings();
});

</script>