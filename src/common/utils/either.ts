export type Ok<V> = { notOk?: never; ok: V };
export type NotOk<T> = { notOk: T; ok?: never };

export const ok = <V>(value: V): Ok<V> => {
  return {
    ok: value,
  };
};

export const notOk = <T>(value: T): NotOk<T> => {
  return {
    notOk: value,
  };
};

export const isOk = <T, V>(either: Either<T, V>): either is Ok<V> => {
  return either.ok !== undefined;
};

export const isNotOk = <T, V>(either: Either<T, V>): either is NotOk<T> => {
  return either.notOk !== undefined;
};

export type Either<T, V> = NonNullable<NotOk<T> | Ok<V>>;
