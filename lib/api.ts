const MEILISEARCH_URL = process.env.NEXT_PUBLIC_MEILISEARCH_URL
const SEARCH_API_KEY = process.env.NEXT_PUBLIC_SEARCH_API_KEY

export interface Wish {
  ts: string
  user: string
  text: string
  reactions?: Array<{ name: string; count: number }>
  upvotes: number
  pfp: string
}

export interface SearchResult {
  hits: Wish[]
  query: string
  processingTimeMs: number
  limit: number
  offset: number
  estimatedTotalHits: number
}

export async function searchMeilisearch(query = "", limit = 20, offset = 0, sortBy = ""): Promise<SearchResult> {
  if (!MEILISEARCH_URL || !SEARCH_API_KEY) {
    throw new Error("Meilisearch URL or Search API key is not defined")
  }

  try {
    const response = await fetch(`${MEILISEARCH_URL}/indexes/wishes/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SEARCH_API_KEY}`,
      },
      body: JSON.stringify({
        q: query,
        limit,
        offset,
        sort: sortBy ? [sortBy] : undefined,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

