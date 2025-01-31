import type React from "react"
import { useState } from "react"
import { Search, Star, TreePine } from "lucide-react"

interface FilterSortProps {
  onSearch: (query: string) => void
}

const FilterSort: React.FC<FilterSortProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex-1" />
        <div className="flex justify-center items-center flex-1">
          <div className="relative w-72 h-16">
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
              <text className="fill-[#EF4444] text-3xl font-bold">
                <textPath href="#curve" startOffset="50%" textAnchor="middle">
                  THE WISHING WALL
                </textPath>
              </text>
            </svg>
            <Star className="absolute top-0 left-0 w-5 h-5 text-yellow-400 animate-pulse" />
            <Star className="absolute top-0 right-0 w-5 h-5 text-yellow-400 animate-pulse" />
            <TreePine className="absolute bottom-0 left-0 w-5 h-5 text-[#165B33] animate-bounce" />
            <TreePine className="absolute bottom-0 right-0 w-5 h-5 text-[#165B33] animate-bounce" />
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search wishes..."
              className="border rounded-l-md px-2 py-1 w-40 text-sm bg-white/75"
            />
            <button
              type="submit"
              className="bg-blue-500/75 text-white px-2 py-1 rounded-r-md hover:bg-blue-600/75 transition-colors"
            >
              <Search size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FilterSort

