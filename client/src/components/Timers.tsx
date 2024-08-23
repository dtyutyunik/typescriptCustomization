import { useTimersContext } from "./store/timers-context";
import TimerDesign from "./Timer";

const Timers = () => {

    const { timers } = useTimersContext()

    return (
        <ul>
            {timers.map(timer => <li key={timer.name}>
                <TimerDesign {...timer}></TimerDesign>
            </li>)}
        </ul>
    )
}
export default Timers
    ;