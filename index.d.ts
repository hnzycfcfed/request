type RuquestOptions = {
    [key: string]: any
}

export function post<T = any>(url: string, options?: RuquestOptions): Promise<T>;
export function get<T = any>(url: string, options?: RuquestOptions): Promise<T>;
export function put<T = any>(url: string, options?: RuquestOptions): Promise<T>;
export function del<T = any>(url: string, options?: RuquestOptions): Promise<T>;
export function abort(name: string, callback?: Function): void;


export default function request<T = any>(url: string, options?: RuquestOptions): Promise<T>;

