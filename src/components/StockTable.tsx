import React from 'react';
import { Product, StockRecommendation } from '../types';
import { Package, TrendingUp, AlertTriangle } from 'lucide-react';

interface StockTableProps {
  products: Product[];
  recommendations: StockRecommendation[];
}

export const StockTable: React.FC<StockTableProps> = ({ products, recommendations }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU/EAN</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommended</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => {
            const recommendation = recommendations.find(r => r.sku === product.sku);
            const stockStatus = recommendation 
              ? recommendation.currentStock < recommendation.recommendedStock ? 'low' 
              : recommendation.currentStock > recommendation.recommendedStock * 1.5 ? 'high'
              : 'optimal'
              : 'unknown';

            return (
              <tr key={product.sku} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.sku}</div>
                  <div className="text-sm text-gray-500">{product.ean}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Package className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-900">{product.internalStock}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-sm text-gray-900">
                      {recommendation?.recommendedStock || 'N/A'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {stockStatus === 'low' && (
                    <div className="flex items-center text-red-600">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      <span className="text-sm">Order {recommendation?.shipmentQuantity || 0} units</span>
                    </div>
                  )}
                  {stockStatus === 'high' && (
                    <span className="text-sm text-orange-600">Overstock</span>
                  )}
                  {stockStatus === 'optimal' && (
                    <span className="text-sm text-green-600">Stock level optimal</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};