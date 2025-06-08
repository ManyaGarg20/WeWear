import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterCategory {
  name: string;
  options: string[];
}

interface FilterSidebarProps {
  categories: FilterCategory[];
  priceRange: [number, number];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (category: string, value: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  priceRange,
  selectedFilters,
  onFilterChange,
  onPriceChange,
  onClearFilters,
  isOpen,
  onClose,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    categories.reduce((acc, category) => ({ ...acc, [category.name]: true }), {})
  );

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories({
      ...expandedCategories,
      [categoryName]: !expandedCategories[categoryName],
    });
  };

  // Mobile class conditions
  const mobileClasses = isOpen
    ? 'fixed inset-0 z-40 transform translate-x-0 transition ease-in-out duration-300'
    : 'fixed inset-0 z-40 transform -translate-x-full transition ease-in-out duration-300';

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Mobile sidebar */}
      <div className={`${mobileClasses} md:hidden bg-white h-full overflow-y-auto pb-20`}>
        <div className="p-4 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
          <h2 className="text-lg font-medium">Filters</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        
        <div className="p-4">
          {renderFilterContent()}
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <div className="flex gap-3">
            <button
              onClick={onClearFilters}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-indigo-600 rounded-md text-white font-medium hover:bg-indigo-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        {renderFilterContent()}
      </div>
    </>
  );

  function renderFilterContent() {
    return (
      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-3 text-gray-900">Price Range</h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => onPriceChange([Number(e.target.value), priceRange[1]])}
              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              min="0"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              min={priceRange[0]}
            />
          </div>
        </div>

        {/* Filter Categories */}
        {categories.map((category) => (
          <div key={category.name} className="border-b pb-4 last:border-b-0">
            <button
              className="flex justify-between items-center w-full py-2 text-left font-medium text-gray-900"
              onClick={() => toggleCategory(category.name)}
            >
              {category.name}
              {expandedCategories[category.name] ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {expandedCategories[category.name] && (
              <div className="mt-2 space-y-1">
                {category.options.map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFilters[category.name]?.includes(option) || false}
                      onChange={() => onFilterChange(category.name, option)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Clear Filters - Only on desktop */}
        <div className="hidden md:block">
          <button
            onClick={onClearFilters}
            className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    );
  }
};

export default FilterSidebar;