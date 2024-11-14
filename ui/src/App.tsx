import './App.css';
import CreateLogPage from './components/create/CreateLogPage';
import MainPage from './components/main/Main';
import Top from './components/top/Top';

function App() {

    return (
    <>
    <Top/>
        {/* <button onClick={randomEntry}>Add random entry <Icon>more_vert</Icon></button> */}
    <div className='container'>
        
        <MainPage/>
        <CreateLogPage/>
    </div>
    </>
    )
}

export default App
