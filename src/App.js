import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Board from './pages/Board';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </div>
  );
}

export default App;
