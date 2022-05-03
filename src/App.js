import axios from "axios";
import React, { useState } from "react";

const App = () => {

  const [spiral, setSpiral] = useState([[0,1]]);
  const [addFormData, setAddFormData] = useState({
    rows: '',
    columns: ''
  })

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value
    console.log(fieldValue)

    const newFormData = { ...addFormData}
    newFormData[fieldName] = fieldValue

    setAddFormData(newFormData)
  }

  const handleAddFormSubmit = async(event) => {
    event.preventDefault();

    const newRow = {
      rows: addFormData.rows,
      columns: addFormData.columns
    }

    const URI = 'http://localhost:8080/spiral?rows=' + newRow.rows + '&cols=' + newRow.columns

    const res = await axios.get(URI)

    setSpiral(res.data.rows)
  }

  return <div className="app-container">
    <div className="container">
      <h1>Fibonacci Spiral</h1>
     <h5> Matrix Properties </h5>
      <form onSubmit={handleAddFormSubmit}>
        <div className="row">
          <div className="col-sm-3 my-1">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">Rows</div>
              </div>
              <input type="text" name="rows" required="required" placeholder='Rows' onChange={handleAddFormChange}></input>
            </div>
          </div>
          <div className="col-sm-3 my-1">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">Columns</div>
              </div>
              <input type="text" name="columns" required="required" placeholder='Columns' onChange={handleAddFormChange}></input>
            </div>
          </div>
          <div className="col-sm-3 my-1">
            <button type="submit" className="btn btn-primary btn-sm">Calculate</button>
          </div>
        </div>
      </form>
      <h2></h2>
      <table className='table table-bordered'>
          <tbody>
              {spiral.map ((currentRow) =>(
                  <tr key={currentRow.toString()}>
                      {currentRow.map ((currentColumn) =>(
                          <td key={Math.random()}>{currentColumn}</td>
                      ))}
                  </tr>
              ))}         
          </tbody>
      </table>
    </div>
  </div>
}

export default App;
