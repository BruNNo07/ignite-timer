import { createContext, ReactNode, useState } from "react";

interface CreateCycleData{
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
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
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [cycles,setCycles] = useState<Cycle[]>([])
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentActiveCycleAsFinished() {
    setCycles((state) =>
        state.map(cycle => {
            if(cycle.id === activeCycleId){
                return { ...cycle, finishedDate: new Date() }
            } else {
                return cycle
            }
        })
    )
  }

  function createNewCycle(data: CreateCycleData){
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
        id,
        task: data.task,
        minutesAmount: data.minutesAmount,
        startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }   

  function interruptCurrentCycle(){
      setCycles((state) =>
      state.map(cycle => {
          if(cycle.id === activeCycleId){
              return { ...cycle, interruptedDate: new Date() }
          } else {
              return cycle
          }
      }))
      setActiveCycleId(null)
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