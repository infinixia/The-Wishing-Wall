import type React from "react"
import { useState } from "react"
import { Search } from "lucide-react"
import { Star, TreesIcon as Tree } from 'lucide-react';

interface FilterSortProps {
  onSortChange: (sort: string) => void
  onSearch: (query: string) => void
  onItemsPerPageChange: (items: number) => void
  itemsPerPage: number
}

const FilterSort: React.FC<FilterSortProps> = ({ onSortChange, onSearch, onItemsPerPageChange, itemsPerPage }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleFilterChange = (type: string, value: string) => {
    if (type === "sort") onSortChange(value)
    if (type === "itemsPerPage") onItemsPerPageChange(Number(value))
  }

  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-4 rounded-lg bg-opacity-50 backdrop-filter backdrop-blur-sm flex flex-wrap justify-between items-center">
      <div className="flex items-center space-x-4 mb-4 md:mb-0">
        <select
          onChange={(e) => handleFilterChange("sort", e.target.value)}
          className="border rounded-md px-3 py-2 bg-white bg-opacity-75"
        >
          <option value="">Sort by</option>
          <option value="upvotes:desc">Most Upvoted</option>
          <option value="ts:desc">Latest</option>
          <option value="ts:asc">Oldest</option>
        </select>
        <select
          value={itemsPerPage}
          onChange={(e) => handleFilterChange("itemsPerPage", e.target.value)}
          className="border rounded-md px-3 py-2 bg-white bg-opacity-75"
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={40}>40 per page</option>
        </select>
      </div>
      <div className="flex justify-center items-center">
    <div className="relative w-96 h-15">
        <svg className="w-full h-full" viewBox="0 0 480 80" preserveAspectRatio="xMidYMid meet">
          <path
            d="M 48,16 Q 240,45 432,16 L 432,64 Q 240,88 48,64 Z"
            fill="none"
            stroke="#C41E3A"
            strokeWidth="3"
          />
          <defs>
            <path id="curve" d="M 48,48 Q 240,72 432,48" fill="transparent" />
          </defs> 
          <text className="fill-[#EF4444] text-4xl font-bold">
            <textPath href="#curve" startOffset="50%" textAnchor="middle">
              THE WISHING WALL 
            </textPath>
          </text>
        </svg>
        {/* <Star className="absolute top-0 left-0 w-6 h-6 text-yellow-400" /> */}
        {/* <Star className="absolute top-0 right-0 w-6 h-6 text-yellow-400" /> */}
        {/* <Tree className="absolute bottom-0 left-0 w-6 h-6 text-[#165B33]" /> */}
        {/* <Tree className="absolute bottom-0 right-0 w-6 h-6 text-[#165B33]" /> */}
    </div>
</div>


      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search wishes..."
          className="border rounded-l-md px-3 py-2 bg-white bg-opacity-75"
        />
        <button
          type="submit"
          className="bg-white bg-opacity-75 text-blue-500 px-3 py-2 rounded-r-md hover:bg-opacity-100 transition-colors border border-l-0 border-blue-500"
        >
          <Search size={20} />
        </button>
      </form>
    </div>
  )
}

export default FilterSort

