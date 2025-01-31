"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import ReactFlow, { Background, Controls, type Node, useNodesState, useEdgesState } from "reactflow"
import "reactflow/dist/style.css"
import { searchMeilisearch, type Wish } from "@/lib/api"
import WishNode from "./WishNode"
import FilterSort from "./FilterSort"
import { ChevronLeft, ChevronRight } from "lucide-react"


const nodeTypes = {
  wish: WishNode,
}

const WishingWall: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [sortBy, setSortBy] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalHits, setTotalHits] = useState(0)

  const fetchWishes = useCallback(async () => {
    try {
      const offset = (currentPage - 1) * itemsPerPage
      const result = await searchMeilisearch(searchQuery, itemsPerPage, offset, sortBy)
      setWishes(result.hits)
      setTotalHits(result.estimatedTotalHits)
    } catch (error) {
      console.error("Failed to fetch wishes:", error)
    }
  }, [searchQuery, itemsPerPage, sortBy, currentPage])

  useEffect(() => {
    fetchWishes()
  }, [fetchWishes])

  useEffect(() => {
    const newNodes: Node[] = wishes.map((wish, index) => ({
      id: wish.ts,
      type: "wish",
      data: wish,
      position: { x: (index % 5) * 300, y: Math.floor(index / 5) * 300 },
    }))
    setNodes(newNodes)
  }, [wishes, setNodes])

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    setCurrentPage(1)
  }
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }
  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items)
    setCurrentPage(1)
  }
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const filterIndicators = [
    currentPage > 1 && `p-${currentPage}`,
    sortBy && `filter=${sortBy}`,
    searchQuery && `search?query=${searchQuery}`,
    itemsPerPage !== 20 && `${itemsPerPage} per page`,
  ].filter(Boolean)

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex flex-wrap justify-between items-center">
        <FilterSort
          onSortChange={handleSortChange}
          onSearch={handleSearch}
          onItemsPerPageChange={handleItemsPerPageChange}
          itemsPerPage={itemsPerPage}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {filterIndicators.map((indicator, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {indicator}
            </span>
          ))}
        </div>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-blue-500 text-sm border border-blue-500 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm">
          Page {currentPage} of {Math.ceil(totalHits / itemsPerPage)}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= totalHits}
          className="px-3 py-1 text-blue-500 text-sm border border-blue-500 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

export default WishingWall

