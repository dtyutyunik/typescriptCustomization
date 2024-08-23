import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"

//example of polymorphic component

//will be used as a type that is ElementType
type ContainerProps<T extends ElementType> = {
    as?: T;
    children: ReactNode;
} & ComponentPropsWithoutRef<T>;

export const Container = <C extends ElementType>({ as, children, ...props }: ContainerProps<C>) => {

    const Component = as || 'div';

    return (
        <Component {...props}>{children}</Component>
    )
}