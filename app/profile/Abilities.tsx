import useGlobalStore from "@/store/global"

const Abilities = () => {
  const { profile } = useGlobalStore()
  if (!profile.abilities) return null
  return (
    <div className="flex flex-col justify-center w-full items-center">
      <span className="flex flex-col justify-center items-center text-lg font-semibold">Abilities</span>
      <ul className="flex justify-center gap-2">
        {
          profile?.abilities.map((ability: any, key: number) => (
            <li key={`${key}-${ability.ability.name}`}>
              <span className="capitalize text-xs flex flex-col justify-center">{ability.ability.name}</span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Abilities