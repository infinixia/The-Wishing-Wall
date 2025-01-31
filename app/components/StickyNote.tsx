import { ChevronUp } from 'lucide-react'

interface StickyNoteProps {
  wish: {
    id: number
    content: string
    author: string
    avatar: string
    upvotes: number
  }
  onUpvote: (id: number) => void
}

const colors = [
  'bg-red-200 dark:bg-red-800',
  'bg-yellow-200 dark:bg-yellow-800',
  'bg-green-200 dark:bg-green-800',
  'bg-blue-200 dark:bg-blue-800',
  'bg-indigo-200 dark:bg-indigo-800',
  'bg-purple-200 dark:bg-purple-800',
  'bg-pink-200 dark:bg-pink-800',
]

const StickyNote = ({ wish, onUpvote }: StickyNoteProps) => {
  const colorClass = colors[wish.id % colors.length]

  return (
    <div 
      className={`${colorClass} p-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 flex flex-col justify-between`}
      style={{ minHeight: '200px' }}
    >
      <p className="text-gray-800 dark:text-gray-200 font-semibold mb-4 text-lg">{wish.content}</p>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <img src={wish.avatar} alt={wish.author} className="w-10 h-10 rounded-full mr-3 border-2 border-white dark:border-gray-800" />
          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{wish.author}</span>
        </div>
        <button 
          onClick={() => onUpvote(wish.id)}
          className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 bg-white dark:bg-gray-700 rounded-full px-3 py-1 transition-colors duration-200"
        >
          <ChevronUp size={18} />
          <span className="font-bold">{wish.upvotes}</span>
        </button>
      </div>
    </div>
  )
}

export default StickyNote

