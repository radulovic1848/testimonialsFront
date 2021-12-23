import './App.scss';
import Form from './components/Form/Form'
import Panel from './components/Panel/Panel'

function App() {
  return (
    <div className="App">
      <h1 className='headline'>Gennev Community Page</h1>
      <div className='content-wrapper'>
        <Form />
        <Panel />
      </div>
    </div>
  );
}

export default App;
