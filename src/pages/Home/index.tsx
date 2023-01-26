import { HandPalm, Play } from "phosphor-react";
import { CountDownConteiner,HomeConteiner, FormConteiner, Separator, StartCountDownButton, TaskInput, MinutesAmountInput,StopCountDownButton } from "./styles"
import { useForm } from 'react-hook-form'
import { zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(1).max(60)
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

export function Home() {
    const { register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    }) 

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

    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

    const task = watch('task')
    const isSubmitDisabled = !task

    const [cycles,setCycles] = useState<Cycle[]>([])

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2,"0")
    const seconds = String(secondsAmount).padStart(2,"0")

    useEffect(() =>{
        let interval: number;
        if(activeCycle){
            interval = setInterval(()=>{
                const secondsDifference = differenceInSeconds(
                    new Date(),
                    activeCycle.startDate
                )
                
                if (secondsDifference >= totalSeconds){
                    setCycles((state) =>
                    state.map(cycle => {
                        if(cycle.id === activeCycleId){
                            return { ...cycle, finishedDate: new Date() }
                        } else {
                            return cycle
                        }
                    }))

                    setAmountSecondsPassed(totalSeconds)
                    clearInterval(interval)
                } else {
                    setAmountSecondsPassed(secondsDifference)
                }
            },1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds, activeCycleId])

    useEffect(()=> {
        if(activeCycle){
            document.title = `${minutes} : ${seconds}`
        }
        
    },[minutes,seconds,activeCycle])

    return (
        <HomeConteiner>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                
            

            <CountDownConteiner>
                <span>{minutes[0]}</span>
                <span>{minutes[1]}</span>
                <Separator>:</Separator>
                <span>{seconds[0]}</span>
                <span>{seconds[1]}</span>
            </CountDownConteiner>

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