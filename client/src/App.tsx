import './App.css';
import Timers from './components/Timers';
import Header from './components/Header';
import { AddTimer } from './components/AddTimer';
import TimersContextProvider from './components/store/timers-context';

function App() {
  return (
    <TimersContextProvider>
      <Header />
      <main>
        <AddTimer />
        <Timers />
      </main>
    </TimersContextProvider>

  );
}

export default App;

