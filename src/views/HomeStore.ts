import { BehaviorSubject, map, Subject, takeUntil, withLatestFrom } from "rxjs";
import { ref } from "@vue/reactivity";
import { onMounted, onUnmounted } from "@vue/runtime-core";

function increaseCounterBy(num: number) {
  return ([, counter]: [event: void, counter: number]) => counter + num;
}

export function createHomeStore() {
  const counter$ = new BehaviorSubject(0);
  const onButtonClickEvents$ = new Subject<void>();

  function subscribe() {
    const unsubscribe$ = new Subject<void>();

    onButtonClickEvents$
      .pipe(
        withLatestFrom(counter$),
        map(increaseCounterBy(2)),
        takeUntil(unsubscribe$)
      )
      .subscribe(counter$);

    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }

  return {
    state: {
      counter$,
    },
    onButtonClicked() {
      onButtonClickEvents$.next();
    },
    subscribe,
  };
}

export function useCreateHomeStore() {
  const store = ref<ReturnType<typeof createHomeStore> | undefined>(undefined);

  if (store.value === undefined) {
    store.value = createHomeStore();
  }

  let unsubscribe: VoidFunction;

  onMounted(() => {
    if (store.value !== undefined) {
      unsubscribe = store.value.subscribe();
    }
  });

  onUnmounted(() => {
    unsubscribe();
  });

  return store.value;
}
