export type Lazy<T> = () => T;

export function lazy<T>(value: T) {
  return () => value;
}

export function evaluate<T>(cb: Lazy<T>) {
  return cb();
}
