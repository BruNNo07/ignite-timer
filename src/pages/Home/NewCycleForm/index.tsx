import { FormConteiner } from "../styles"

export const NewCycleForm () {
    return (
        <FormConteiner>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                     id="task"
                     type="text"
                     placeholder="Dê um nome para seu projeto"
                     disabled={!!activeCycle}
                     {...register('task')}
                    />

                    <label htmlFor="duration">durante</label>
                    <MinutesAmountInput
                    id="duration"
                    type="number"
                    placeholder="00"
                    step={5}
                    min={1}
                    max={60}
                    disabled={!!activeCycle}
                    {...register('minutesAmount', { valueAsNumber: true })}
                    />

                    <span>minutos</span>
        </FormConteiner>
    )
}