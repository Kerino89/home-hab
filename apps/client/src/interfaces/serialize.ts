/* eslint-disable @typescript-eslint/no-explicit-any */

type JsonPrimitive = boolean | number | string | null;
type NonJsonPrimitive = Function | symbol | undefined;
type JsonReturnable = JsonPrimitive | undefined;
type IsAny<T> = 0 extends T & 1 ? true : false;

type FilterKeys<TObj extends object, TFilter> = {
  [TKey in keyof TObj]: TObj[TKey] extends TFilter ? TKey : never;
}[keyof TObj];

type Simplify<TType> = TType extends any[] | Date ? TType : { [K in keyof TType]: TType[K] };

type SerializeTuple<T extends [unknown, ...unknown[]]> = {
  [k in keyof T]: T[k] extends NonJsonPrimitive ? null : Serialize<T[k]>;
};

type FilterDefinedKeys<TObj extends object> = Exclude<
  {
    [TKey in keyof TObj]: undefined extends TObj[TKey] ? never : TKey;
  }[keyof TObj],
  undefined
>;

type UndefinedToOptional<T extends object> = Pick<T, FilterDefinedKeys<T>> & {
  [k in keyof Omit<T, FilterDefinedKeys<T>>]?: Exclude<T[k], undefined>;
};

export type SerializeObject<T extends object> = {
  [k in keyof Omit<T, FilterKeys<T, NonJsonPrimitive>>]: Serialize<T[k]>;
};

export type Serialize<T> = IsAny<T> extends true
  ? any
  : T extends JsonReturnable
  ? T
  : T extends Map<any, any> | Set<any>
  ? object
  : T extends NonJsonPrimitive
  ? never
  : T extends { toJSON(): infer U }
  ? U
  : T extends []
  ? []
  : T extends [unknown, ...unknown[]]
  ? SerializeTuple<T>
  : T extends readonly (infer U)[]
  ? (U extends NonJsonPrimitive ? null : Serialize<U>)[]
  : T extends object
  ? Simplify<SerializeObject<UndefinedToOptional<T>>>
  : never;
