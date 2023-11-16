"use client"
import { useEffect } from "react"
import axiosRequest from "@/helpers/request/axios"
import { ParsedUrlQuery } from "querystring";
import clsx from "clsx";
import useGlobalStore from "@/store/global";
import Sprites from "../Sprites";
import Abilities from "../Abilities";
import { imgLoader } from "@/helpers/utils";
import Image from "next/image"
import { useRouter } from "next/navigation"
import dynamic from 'next/dynamic'

const DynamicMoves = dynamic(() => import('../Moves'), {
  loading: () => <p>Loading...</p>,
})

const Profile = ({ params }: ParsedUrlQuery | any) => {
  const { profile, setProfile } = useGlobalStore()
  const { push } = useRouter()

  const getPokemon = async () => {
    try {
      const data = await axiosRequest({
        url: `/pokemon/${params?.name ?? ''}`,
        method: "GET",
      })
      setProfile(data)
    } catch (err) {
      console.info(err)
    }
  }
  useEffect(() => {
    getPokemon()
    return () => {
      setProfile(null)
    }
  }, [])
  if (!profile) return null

  const back = () => push('/')

  return (
    <div className="flex flex-col gap-2 justify-center m-6">
      <div className="flex flex-col justify-center">
        <div className="flex-col flex gap-2 justify-center">
          <div className="items-center flex gap-2 justify-center">
            <span className="text-xl capitalize">{profile.name}</span>
            <div className={
              clsx({
                "w-3 h-3 rounded-full": true,
                "bg-red-500": !profile.is_default,
                "bg-green-500": profile.is_default
              })
            } />
          </div>
          <Sprites />
        </div>
        <div className="flex flex-col gap-2 justify-center w-full">
          <div className="flex gap-2 w-full justify-center">
            <span className="uppercase text-xs">Pokemon id: {profile.id}</span>
            <span className="uppercase text-xs">Order: {profile.order}</span>
          </div>
          <div className="flex gap-2 justify-center">
            <span className="flex gap-2 items-center text-xs"><Image loader={imgLoader} alt="xp" src="https://cdn-icons-png.flaticon.com/512/5542/5542205.png " width={20} height={20} /> {profile.base_experience}</span>
            <span className="flex gap-2 items-center text-xs"><Image loader={imgLoader} alt="xp" src="https://cdn-icons-png.flaticon.com/512/8902/8902134.png" width={20} height={20} /> {profile.height}</span>
          </div>
        </div>
      </div>
      <Abilities />
      <div className="mx-4">
        <span className="text-xs cursor-pointer hover:text-blue-300" onClick={back}>Back</span>
        <DynamicMoves />
      </div>
    </div>
  )
}

export default Profile
