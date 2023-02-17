import { differenceInSeconds } from "date-fns";
import { createContext, ReactNode, useState, useReducer, useEffect } from "react";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycle/Actions";
import { Cycle, CyclesReducer } from "../reducers/cycle/Reducer";

interface CreateCycleData{
  task: string;
  minutesAmount: number;
}

interface CyclesContextType{
  cycles: Array<Cycle>;
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentActiveCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode;
}
export function CyclesContextProvider ({ children }: CyclesContextProviderProps ){
  const [cyclesState, dispatch] = useReducer(CyclesReducer,{
    cycles:[],
    activeCycleId: null,
  }, (initialState) =>{
    const storageStateAsJSON = localStorage.getItem('@ignite-timer:cyclesState-1.0.0')

    if (storageStateAsJSON){
      return JSON.parse(storageStateAsJSON)
    }

    return initialState
    })

  useEffect(()=>{
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cyclesState-1.0.0', stateJSON)
  },[cyclesState])

  const { activeCycleId, cycles } = cyclesState
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(() =>{
    if (activeCycle){
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    
    return 0
  })

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentActiveCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function createNewCycle(data: CreateCycleData){
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
        id,
        task: data.task,
        minutesAmount: data.minutesAmount,
        startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }   

  function interruptCurrentCycle(){
      dispatch(interruptCurrentCycleAction())
  }

  return(
    <CyclesContext.Provider value={{
      cycles,
      activeCycle, 
      activeCycleId, 
      markCurrentActiveCycleAsFinished,
      amountSecondsPassed,
      setSecondsPassed ,
      createNewCycle,
      interruptCurrentCycle,
    }}>
    {children}
    </CyclesContext.Provider>
  )
}