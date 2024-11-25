import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { StockTable } from './components/StockTable';
import { Product, SalesData, StockRecommendation } from './types';
import { calculateSeasonalMultiplier, calculateAverageDailySales, calculateRecommendedStock } from './utils/stockCalculations';
import { BarChart3, Box, Warehouse } from 'lucide-react';
import Papa from 'papaparse';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [recommendations, setRecommendations] = useState<StockRecommendation[]>([]);

  const handleFileUpload = async (file: File, type: string) => {
    const text = await file.text();
    const result = Papa.parse(text, { header: true });
    
    // Process the data based on file name/type
    console.log(`Processing ${type} file:`, file.name);
    // Add processing logic later
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Warehouse className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Demand Planning Tool
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <Box className="h-5 w-5 mr-1" />
                <span>{products.length} Products</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <BarChart3 className="h-5 w-5 mr-1" />
                <span>{recommendations.length} Recommendations</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Current Stock Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Current Stock Levels</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FileUpload
                onFileUpload={(file) => handleFileUpload(file, 'internal')}
                accept={{ 'text/csv': ['.csv'] }}
                label="Internal Warehouse Stock"
              />
              <FileUpload
                onFileUpload={(file) => handleFileUpload(file, 'amazon')}
                accept={{ 'text/csv': ['.csv'] }}
                label="Amazon (FBA) Stock"
              />
              <FileUpload
                onFileUpload={(file) => handleFileUpload(file, 'zalando')}
                accept={{ 'text/csv': ['.csv'] }}
                label="Zalando (ZFS) Stock"
              />
            </div>
          </div>

          {/* Incoming Shipments Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Incoming Shipments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FileUpload
                onFileUpload={(file) => handleFileUpload(file, 'incoming-amazon')}
                accept={{ 'text/csv': ['.csv'], 'text/tab-separated-values': ['.tsv'] }}
                label="Incoming Amazon Shipments"
              />
              <FileUpload
                onFileUpload={(file) => handleFileUpload(file, 'incoming-zalando')}
                accept={{ 'text/csv': ['.csv'] }}
                label="Incoming Zalando Shipments"
              />
            </div>
          </div>

          {/* Historical Sales Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Historical Sales Data (Last 12 Months)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FileUpload
                onFileUpload={(file) => handleFileUpload(file, 'sales-amazon')}
                accept={{ 'text/csv': ['.csv'] }}
                label="Amazon Sales History"
              />
              <FileUpload
                onFileUpload={(file) => handleFileUpload(file, 'sales-zalando')}
                accept={{ 'text/csv': ['.csv'] }}
                label="Zalando Sales History"
              />
            </div>
          </div>

          {/* Results Table */}
          {products.length > 0 && (
            <div className="bg-white rounded-lg shadow">
              <StockTable products={products} recommendations={recommendations} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;