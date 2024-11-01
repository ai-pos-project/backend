export const nativePayments = ['line', 'delay', 'init'] as const;
export type NativePayments = (typeof nativePayments)[number];
