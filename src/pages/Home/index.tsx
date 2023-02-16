import { HandPalm, Play } from "phosphor-react";
import { HomeConteiner,StartCountDownButton, StopCountDownButton } from "./styles"
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { createContext, useContext, useEffect, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";
import { CyclesContext } from "../../contexts/CyclesContexts";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(1).max(60)
  })
  
  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const { createNewCycle, interruptCurrentCycle, activeCycle } = useContext(CyclesContext)
    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    }) 

    const { handleSubmit, watch, reset} = newCycleForm

    function handleCreateNewCycle (data: NewCycleFormData){
        createNewCycle(data)
        reset()
    }

    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeConteiner>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <CountDown />
            {activeCycle ? (
                <StopCountDownButton onClick={interruptCurrentCycle} type="button">
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