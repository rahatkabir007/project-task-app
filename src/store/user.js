// counter.js
import { create } from 'zustand'

const useUserStore = create(set => ({
    //here are the states
    user: null,


    // here are the actions
    setUser: (data) => set({ data }),
    
}))

export default useUserStore