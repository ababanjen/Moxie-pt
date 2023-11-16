"use client"
import axiosRequest from "@/helpers/request/axios"
import useGlobalStore from "@/store/global"
import { useCallback, useEffect, useState } from "react"

const Moves = () => {
  const [moves, setMoves] = useState<any>(null)
  const { profile } = useGlobalStore()
  const getMoves = useCallback(() => {
    const promises = profile.moves.map(async (item: any) => {
      const result = await fetchMoves(item.move.url)
      return result
    });

    Promise.all(promises).then(results => {
      const data = results.map(result => result);
      setMoves(data)
    })
  }, [moves]);

  useEffect(() => {
    if (!moves) {
      getMoves()
    }
  }, [])



  if (!profile.moves) return null
  const fetchMoves = async (url: string) => {
    try {
      const data = axiosRequest({
        customURL: url,
        method: "GET",
        params: {
          limit: 1
        }
      })
      return data
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div key={moves} className="flex flex-col gap-2 border rounded-md p-6">
      <span className="text-lg font-semibold">Moves</span>
      <div className="columns-2 md:columns-4 lg:columns-6">
        {moves ? moves.map((pokemonMove: any, key: number) => (
          <div className="flex flex-col p-2 hover:bg-slate-400 hover:text-white" key={key}>
            <span className="font-semibold capitalize">{pokemonMove.name}</span>
            <span className="capitalize text-xs">effect chance:{pokemonMove.acceffect_chanceuracy ?? 0}</span>
            <span className="capitalize text-xs">accuracy:{pokemonMove.accuracy ?? 0}</span>
            <span className="capitalize text-xs">power:{pokemonMove.power ?? 0}</span>
            <span className="capitalize text-xs">pp:{pokemonMove.pp ?? 0}</span>
          </div>
        )) : <span className="flex w-full justify-center text-xs italic">Not available</span>}
      </div>
    </div>
  )
}

export default Moves

