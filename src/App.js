import './App.css';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';




function App() {
  const [todayDate,setTodayDate] = useState('')
  useEffect(()=>{
    const today = new Date()
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    setTodayDate(dayNames[today.getDay()])
  },[])
  const [toDos,setToDos] = useState([])
  const[toDo,setToDo] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleAddTodo = () => {
    if(toDo.trim()) {
      if (!toDos.some(todo => todo.text === toDo)) {
      setToDos([...toDos,{id:uuidv4(), text:toDo,status:false }])
      setToDo('')
      setErrorMessage('')
    } else {
      setErrorMessage("It's already there bro !!!");
    }
    }else{
      setErrorMessage('Add something bro !!!')
    }
  }
  const [editingId,setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');
  //Editing todo
  const handleEdit = (id) => {
    setEditingId(id);
    const todoToEdit = toDos.find((todo) => todo.id === id)
    setEditedText(todoToEdit.text)
  }
  //save Edited todo
  const handleSaveEdit = (id,newText) => {
    setToDos(
      toDos.map((obj) => (obj.id === id? {...obj, text:newText} :obj))
    );
    setEditingId(null); //Exiting editing mode
  }
  const handleDelete = (id)=>{
    setToDos(toDos.filter((obj)=> obj.id !== id))
  }

 
  return (
    <div className="app">
    <div className="mainHeading">
      <h1>ToDo List</h1>
    </div>
    <div className="subHeading">
      <br />
      <h2> Whoop it's 🌝{todayDate}☕</h2>
    </div>
    <div className="input">
      <input value={toDo} onChange={(e)=>setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..."
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleAddTodo();
        }
      }}
       /> 
      <i onClick={handleAddTodo} className="fas fa-plus"></i> 
    </div>
    <p style={{color:'black'}}>
        {errorMessage == null ? null:errorMessage}
      </p>
    <div className="todos">
      { toDos.map((obj)=>{
return(
        <div className="todo">
        <div className="left">
          <input     onChange={(e) => {
                  setToDos((prevToDos) =>
                    prevToDos.map((obj2) =>
                      obj2.id === obj.id ? { ...obj2, status: e.target.checked } : obj2
                    )
                  );
                }}
                checked={obj.status}
                type="checkbox"
                name=""
                id=""
              />
          <p>
            {editingId === obj.id ? (
              <input type='text' value={editedText}  onChange={(e) => setEditedText(e.target.value)}
              onBlur={() => handleSaveEdit(obj.id, editedText)}
            />
            ):(
              obj.text
            )}
          </p>
        </div>
        <div className="right">
          <i onClick={()=> handleDelete(obj.id)} className="fas fa-times"></i>
          {editingId !== obj.id && (
            <i onClick={()=>handleEdit(obj.id)} className='fas fa-edit'></i>
          )}
        </div>
      </div> )
    }) }
  
    </div>
  </div>
  );
}




export default App;
