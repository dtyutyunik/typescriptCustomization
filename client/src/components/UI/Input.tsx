import { forwardRef, ComponentPropsWithoutRef } from "react";

type InputProps = {
    label: string;
    id: string;
} & ComponentPropsWithoutRef<'input'>;
//since we arent adding ref, we are , we add 'input' to get all the standard details of input label

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { label, id, ...props }, ref) {

        
    return (
        <p>
            <label htmlFor={id}>{label}</label>
            {/* we set name to id, since id will be unique */}
            <input id={id} name={id} {...props} ref={ref} />
        </p>
    )
})

export default Input;