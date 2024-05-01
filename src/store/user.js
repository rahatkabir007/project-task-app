// counter.js
import { create } from 'zustand'

const useUserStore = create(set => ({
    //here are the states
    user: {},


    // here are the actions
    setUser: (data) => set({ user: data }),
    
}))

export default useUserStore