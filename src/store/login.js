// counter.js
import { create } from 'zustand'

const useLoginStore = create(set => ({
    //here are the states
    token: null,


    // here are the actions
    setToken: (token) => set({ token }),
    logout: () => set({ token: null })

}))

export default useLoginStore