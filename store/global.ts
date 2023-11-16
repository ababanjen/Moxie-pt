import { create } from 'zustand'

type Pokemon = {
  list: null | any[],
  setList: (payload: null | any[]) => void,
  profile: null | any,
  setProfile: (payload: null | any) => void,
  count: number
}
const useGlobalStore = create<Pokemon>((set) => ({
  count: 12,
  list: null,
  setList: (payload) => set(() => ({ list: payload })),
  profile: null,
  setProfile: (payload) => set(() => ({ profile: payload })),
}));

export default useGlobalStore