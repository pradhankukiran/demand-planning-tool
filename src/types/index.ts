export interface Product {
  sku: string;
  ean: string;
  category: 'Headwear' | 'Clothing' | 'Jewelry';
  internalStock: number;
  fbaStock: number;
  zfsStock: number;
  incomingFba: number;
  incomingZfs: number;
}

export interface SalesData {
  sku: string;
  date: string;
  quantity: number;
}

export interface StockRecommendation {
  sku: string;
  currentStock: number;
  recommendedStock: number;
  shipmentQuantity: number;
  warehouse: 'FBA' | 'ZFS';
}