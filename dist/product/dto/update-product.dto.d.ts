declare class Size {
    size: string;
    count: number;
}
export declare class UpdateProductDto {
    name: string;
    quantityResultsPurchases: number;
    priceForSimplePurchase: number;
    priceForWholesalePurchase: number;
    quantityRresultPurchases: number;
    description: string;
    brand: string;
    style: string;
    weather: string;
    material: string;
    category: number;
    colors: string[];
    sizes: Size[];
}
export {};
