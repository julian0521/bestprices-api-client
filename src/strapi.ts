import fetch from 'cross-fetch';

// src/api.ts
export interface ApiStrapiConfig {
    baseUrl: string;
    token?: string;
    preferences?: StorageLike; // Local storage mock for caching
}

export interface GetProductResponse {
    data: any[];
}


export interface StorageLike {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
}

export class ApiStrapi {
    private baseUrl: string;
    private token?: string;
    private preferences?: StorageLike;

    constructor(config: ApiStrapiConfig) {
        this.baseUrl = config.baseUrl;
        this.token = config.token;
        this.preferences = config.preferences;
    }

    /**
     * Fetches products from the Strapi API with optional search and pagination.
     * @param search - Optional search term to filter products by description.
     * @param page - Page number for pagination, default is 1.
     * @returns A promise that resolves to the GetProductResponse containing product data.
     */
    async getProduct(search?: string, page: number = 1): Promise<GetProductResponse> {
        try {
            const filter: string[] = [];

            if (search) {
                const valueArray = search.split(' ');
                valueArray.forEach((value, index) => {
                    filter.push(`filters[$and][${index}][description][$containsi]=${encodeURIComponent(value)}`);
                });
            }

            const queryString = [
                ...filter,
                `pagination[page]=${page}`,
                `pagination[pageSize]=10`
            ].join('&');

            const headers: Record<string, string> = {
                'Content-Type': 'application/json'
            };

            if (this.token) {
                headers['Authorization'] = `Bearer ${this.token}`; // ⚠️ importante: el prefijo debe ser "Bearer"
            }

            const response = await fetch(`${this.baseUrl}/products?${queryString}`, {
                method: 'GET',
                headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const data = await response.json();
            console.log("products:", data);
            return data;
        } catch (error) {
            console.error("Error en getProduct:", error);
            throw new Error("getProduct failed");
        }
    }


    private async fetchWithAuth(url: string): Promise<any> {
        const headers: Record<string, string> = {};
        if (this.token) headers['Authorization'] = `Bearer ${this.token}`;

        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        return response.json();
    }

    async getProductBySku(sku: string): Promise<any[]> {
        const url = `${this.baseUrl}/products?populate[0]=prices&filters[sku][$eq]=${sku}`;
        const data = await this.fetchWithAuth(url);
        return data.data;
    }

    async getProductById(id: string): Promise<any> {
        const url = `${this.baseUrl}/products/${id}?populate[0]=prices`;
        const data = await this.fetchWithAuth(url);
        return data.data;
    }

    async getStores(): Promise<any[]> {
        const cacheKey = 'stores';
        if (this.preferences) {
            const cached = await this.preferences.getItem(cacheKey);
            if (cached) return JSON.parse(cached);
        }

        const url = `${this.baseUrl}/stores?populate=image`;
        const data = await this.fetchWithAuth(url);
        if (this.preferences) await this.preferences.setItem(cacheKey, JSON.stringify(data.data));
        return data.data;
    }

    async getStoresSame(query: string): Promise<any[]> {
        const cacheKey = 'stores1';
        if (this.preferences) {
            const cached = await this.preferences.getItem(cacheKey);
            if (cached) return JSON.parse(cached);
        }

        const url = `${this.baseUrl}/stores?populate=image&filters[store][$containsi]=${encodeURIComponent(query)}`;
        const data = await this.fetchWithAuth(url);
        return data.data;
    }

    async getStoreById(id: string): Promise<any> {
        const url = `${this.baseUrl}/stores/${id}`;
        const data = await this.fetchWithAuth(url);
        return data.data;
    }

    async getProductsFeatured(page: number = 1): Promise<any[]> {
        const url = `${this.baseUrl}/products?filters[features_product][$eq]=true&pagination[page]=${page}&pagination[pageSize]=5`;
        const data = await this.fetchWithAuth(url);
        return data.data;
    }

    async getProductsPublish(page: number = 1): Promise<any[]> {
        const url = `${this.baseUrl}/products?pagination[page]=${page}&pagination[pageSize]=5`;
        const data = await this.fetchWithAuth(url);
        return data.data;
    }

    async getStoresGoogleMaps(query: string): Promise<any> {
        const apiKey = 'AIzaSyB7ap1ZKC_EWBaDnihwGYf1k6WXT6oDODM';
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;
        const data = await this.fetchWithAuth(url);
        return data;
    }
}
