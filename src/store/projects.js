// counter.js
import {create} from 'zustand'

const useProjectStore = create(set => ({
    //here are the states
    project: 0,


    // here are the actions
    // increment: () => set(state => ({
    //     count: state.count + 1
    // })),
}))

export default useProjectStore