export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
    let timeout: NodeJS.Timeout | undefined;
    return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
        const context = this;
        const later = function() {
            timeout = undefined;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    } as T;
}