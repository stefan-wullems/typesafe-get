type HasIndexSignature<T> = keyof T extends string ? false : true;
type IsArray<T> = T extends any[] ? true : false;
type IsNullable<T> = undefined extends T ? true : false;
type IsSafeAccess<T> = true extends Not<IsArray<T>> &
  Not<HasIndexSignature<T>> &
  Not<IsNullable<T>>
  ? true
  : false;

type Not<T extends boolean> = T extends true ? false : true;

type L<T, K extends keyof NonNullable<T>> = IsSafeAccess<T> extends true
  ? NonNullable<T>[K]
  : NonNullable<T>[K] | undefined;

export default function get<
  T,
  K1 extends keyof NonNullable<T>,
  K2 extends keyof NonNullable<NonNullable<T>[K1]>,
  K3 extends keyof NonNullable<NonNullable<NonNullable<T>[K1]>[K2]>,
  K4 extends keyof NonNullable<
    NonNullable<NonNullable<NonNullable<T>[K1]>[K2]>[K3]
  >,
  K5 extends keyof NonNullable<
    NonNullable<NonNullable<NonNullable<NonNullable<T>[K1]>[K2]>[K3]>[K4]
  >
>(target: T, path: [K1, K2, K3, K4, K5]): L<L<L<L<L<T, K1>, K2>, K3>, K4>, K5>;

export default function get<
  T,
  K1 extends keyof NonNullable<T>,
  K2 extends keyof NonNullable<NonNullable<T>[K1]>,
  K3 extends keyof NonNullable<NonNullable<NonNullable<T>[K1]>[K2]>,
  K4 extends keyof NonNullable<
    NonNullable<NonNullable<NonNullable<T>[K1]>[K2]>[K3]
  >
>(target: T, path: [K1, K2, K3, K4]): L<L<L<L<T, K1>, K2>, K3>, K4>;

export default function get<
  T,
  K1 extends keyof NonNullable<T>,
  K2 extends keyof NonNullable<NonNullable<T>[K1]>,
  K3 extends keyof NonNullable<NonNullable<NonNullable<T>[K1]>[K2]>
>(target: T, path: [K1, K2, K3]): L<L<L<T, K1>, K2>, K3>;

export default function get<
  T,
  K1 extends keyof NonNullable<T>,
  K2 extends keyof NonNullable<NonNullable<T>[K1]>
>(target: T, path: [K1, K2]): L<L<T, K1>, K2>;

export default function get<T, K extends keyof NonNullable<T>>(
  target: T,
  path: [K]
): L<T, K>;

/**
 * @description
 * Returns the value in a nested associative structure,
 * where `path` is a sequence of keys. Returns `undefined` if the key
 * is not present.
 *
 * For consistensy, use `get` instead of `obj.prop` or `arr[index]`.
 *
 * @example
 * get({ a: { b: { c: 3 } } }, ["a", "b", "c"]); // 3
 * get({ a: { b: { c: 3 } } }, ["a", "b", "d"]); // undefined
 * get([1, 2, 3], [1]); // 2
 */
export default function get(target: any, path: any[]) {
  return path.reduce((obj, key) => obj?.[key], target);
}
