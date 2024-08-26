'use client'

import React, { useState, useEffect } from 'react';

type Item = {
  item: string;
  price: number;
  points: number;
  valuePerPoint?: number;
};

const Calculator: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/data');
        const jsonData: Item[] = await response.json();
        const itemsWithValue = jsonData.map(item => ({
          ...item,
          valuePerPoint: item.price / item.points,
        }));
        itemsWithValue.sort((a, b) => b.valuePerPoint - a.valuePerPoint);
        setData(itemsWithValue);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getDealLabel = (tier: number): string => {
    if (tier >= 0.0025) return "Best Deals";
    if (tier >= 0.0020) return "Amazing Deals";
    if (tier >= 0.0015) return "Great Deals";
    if (tier >= 0.0010) return "Good Deals";
    if (tier >= 0.0005) return "Bad Deals";
    return "Bad Deals";
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-yellow-100 to-red-100">
      <header className="w-full bg-red-600 text-white p-4 text-center shadow-lg">
        <h1 className="text-4xl font-bold">McDonald's Rewards</h1>
        <p className="text-lg">Spend Smart, Save More</p>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center">
            <div className="animate-pulse inline-block w-12 h-12 bg-red-400 rounded-full"></div>
            <p className="mt-2">Loading your rewards...</p>
          </div>
        ) : (
          <>
            {Array.from(new Set(data.map(item => Math.floor(item.valuePerPoint! * 2000) / 2000))).sort((a, b) => b - a).map((tier) => (
              <div key={tier} className="my-8">
                <h2 className="text-2xl font-bold text-red-700 mb-4 text-center">
                  {getDealLabel(tier)}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {data.filter(item =>
                    item.valuePerPoint! >= tier && item.valuePerPoint! < tier + 0.0005
                  ).map((item, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                      <div className="p-4">
                        <h2 className="text-xl font-semibold text-red-600">{item.item}</h2>
                        <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                        <p className="text-gray-600">Points: {item.points}</p>
                        <p className="text-green-600 font-bold">Value per point: ${item.valuePerPoint!.toFixed(7)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
};

export default Calculator;
