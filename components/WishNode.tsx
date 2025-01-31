import type React from "react"
import { memo } from "react"
import { Handle, Position } from "reactflow"
import type { Wish } from "@/lib/api"

interface WishNodeProps {
  data: Wish
}

const WishNode: React.FC<WishNodeProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-64">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center mb-4">
        <img src={data.pfp || "/placeholder.svg"} alt={data.user} className="w-10 h-10 rounded-full mr-4" />
        <div>
          <h3 className="font-semibold">{data.user}</h3>
          <p className="text-sm text-gray-500">
            {new Date(Number.parseInt(data.ts.split("_")[0]) * 1000).toLocaleString()}
          </p>
        </div>
      </div>
      <p className="mb-4">{data.text}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Upvotes: {data.upvotes}</span>
        {data.reactions && data.reactions.length > 0 && (
          <div className="flex">
            {data.reactions.map((reaction, index) => (
              <span key={index} className="mr-2">
                {reaction.name} ({reaction.count})
              </span>
            ))}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default memo(WishNode)

