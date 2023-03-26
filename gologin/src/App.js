import './App.css';
import {Logo} from "./components/logo/Logo";
import {MainPage} from "./pages/main/MainPage";
import {useGlobalContext} from "./hooks/useGlobalContext";
import {Result} from "./pages/results/Result";

function App() {
    const state = useGlobalContext()

    return (
        <div className="App">
            <Logo/>
            {state.table.length <= 0 && <MainPage/>}
            {state.table.length > 0 && <Result/>}
        </div>
    );
}

export default App;
