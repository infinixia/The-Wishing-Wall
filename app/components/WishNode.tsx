import type React from "react"
import { useState } from "react"
import { Handle, Position } from "reactflow"
import type { Wish } from "../utils/api"

interface WishNodeProps {
  data: Wish
}

const WishNode: React.FC<WishNodeProps> = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false)

  const formatText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = text.split(urlRegex)

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline inline-block max-w-full truncate"
          >
            {part}
          </a>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 border w-64 h-64 overflow-hidden transition-all duration-300 ${
        isHovered ? "border-blue-500 shadow-lg scale-105" : "border-gray-200"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <div className="flex flex-col h-full">
        <div className="flex items-start mb-2">
          <img
            src={data.pfp || "/placeholder.svg"}
            alt={data.display_name}
            className="w-10 h-10 rounded-full mr-4 flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-800 text-left truncate">{data.display_name}</h3>
            {isHovered && <p className="text-xs text-gray-500">{formatDate(data.ts)}</p>}
          </div>
        </div>
        <div className="flex-grow overflow-y-auto text-sm">
          <p className="text-gray-600 break-words">{formatText(data.text)}</p>
        </div>
        {data.upvotes > 0 && (
          <div className="flex items-center mt-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/upvote-CjHQaj69MmxEGmYgGJIa1ebQYlSEyq.png"
              alt="Upvote"
              className="w-4 h-4 mr-1"
            />
            <span className="text-sm text-gray-600">{data.upvotes}</span>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  )
}

export default WishNode

