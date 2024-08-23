import { useRef } from "react";

import { Button } from './UI/Button';
import Form, { FormHandle } from './UI/Form';
import Input from './UI/Input';
import { useTimersContext } from "./store/timers-context";

export const AddTimer = () => {
    const form = useRef<FormHandle>(null);
    const { addTimer } = useTimersContext();

    function handleSaveTimer(data: unknown) {
        const extractedData = data as { name: string, duration: string };
        // console.log(extractedData);
        addTimer({
            name: extractedData.name,
            duration: +extractedData.duration //the + converts the string to a number
        })
        form.current?.clear();
    }

    return (
        <Form ref={form} onSave={handleSaveTimer} id="add-timer">
            <Input type="text" label="Name" id="name" />
            <Input type="number" label="Duration" id="duration" />
            <p>
                <Button>Add timer</Button>
            </p>
        </Form>
    )
}


