"use client"
import { useRouter } from "next/navigation"
import useGlobalStore from "../../store/global"

const List = () => {
  const { list, count } = useGlobalStore()
  const { push } = useRouter()
  if (!list) return null
  const onSelectPokemon = (pokemon: { name: string, url: string }) => {
    push(`/profile/${pokemon.name}`)
  }
  return (
    <div className="m-16">
      <span className="text-lg font-semibold">Pokemon List of {count}</span>
      <ul className="flex gap-3 flex-col">
        {
          list?.map((item, idx) => (
            <li key={`${item.name}-${idx}`} onClick={() => onSelectPokemon(item)}>
              <div className="hover:bg-blue-100 cursor-pointer flex flex-col p-2 gap-2 border border-gray-300 rounded">
                <span className="text-md capitalize">{item.name}</span>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default List