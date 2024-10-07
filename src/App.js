import './App.css';
import axios from 'axios';
import {useReducer} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { apiReducer, initialState } from './apiReducer';
import { ACTION_TYPES } from './actionTypes';

function App() {

  const [state, dispatch] = useReducer(apiReducer, initialState)

  const generateExcuse = async (selectedGategory) => {
    try{
      dispatch({type: ACTION_TYPES.loading, data: true})
      await axios.get(`https://excuser-three.vercel.app/v1/excuse/${selectedGategory}`).then((res) => {
        dispatch({type: ACTION_TYPES.execuse, data: res.data[0]})
      })
    }catch (error){
      dispatch({type: ACTION_TYPES.error, data: true})

    }finally{
      dispatch({type: ACTION_TYPES.loading, data: false})

    }

  }

  return (
    <div className="container mt-5">
      <h1 className="m-2">Generating Excuse</h1>
      <nav className="navbar navbar-light bg-light">
        <form className="container-fluid justify-content-start">
          <button className="btn btn-outline-success me-2" type="button" onClick={() => generateExcuse("family")}>Family</button>
          <button className="btn btn-outline-success me-2" type="button" onClick={() => generateExcuse("office")}>Office</button>
          <button className="btn btn-outline-success me-2" type="button" onClick={() => generateExcuse("family")}>Party</button>
        </form>
      </nav>
      {state.loading ? (
        <div className="d-flex justify-content-center align-items-center h-60vh">
          <div className="spinner-border" role="status">
          </div>
        </div>)
      : state.error ? (<div>{state.error}</div>)
      :  state.excuses && <p>{state.excuses.excuse}</p>}
    </div>
  );
}

export default App;