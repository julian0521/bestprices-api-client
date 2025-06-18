"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiStrapi = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
class ApiStrapi {
    constructor(config) {
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
    async getProduct(search, page = 1) {
        try {
            const filter = [];
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
            const headers = {
                'Content-Type': 'application/json'
            };
            if (this.token) {
                headers['Authorization'] = `Bearer ${this.token}`; // ⚠️ importante: el prefijo debe ser "Bearer"
            }
            const response = await (0, cross_fetch_1.default)(`${this.baseUrl}/products?${queryString}`, {
                method: 'GET',
                headers
            });
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const data = await response.json();
            console.log("products:", data);
            return data;
        }
        catch (error) {
            console.error("Error en getProduct:", error);
            throw new Error("getProduct failed");
        }
    }
    async fetchWithAuth(url) {
        const headers = {};
        if (this.token)
            headers['Authorization'] = `Bearer ${this.token}`;
        const response = await (0, cross_fetch_1.default)(url, { headers });
        if (!response.ok)
            throw new Error(`HTTP error ${response.status}`);
        return response.json();
    }
    async getProductBySku(sku) {
        const url = `${this.baseUrl}/products?populate[0]=prices&filters[sku][$eq]=${sku}`;
        const data = await this.fetchWithAuth(url);
        return data.data;
    }
    async getProductById(id) {
        const url = `${this.baseUrl}/products/${id}?populate[0]=prices`;
        const data = await this.fetchWithAuth(url);
        return data.data;
    }
    async getStores() {
        const cacheKey = 'stores';
        if (this.preferences) {
            const cached = await this.preferences.getItem(cacheKey);
            if (cached)
                return JSON.parse(cached);
        }
        const url = `${this.baseUrl}/stores?populate=image`;
        const data = await this.fetchWithAuth(url);
        if (this.preferences)
            await this.preferences.setItem(cacheKey, JSON.stringify(data.data));
        return data.data;
    }
    async getStoresSame(query) {
        const cacheKey = 'stores1';
        if (this.preferences) {
            const cached = await this.preferences.getItem(cacheKey);
            if (cached)
                return JSON.parse(cached);
        }
        const url = `${this.baseUrl}/stores?populate=image&filters[store][$containsi]=${encodeURIComponent(query)}`;
        const data = await this.fetchWithAuth(url);
        return data.data;
    }
    async getStoreById(id) {
        const url = `${this.baseUrl}/stores/${id}`;
        const data = await this.fetchWithAuth(url);
        return data.data;
    }
    async getProductsFeatured(page = 1) {
        const url = `${this.baseUrl}/products?filters[features_product][$eq]=true&pagination[page]=${page}&pagination[pageSize]=5`;
        const data = await this.fetchWithAuth(url);
        return data.data;
    }
    async getProductsPublish(page = 1) {
        const url = `${this.baseUrl}/products?pagination[page]=${page}&pagination[pageSize]=5`;
        const data = await this.fetchWithAuth(url);
        return data.data;
    }
    async getStoresGoogleMaps(query) {
        const apiKey = 'AIzaSyB7ap1ZKC_EWBaDnihwGYf1k6WXT6oDODM';
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;
        const data = await this.fetchWithAuth(url);
        return data;
    }
}
exports.ApiStrapi = ApiStrapi;
