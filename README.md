# Timer App

This is a TypeScript-based React application for managing timers. The project showcases the use of React Context for state management along with custom hooks and TypeScript's type safety features. It provides a scalable approach for managing shared state across multiple components in a React application.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [TypeScript and Context](#typescript-and-context)
  - [Why Use Context with TypeScript?](#why-use-context-with-typescript)
  - [Custom Hooks and Guarding Against Null](#custom-hooks-and-guarding-against-null)
- [Code Examples](#code-examples)
  - [Context Setup](#context-setup)
  - [Timer Component with State Management](#timer-component-with-state-management)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Timer App allows users to manage multiple timers. The app leverages React Context to manage the state of the timers and whether they are running or paused. The state management is implemented using the `useReducer` hook with TypeScript, ensuring type safety and predictable state transitions.

## Features

- Add multiple timers with a name and duration.
- Start and stop all timers simultaneously.
- Display remaining time for each timer in real-time.
- Use TypeScript for strict type-checking and robust state management.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/timer-app.git
   cd timer-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running the App

To start the app in development mode, run:

```bash
npm start
```

The app will be accessible at `http://localhost:3000`.

## Project Structure

```plaintext
src/
├── components/
│   ├── TimerDesign.tsx
│   └── UI/
│       └── Container.tsx
├── store/
│   └── timers-context.tsx
├── App.tsx
├── index.tsx
└── types/
    └── Timer.ts
```

## TypeScript and Context

### Why Use Context with TypeScript?

In this app, React Context is used to manage the state of timers globally. By using TypeScript, we can ensure type safety when defining the context value, state, and actions. This prevents runtime errors and provides clear guidelines on how the context should be used throughout the app.

### Custom Hooks and Guarding Against Null

We created a custom hook, `useTimersContext`, to access the context more easily. The custom hook also includes a guard clause to handle cases where the context is `null`, ensuring that the app doesn’t crash due to improperly accessed context:

```typescript
export function useTimersContext() { // Custom Hook
    const timersCtx = useContext(TimersContext)
    if (timersCtx === null) { // Guard clause
        throw new Error('TimersContext is null');
    }
    return timersCtx;
}
```

This approach is especially useful when working with complex applications where multiple components depend on the context.

## Code Examples

### Context Setup

The context is defined using TypeScript, with a state that manages the list of timers and whether they are running or not:

```typescript
type Timer = {
    name: string;
    duration: number;
};

type TimersState = {
    isRunning: boolean;
    timers: Timer[];
};

const initialState: TimersState = {
    isRunning: true,
    timers: [],
};

type TimersContextValue = TimersState & {
    addTimer: (timerData: Timer) => void;
    startTimers: () => void;
    stopTimers: () => void;
};

const TimersContext = createContext<TimersContextValue | null>(null);
```

The reducer handles actions like starting, stopping, and adding timers:

```typescript
type Action = StartTimersAction | StopTimersAction | AddTimersAction;

function timersReducer(state: TimersState, action: Action): TimersState {
    switch (action.type) {
        case "ADD_TIMER":
            return {
                ...state,
                timers: [...state.timers, action.payload],
            };
        case "START_TIMERS":
            return {
                ...state,
                isRunning: true,
            };
        case "STOP_TIMERS":
            return {
                ...state,
                isRunning: false,
            };
        default:
            return state;
    }
}
```

### Timer Component with State Management

The `TimerDesign` component uses the `useTimersContext` hook to determine whether the timers should run or stop. It also utilizes `useRef` to manage the interval without triggering unnecessary re-renders:

```typescript
export default function TimerDesign({ name, duration }: TimerProps) {
    const interval = useRef<number | null>(null);
    const [remainingTime, setRemainingTime] = useState<number>(duration * 1000);
    const { isRunning } = useTimersContext();

    useEffect(() => {
        if (isRunning) {
            interval.current = setInterval(() => {
                setRemainingTime(prevTime => prevTime - 50);
            }, 50);
        } else {
            clearInterval(interval.current);
        }

        return () => {
            clearInterval(interval.current);
        };
    }, [isRunning]);

    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

    return (
        <Container as="article">
            <h2>{name}</h2>
            <p>
                <progress max={duration * 1000} value={remainingTime} />
            </p>
            <p>{formattedRemainingTime}</p>
        </Container>
    );
}
```

In this example:
- The `useRef` hook is used to manage the interval without causing re-renders.
- The `useEffect` hook monitors `isRunning` and controls the timer's state accordingly.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any feature requests or bug reports.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
