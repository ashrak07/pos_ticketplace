<template>
  <div class="card card-col rounded-3 m-3 px-5">
    <div style="height: auto">
      <SeatsioSeatingChart :workspaceKey="workspaceKey" :event="eventId" region="eu" />
    </div>
  </div>
</template>

<script>
import { SeatsioSeatingChart } from "@seatsio/seatsio-vue";
export default {
  components: {
    SeatsioSeatingChart,
  },
  setup() {
    const workspaceKey = localStorage.getItem("workspace_key");
    const eventId = localStorage.getItem("seats_key");

    return {
      workspaceKey,
      eventId,
    };
  },
};
</script>
