import { ref, readonly } from "@vue/reactivity";
import { Lazy, evaluate } from "../types/Lazy";

export function useState<T>(initialValue: Lazy<T>) {
  const state = ref(evaluate(initialValue));

  function setValue(nextValue: T) {
    state.value = nextValue;
  }

  return [readonly(state), setValue];
}
