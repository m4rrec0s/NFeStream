import { useEffect, useState, useMemo, useRef } from "react"
import { AxiosInstance, AxiosRequestConfig } from "axios"

interface ConfigRequests {
  axiosClient: AxiosInstance
  method: "get" | "post" | "put" | "delete" | "patch" | "head" | "options"
  url: string
  moreConfigs?: AxiosRequestConfig
}

interface UseAxiosReturn<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export default function useAxios<T = unknown>(
  configRequests: ConfigRequests,
): UseAxiosReturn<T> {
  const { axiosClient, method, url, moreConfigs = {} } = configRequests

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const axiosClientRef = useRef(axiosClient)
  const memoizedMoreConfigs = useMemo(
    () => moreConfigs,
    [JSON.stringify(moreConfigs)],
  )

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axiosClientRef.current[method](url, {
          ...memoizedMoreConfigs,
          signal: controller.signal,
        })
        setData(res.data)
      } catch (err: unknown) {
        if (err instanceof Error && err.message !== "canceled") {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [method, url, memoizedMoreConfigs])

  return { data, loading, error }
}
