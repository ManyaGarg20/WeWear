import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import FilterSidebar from '../components/filter/FilterSidebar';
import { mockProducts } from '../data/mockData';
import { Product } from '../types/Product';

const BrowsePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('relevance');

  // Get category from URL if it exists
  const categoryFromUrl = searchParams.get('category');
  const searchFromUrl = searchParams.get('search');

  // Filter categories
  const filterCategories = [
    { 
      name: 'Category', 
      options: ['Women', 'Men', 'Kids', 'Accessories', 'Shoes'] 
    },
    { 
      name: 'Size', 
      options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] 
    },
    { 
      name: 'Condition', 
      options: ['New with tags', 'Like new', 'Good', 'Fair'] 
    },
    { 
      name: 'Brand', 
      options: ['Nike', 'Adidas', 'Zara', 'H&M', 'Levi\'s', 'Gap'] 
    },
    { 
      name: 'Color', 
      options: ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink'] 
    },
  ];

  // Initialize filters from URL params
  useEffect(() => {
    const newFilters: Record<string, string[]> = {};
    
    if (categoryFromUrl) {
      const formattedCategory = categoryFromUrl.charAt(0).toUpperCase() + categoryFromUrl.slice(1);
      newFilters['Category'] = [formattedCategory];
    }
    
    setSelectedFilters(newFilters);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFromUrl]);

  // Apply filters when they change
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchFromUrl) {
      const search = searchFromUrl.toLowerCase();
      result = result.filter(
        product => 
          product.title.toLowerCase().includes(search) || 
          product.brand.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search)
      );
    }
    
    // Apply category filters
    Object.entries(selectedFilters).forEach(([category, values]) => {
      if (values.length > 0) {
        result = result.filter(product => {
          if (category === 'Category') {
            return values.some(value => 
              product.category.toLowerCase() === value.toLowerCase()
            );
          }
          if (category === 'Size') {
            return values.includes(product.size);
          }
          if (category === 'Condition') {
            return values.includes(product.condition);
          }
          if (category === 'Brand') {
            return values.some(value => 
              product.brand.toLowerCase() === value.toLowerCase()
            );
          }
          if (category === 'Color') {
            return values.some(value => 
              product.colors.includes(value.toLowerCase())
            );
          }
          return true;
        });
      }
    });
    
    // Apply price filter
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    if (sortBy === 'price_low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    setFilteredProducts(result);
  }, [selectedFilters, priceRange, sortBy, products, searchFromUrl]);

  const handleFilterChange = (category: string, value: string) => {
    setSelectedFilters(prev => {
      const prevValues = prev[category] || [];
      if (prevValues.includes(value)) {
        return {
          ...prev,
          [category]: prevValues.filter(v => v !== value)
        };
      } else {
        return {
          ...prev,
          [category]: [...prevValues, value]
        };
      }
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
    setPriceRange([0, 500]);
  };

  const toggleFavorite = (productId: number) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, isFavorite: !product.isFavorite } 
          : product
      )
    );
  };

  // Count active filters
  const activeFilterCount = Object.values(selectedFilters).flat().length + 
    (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0);

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in">
      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {categoryFromUrl ? categoryFromUrl.charAt(0).toUpperCase() + categoryFromUrl.slice(1) : 'All Products'}
            </h1>
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found
            </p>
          </div>
          
          {/* Sort & View Options */}
          <div className="flex items-center mt-4 md:mt-0 space-x-4">
            <div className="flex items-center">
              <span className="mr-2 text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="relevance">Relevance</option>
                <option value="newest">Newest</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md ${
                  viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'
                }`}
                aria-label="Grid view"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md ${
                  viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'
                }`}
                aria-label="List view"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-700 hover:bg-gray-50"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-1">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-medium text-gray-900 flex items-center">
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Filters
                </h2>
                {activeFilterCount > 0 && (
                  <span className="bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              
              <FilterSidebar
                categories={filterCategories}
                priceRange={priceRange}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onPriceChange={setPriceRange}
                onClearFilters={handleClearFilters}
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid 
              products={filteredProducts} 
              onAddToFavorites={toggleFavorite} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;