import { differenceInDays, parse } from 'date-fns';
import { Product, SalesData } from '../types';

export const calculateSeasonalMultiplier = (date: Date): number => {
  const month = date.getMonth();
  const day = date.getDate();

  // November multiplier
  if (month === 10) return 2.0;
  // December first week
  if (month === 11 && day <= 7) return 1.5;
  // Mid-April to mid-August
  if ((month === 3 && day >= 15) || (month >= 4 && month <= 6) || (month === 7 && day <= 15)) return 1.5;
  
  return 1.0;
};

export const getDaysOfStock = (category: string): number => {
  switch (category) {
    case 'Headwear':
      return 21;
    case 'Clothing':
    case 'Jewelry':
      return 14;
    default:
      return 14;
  }
};

export const calculateAverageDailySales = (salesData: SalesData[]): number => {
  if (salesData.length === 0) return 0;

  const totalSales = salesData.reduce((sum, sale) => sum + sale.quantity, 0);
  const firstDate = parse(salesData[0].date, 'yyyy-MM-dd', new Date());
  const lastDate = parse(salesData[salesData.length - 1].date, 'yyyy-MM-dd', new Date());
  const daysDifference = differenceInDays(lastDate, firstDate) + 1;

  return totalSales / daysDifference;
};

export const calculateRecommendedStock = (
  product: Product,
  averageDailySales: number,
  seasonalMultiplier: number
): number => {
  const daysOfStock = getDaysOfStock(product.category);
  return Math.ceil(averageDailySales * daysOfStock * seasonalMultiplier);
};