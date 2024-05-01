// counter.js
import { create } from 'zustand'

const useOtherStore = create(set => ({
    //here are the states
    random: 0,


    // here are the actions
    // increment: () => set(state => ({
    //     count: state.count + 1
    // })),
}))

export default useOtherStore