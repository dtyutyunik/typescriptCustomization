import { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    href?: never;
};

type AnchorProps = ComponentPropsWithoutRef<'a'> & {
    href?: string;
};

//returns boolean but if boolean value is true, then it is a specific type, called predicates
function isAnchorProps(props: ButtonProps | AnchorProps): props is AnchorProps {
    return 'href' in props;
}


export const Button = (props: ButtonProps | AnchorProps) => {

    if (isAnchorProps(props)) {
        return <a className="button" {...props}></a>
    }

    return (
        <button className="button" {...props}></button>
    )
}