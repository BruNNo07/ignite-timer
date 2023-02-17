import { ActionTypes } from "./Actions";
import { produce } from 'immer'

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CycleState{
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function CyclesReducer(state: CycleState, action:any) {
  switch(action.type) {
    case ActionTypes.ADD_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)

      if (currentCycleIndex < 0){
        return state
      }

      return produce(state, (draft) =>{
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
        return produce(state, (draft) =>{
          const currentCycleIndex = state.cycles.findIndex(cycle => cycle.id === state.activeCycleId)

          if (currentCycleIndex < 0){
            return state
          }
          draft.cycles[currentCycleIndex].finishedDate = new Date()
          draft.activeCycleId = null
        })
    default:
      return state;
  }
}
