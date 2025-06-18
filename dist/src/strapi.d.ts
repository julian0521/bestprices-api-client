export interface ApiStrapiConfig {
    baseUrl: string;
    token?: string;
    preferences?: StorageLike;
}
export interface GetProductResponse {
    data: any[];
}
export interface StorageLike {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
}
export declare class ApiStrapi {
    private baseUrl;
    private token?;
    private preferences?;
    constructor(config: ApiStrapiConfig);
    /**
     * Fetches products from the Strapi API with optional search and pagination.
     * @param search - Optional search term to filter products by description.
     * @param page - Page number for pagination, default is 1.
     * @returns A promise that resolves to the GetProductResponse containing product data.
     */
    getProduct(search?: string, page?: number): Promise<GetProductResponse>;
    private fetchWithAuth;
    getProductBySku(sku: string): Promise<any[]>;
    getProductById(id: string): Promise<any>;
    getStores(): Promise<any[]>;
    getStoresSame(query: string): Promise<any[]>;
    getStoreById(id: string): Promise<any>;
    getProductsFeatured(page?: number): Promise<any[]>;
    getProductsPublish(page?: number): Promise<any[]>;
    getStoresGoogleMaps(query: string): Promise<any>;
}
