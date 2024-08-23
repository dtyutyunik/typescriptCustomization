
import { Button } from './UI/Button';
import { useTimersContext } from './store/timers-context';

export default function Header() {
    const timersCtx = useTimersContext(); //now this is never null

    return (
        <header>
            <h1>ReactTimer</h1>
            <Button onClick={timersCtx.isRunning ? timersCtx.stopTimers : timersCtx.startTimers}>
                {timersCtx.isRunning ? 'Stop' : 'Start'}
            </Button>
        </header>
    )
}
