// counter.js
import { create } from 'zustand'

const useTaskStore = create(set => ({
    //here are the states
    task: 0,


    // here are the actions
    // increment: () => set(state => ({
    //     count: state.count + 1
    // })),
}))

export default useTaskStore