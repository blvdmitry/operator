declare const useDebouncedCallback: (func: (...args: any[]) => any, timeout: number, deps: unknown[]) => (...args: any[]) => any;
export default useDebouncedCallback;
