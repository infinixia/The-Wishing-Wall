"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import ReactFlow, { Background, Controls, type Node, useNodesState, useEdgesState } from "reactflow"
import "reactflow/dist/style.css"
import { searchMeilisearch, type Wish } from "../utils/api"
import WishNode from "./WishNode"
import FilterSort from "./FilterSort"

const nodeTypes = {
  wish: WishNode,
}

function getGridPosition(index: number, totalColumns: number) {
  const columnWidth = 300
  const rowHeight = 300
  const column = index % totalColumns
  const row = Math.floor(index / totalColumns)
  return {
    x: column * columnWidth,
    y: row * rowHeight,
  }
}

const WishingWall: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [searchQuery, setSearchQuery] = useState("")

  const fetchWishes = useCallback(async () => {
    try {
      const result = await searchMeilisearch(searchQuery, 1000, 0)
      setWishes(result.hits)
    } catch (error) {
      console.error("Failed to fetch wishes:", error)
    }
  }, [searchQuery])

  useEffect(() => {
    fetchWishes()
  }, [fetchWishes])

  useEffect(() => {
    const totalColumns = Math.ceil(Math.sqrt(wishes.length))
    const newNodes: Node[] = wishes.map((wish, index) => {
      const position = getGridPosition(index, totalColumns)
      return {
        id: wish.ts,
        type: "wish",
        data: wish,
        position,
      }
    })
    setNodes(newNodes)
  }, [wishes, setNodes])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="h-screen flex flex-col">
      <FilterSort onSearch={handleSearch} />
      <div className="flex-grow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.1 }}
          minZoom={0.1}
          maxZoom={2}
        >
          <Background color="#f0f0f0" variant="dots" />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  )
}

export default WishingWall

