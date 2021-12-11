import { Observable, Subscription } from "rxjs";

import { onMounted, onUnmounted } from "@vue/runtime-core";
import { useState } from "./useState";
import { Lazy } from "../types/Lazy";

export function useStreamAsState<T>(
  stream: Observable<T>,
  initialValue: Lazy<T>
) {
  let subscription: Subscription;
  const [state, setState] = useState(initialValue);

  onMounted(() => {
    subscription = stream.subscribe(setState);
  });

  onUnmounted(() => {
    subscription.unsubscribe();
  });

  return state;
}
