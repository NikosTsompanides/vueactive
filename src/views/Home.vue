<template>
  <div class="home">
    <button @click="onClick">Click me</button>
    <pre>{{ counter }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { lazy } from "../types/Lazy";
import { useStreamAsState } from "../hooks/useStreamAsState";
import { useCreateHomeStore } from "./HomeStore";

export default defineComponent({
  name: "Home",
  setup() {
    const store = useCreateHomeStore();
    const counter = useStreamAsState(store.state.counter$, lazy(0));

    return {
      counter,
      onClick: store.onButtonClicked,
    };
  },
});
</script>
