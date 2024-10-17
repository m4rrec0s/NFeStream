import { useEffect, useRef, useState, useMemo } from "react"
import { AxiosInstance, AxiosRequestConfig } from "axios"

interface ConfigRequests {
  axiosClient: AxiosInstance
  method: "get" | "post" | "put" | "delete" | "patch" | "head" | "options"
  url: string
  moreConfigs?: AxiosRequestConfig
}

interface UseAxiosReturn {
  data: unknown[]
  loading: boolean
  error: string
}

export default function useAxios(
  configRequests: ConfigRequests,
): UseAxiosReturn {
  const { axiosClient, method, url, moreConfigs = {} } = configRequests
  const [data, setData] = useState<unknown[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")
  const effectRun = useRef(false)
  const moreConfigsString = JSON.stringify(moreConfigs)
  const memoizedMoreConfigs = useMemo(() => moreConfigs, [moreConfigsString])

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        const res = await axiosClient[method](url, {
          ...memoizedMoreConfigs,
          signal: controller.signal,
        })
        setData(res.data)
      } catch (err: unknown) {
        if (err instanceof Error && err.message === "canceled") {
          console.log("Requisição cancelada")
        } else {
          setError((err as Error).message)
        }
      } finally {
        setLoading(false)
      }
    }

    if (!effectRun.current) {
      effectRun.current = true
      fetchData()
    } else if (memoizedMoreConfigs) {
      fetchData()
    }

    return () => {
      controller.abort()
    }
  }, [axiosClient, method, url, memoizedMoreConfigs])

  return { data, loading, error }
}
