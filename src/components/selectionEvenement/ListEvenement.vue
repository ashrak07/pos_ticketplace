<template>
  <div v-if="events.length && places.length">
    <div
      v-for="(event, index) in events"
      :key="event.id"
      @click="handleEventClick(event, index)"
      class="card m-3"
      style="max-width: 540px"
    >
      <div class="row g-0">
        <div class="col-md-4">
          <img
            :src="formatImageUrl(event.image)"
            v-if="event.image"
            class="img-thumbnail rounded-start"
            alt="Image de l'événement"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title font-title-2">{{ event.name }}</h5>

            <p class="card-title font fs-6">{{ getPlaceName(index) }}</p>

            <p class="card-text">
              <small class="text-muted font-content">{{ event.date }}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useEventStore } from "../../store/eventStore";
import { useShopStore } from "../../store/shopStore";
import { computed, onMounted } from "vue";
import { useUserStore } from "../../store/userStore";
import { useTicketStore } from "../../store/ticketStore";
import router from "../../router/router";

export default {
  setup() {
    const userStore = useUserStore();
    const token = localStorage.getItem("token");
    const eventStore = useEventStore();
    const shopStore = useShopStore();
    const ticketStore = useTicketStore();

    const places = computed(() => eventStore.getPlace);
    const events = computed(() => eventStore.getEvent);

    const getPlaceName = (index) => {
      return places.value[index] ? places.value[index].name : "lieu inconnu";
    };

    //Format URL
    function formatImageUrl(url) {
      if (url.trim() !== "" && url !== "image") {
        let urlSplitted = url.split("/");

        // Remove width and height parameter and set new
        if (/w=\d+,h=\d+$/.test(url)) {
          urlSplitted.pop();
        }
        if (urlSplitted[2] === "imagedelivery.net") {
          urlSplitted.push("w=200,h=220");
        }
        return urlSplitted.join("/");
      }
      return url;
    }

    const handleEventClick = (event, index) => {
      const eventId = eventStore.getEvent.find((e) => e.id === event.id)?.id;
      const eventName = eventStore.getEvent.find((e) => e.id === event.id)?.name;
      const eventDate = eventStore.getEvent.find((e) => e.id === event.id)?.date;
      const placeName = getPlaceName(index);

      console.log("Id de l'événement cliqué :", eventId);
      console.log("Nom de la place cliqué :", placeName);
      localStorage.setItem("event_id", eventId);

      localStorage.setItem("place_name", placeName);
      localStorage.setItem("event_name", eventName);
      localStorage.setItem("event_date", eventDate);

      const event_id = localStorage.getItem("event_id");

      const workspaceKey = eventStore.getEvent.find((e) => e.id === event.id)
        ?.public_workspace_key;

      const seatSecretKey = eventStore.getEvent.find((e) => e.id === event.id)
        ?.seats_io_event_secret_key;

      console.log("WK de l'événement cliqué :", workspaceKey);
      localStorage.setItem("workspace_key", workspaceKey);
      console.log("SK de l'événement cliqué :", seatSecretKey);
      localStorage.setItem("seats_key", seatSecretKey);

      if (event_id) {
        axios
          .get(`http://localhost:3000/tickets/sold/${event_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log("Voici les Tickets pour cet evenement :", response.data);
            const ticket = response.data;
            console.log("ticket:", ticket);
            ticketStore.setTicket(ticket);
            console.log("voici le data dans le store", ticketStore.getTicket);

            const ticketsSold = response.data.tickets_sold;
            const isAdmission = ticketsSold.map((ticket) => ticket.is_admission);
            console.log("Propriétés is_admission des tickets vendus :", isAdmission);

            ticketStore.setIsAdmissions(isAdmission);
            console.log("isAdmission dans le store:", ticketStore.getIsAdmissions);

            let A = [];
            let B = [];
            let C = [];

            // Logique pour attribuer A, B et C
            if (isAdmission.every((admission) => !admission)) {
              A = ticketsSold;
            } else {
              ticketsSold.forEach((ticket) => {
                if (ticket.is_admission) {
                  B.push(ticket);
                } else {
                  C.push(ticket);
                }
              });
            }

            ticketStore.setA(A);
            ticketStore.setB(B);
            ticketStore.setC(C);

            // Affichage des valeurs dans la console
            console.log("A depuis le store:", ticketStore.getA);
            console.log("B depuis le store:", ticketStore.getB);
            console.log("C depuis le store:", ticketStore.getC);

            if (ticketStore.getA.length > 0) {
              router.push({ name: "sansresa" }); // Redirection vers '/event/sansresa'
            } else if (ticketStore.getB !== null) {
              router.push({ name: "resa" }); // Redirection vers '/event/resa'
            } else {
            }
          })
          .catch((error) => {
            console.error(
              "Erreur lors de la récupération des détails de l'événement :",
              error
            );
          });
      } else {
        console.error("Erreur : événement non trouvé");
      }
    };

    const fetchData = () => {
      let shopId = localStorage.getItem("shop_id");
      let token = localStorage.getItem("token");
      axios
        .get("http://localhost:3000/shops/events/", {
          params: {
            shopId: shopId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Voici la réponse data:", response.data);
          const events = response.data.data.events;
          const places = response.data.data.places;

          if (events.length > 0) {
            console.log("Voici events dans le data:", events);
            eventStore.setEvent(events);
            console.log("voici events dans le store:", eventStore.getEvent);
          } else {
            console.log("error");
          }

          if (places.length > 0) {
            console.log("Voici places dans le data:", places);
            eventStore.setPlace(places);
            console.log("Voici places dans le store:", eventStore.getPlace);
          } else {
            console.log("error");
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données :", error);
        });
    };
    onMounted(fetchData);
    return {
      eventStore,
      handleEventClick,
      events,
      places,
      getPlaceName,
      formatImageUrl,
    };
  },
};
</script>

<style scoped>
.btn-2:hover {
  background-color: #b9901e;
}
</style>
