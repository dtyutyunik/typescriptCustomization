import { createContext, ReactNode, useContext, useReducer } from "react";
export type Timer = {
    name: string;
    duration: number
}
type TimersState = {
    isRunning: boolean;
    timers: Timer[]
}

const initialState: TimersState = {
    isRunning: true,
    timers: [],
}

type TimersContextValue = TimersState & {
    addTimer: (timerData: Timer) => void;
    startTimers: () => void;
    stopTimers: () => void
}

const TimersContext = createContext<TimersContextValue | null>(null);

export function useTimersContext() { //custom hooks
    const timersCtx = useContext(TimersContext)
    if (timersCtx === null) { //this is called guard railing
        throw new Error('TimersContext is null');
    }
    return timersCtx;
}

type TimersContextProviderProps = {
    children: ReactNode
}

type StartTimersAction = {
    type: 'START_TIMERS'
}
type StopTimersAction = {
    type: 'STOP_TIMERS'
}
type AddTimersAction = {
    type: 'ADD_TIMER',
    payload: Timer
}

//the reason we did this is so payload is only for AddTimersAction
type Action = StartTimersAction | StopTimersAction | AddTimersAction;

// type Action = {
//     type: 'ADD_TIMER' | 'START_TIMERS' | 'STOP_TIMERS';
//     payload?: Timer
// }

function timersReducer(state: TimersState, action: Action): TimersState {
    if (action.type === "ADD_TIMER") {
        return {
            ...state,
            timers: [
                ...state.timers,
                {
                    name: action.payload.name,
                    duration: action.payload.duration
                }
            ]
        }
    }
    if (action.type === "START_TIMERS") {
        return {
            ...state, //keeping old state
            isRunning: true
        }
    }
    if (action.type === "STOP_TIMERS") {
        return {
            ...state, //keeping old state
            isRunning: false
        }

    }
    return state;
}

export default function TimersContextProvider({ children }: TimersContextProviderProps) {
    const [timersState, dispatch] = useReducer(timersReducer, initialState);

    const ctx: TimersContextValue = {
        timers: timersState.timers,
        isRunning: timersState.isRunning,
        addTimer(timerData) {
            dispatch({ type: 'ADD_TIMER', payload: timerData });
        },
        startTimers() {
            dispatch({ type: 'START_TIMERS' });
        },
        stopTimers() {
            dispatch({ type: 'STOP_TIMERS' });
        }
    }
    return (
        <TimersContext.Provider value={ctx}>
            {children}
        </TimersContext.Provider>
    )
}