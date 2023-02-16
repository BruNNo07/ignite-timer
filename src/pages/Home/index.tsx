import { HandPalm, Play } from "phosphor-react";
import { HomeConteiner,StartCountDownButton, StopCountDownButton } from "./styles"
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { createContext, useEffect, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CyclesContextType{
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentActiveCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType)

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(1).max(60)
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [cycles,setCycles] = useState<Cycle[]>([])
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    }) 

    const { handleSubmit, watch, reset} = newCycleForm

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

    function handleCreateNewCycle(data: NewCycleFormData){
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
        reset()
    }   

    function handleInterruptCycle(){
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

    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeConteiner>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
            <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentActiveCycleAsFinished,amountSecondsPassed,setSecondsPassed }}>
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <CountDown />
            </CyclesContext.Provider>
            {activeCycle ? (
                <StopCountDownButton onClick={handleInterruptCycle} type="button">
                    <HandPalm />
                    Interromper
                </StopCountDownButton>
            ) : (
            <StartCountDownButton disabled={isSubmitDisabled} type="submit">
                <Play />
                Começar
            </StartCountDownButton>
            )}
            </form>
        </HomeConteiner>
        
    )
}