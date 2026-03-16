export const apiFetch = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`API error: ${response.status} ${response.statusText}`);
    return response.json();
};