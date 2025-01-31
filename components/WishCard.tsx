import type React from "react"
import type { Wish } from "../utils/api"

interface WishCardProps {
  wish: Wish
}

const WishCard: React.FC<WishCardProps> = ({ wish }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        <img src={wish.pfp || "/placeholder.svg"} alt={wish.user} className="w-10 h-10 rounded-full mr-4" />
        <div>
          <h3 className="font-semibold">{wish.user}</h3>
          <p className="text-sm text-gray-500">
            {new Date(Number.parseInt(wish.ts.split("_")[0]) * 1000).toLocaleString()}
          </p>
        </div>
      </div>
      <p className="mb-4">{wish.text}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Upvotes: {wish.upvotes}</span>
        {wish.reactions && wish.reactions.length > 0 && (
          <div className="flex">
            {wish.reactions.map((reaction, index) => (
              <span key={index} className="mr-2">
                {reaction}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default WishCard

