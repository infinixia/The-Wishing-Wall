import type React from "react"
import type { Wish } from "../utils/api"
import { ChevronUp } from "lucide-react"

interface WishCardProps {
  wish: Wish
}

const WishCard: React.FC<WishCardProps> = ({ wish }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex items-start mb-4">
        <img src={wish.pfp || "/placeholder.svg"} alt={wish.display_name} className="w-10 h-10 rounded-full mr-4" />
        <div className="flex-grow">
          <h3 className="font-semibold text-gray-800">{wish.display_name}</h3>
          <p className="text-gray-600 break-words">{wish.text}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <ChevronUp className="text-gray-400 mr-1" size={20} />
          <span className="text-sm text-gray-600">{wish.upvotes}</span>
        </div>
        {wish.reactions && wish.reactions.length > 0 && (
          <div className="flex">
            {wish.reactions.map((reaction, index) => (
              <span key={index} className="mr-2 text-sm bg-gray-100 rounded-full px-2 py-1">
                {reaction.name} {reaction.count}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default WishCard

