"use client"
import { useEffect } from "react"
import List from "./components/List"
import axiosRequest from "../helpers/request/axios"
import useGlobalStore from "../store/global"

const Page = () => {
  const { setList, count } = useGlobalStore()
  const getData = async () => {
    try {
      const data = await axiosRequest({
        url: `/pokemon`,
        method: "GET",
        params: {
          limit: count
        }
      })
      setList(data.results)
    } catch (err) {
      console.info(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <List />
    </div>
  )
}

export default Page