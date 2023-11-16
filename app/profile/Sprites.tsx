import useGlobalStore from "@/store/global"
import { keys } from "lodash"
import Image from "next/image"
import { imgLoader } from "../../helpers/utils"

const Sprites = () => {
  const { profile } = useGlobalStore()
  const getSprites = () => {
    const spritesURL = keys(profile.sprites).map(key => {
      return {
        url: typeof profile.sprites[key] === "string" ? profile.sprites[key] : null,
        name: key
      }
    })
    return spritesURL
  }

  return (
    <div className="flex overflow-auto justify-center">
      {getSprites().map((sprite: any, key: number) => {
        return (
          sprite.url ?
            <Image loader={imgLoader} alt={sprite.name} key={key} src={sprite.url} width={100} height={100} /> : null
        )
      })}
    </div>
  )
}

export default Sprites