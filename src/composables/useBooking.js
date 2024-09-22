import { ref } from 'vue';

const bookings = ref([]);
const loading = ref(false); // Booleano per gestire il caricamento delle prenotazioni
const error = ref(null);

/* Funzione per ottenere la lista delle prenotazioni */
const fetchBookings = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch('http://localhost:3001/bookings');
      bookings.value = await response.json();
    } catch(e) {
        error.value = e;
    } finally {
        loading.value = false;
    }
  };

  /* Funzione per trovare l'indice di una prenotazione con il suo ID */
const findBookingById = (id) => bookings.value.findIndex((b) => b.id === id);

/* Funzione per gestire la registrazione a un evento */
const handleRegistration = async (event) => {
  /* Verifica se l'utente è già registrato a questo evento */
  if (bookings.value.some(booking => booking.eventId === event.id && booking.userId === 1)) {
    alert('you are already registered to this event');
    return;
  }

  const newBooking = {
    id: Date.now().toString(), // Genera un ID univoco basato sull'orario
    userId: 1, // Hardcoded l'utente (puoi cambiarlo in base al contesto)
    eventId: event.id,
    eventTitle: event.title,
    status: 'pending...' // Imposta lo stato come 'in attesa'
  };

  /* Aggiungi temporaneamente la prenotazione alla lista */
  bookings.value.push(newBooking);

  try {
    /* Effettua la chiamata POST per confermare la prenotazione */
    const response = await fetch('http://localhost:3001/bookings', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ...newBooking,
        status: 'confirmed' // Imposta lo stato come 'confermato' dopo il successo
      })
    });

    if (response.ok) {
      const index = findBookingById(newBooking.id);
      bookings.value[index] = await response.json();
    } else {
      throw new Error('Failed to confirm booking');
    }
  } catch (e) {
    /* In caso di errore, rimuovi la prenotazione temporanea */
    console.error('Failed to register to event: ', e);
    bookings.value = bookings.value.filter((b) => b.id != newBooking.id);
  }
};

/* Funzione per cancellare una prenotazione */
const cancelBooking = async (bookingId) => {
  const index = findBookingById(bookingId);
  const originalBooking = bookings.value[index]; // Salva la prenotazione originale
  bookings.value.splice(index, 1); // Rimuovi temporaneamente la prenotazione

  try {
    const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to cancel booking');
    }
  } catch (e) {
    /* In caso di errore, ripristina la prenotazione */
    console.log('Failed to cancel the booking', e);
    bookings.value.splice(index, 0, originalBooking);
  }
};

export default function useBookings() {
    return {
        bookings,
        loading,
        error,
        fetchBookings,
        handleRegistration,
        cancelBooking
    }
}
