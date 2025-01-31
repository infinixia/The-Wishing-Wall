import type React from "react"
import { useState } from "react"
import { Search } from "lucide-react"

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

