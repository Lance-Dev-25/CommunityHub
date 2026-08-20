import { useEffect, useState } from 'react'

export function useFetch(url) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshIndex, setRefreshIndex] = useState(0)

  useEffect(() => {
    let ignore = false

    async function loadData() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        const result = await response.json()

        if (!ignore) {
          setData(result)
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message)
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      ignore = true
    }
  }, [url, refreshIndex])

  function refetch() {
    setRefreshIndex((currentValue) => currentValue + 1)
  }

  return { data, setData, loading, error, refetch }
}
