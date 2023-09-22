import React, { useEffect, useState } from "react";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [invisible, setInVisible] = useState([]);

  const url = "https://playground.4geeks.com/apis/fake/todos/user/Tomasmj123";

  // 1 traer las tareas del servidor 
  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
	if(list.length==0){
		updatetask([{label:"No hay tareas", done:false}])
	}else{
    updatetask(list);}
  }, [list]);

  // traer las tareas guardadas
  const getList = () => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          console.log("Solicitud exitosa");
          return res.json();
        } else if (res.status === 404) {
          console.log(`Error ${res.status} en la solicitud`);
          createNewUser();
        }
      })
      .then(tasks => {
        console.log(tasks);
        setList(tasks);
        // setInVisible(new Array(tasks.length).fill(0));
      })
      .catch(error => console.error(error))
  };

  const createNewUser = () => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify([]),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          console.log("Solicitud exitosa");
          return res.json();
        } else {
          console.log(`Error ${res.status} en la solicitud`);
        }
      })
      .then(statusUser => {
        console.log(statusUser)
      })
      .catch(error => console.error(error));
  }

  const updatetask = (todos) =>{
	fetch(url, {
        method: 'PUT', // or 'POST'
		body:JSON.stringify(todos),
        headers:{
        'Content-Type': 'application/json'
        }
        })
        .then(res => {
            if (res.status>= 200 && res.status<=300){
                console.log("el request se hizo bien");
                return res.json();
            }else if (res.status ==404){
                console.log(`hubo un error ${res.status} en el request`)
                createNewUser();
            }
        })
        .then(tasks => {
			console.log(tasks);
		}
         )
        .catch(error => console.error(error))
    };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleKeydown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
        setList(list.filter(dato=>dato.label!="No hay tareas"));
      setList(current => ([...current, { label: inputValue, done: false }]));
      setInputValue("");
    }
  }

  const onDelete = (index) => {
    const updatedInvisible = [...invisible];
    updatedInvisible[index] = 1;
    setInVisible(updatedInvisible);
  };

  const offDelete = () => {
    setInVisible(new Array(list.length).fill(0));
  }

  const handleDelete = (position) => {
    const updatedList = list.filter((_, index) => index !== position);
    setList(updatedList);
  };

  const handleDeleteAll = () => {
    setList([]);
    updatetask([]);
  };


  return (
    <div className="text-center">
      
      <input type="text" className="inputTask" placeholder="¿Cuál es la pinche tarea?" value={inputValue} onChange={handleChange} onKeyDown={handleKeydown}></input>
      <ul>
        {list?.map((dato, index) => (
          <li key={index} onMouseEnter={() => onDelete(index)} onMouseLeave={offDelete}>
            <p>{dato.label}</p>
             <button style={{ opacity: invisible[index] !== 0 ? invisible[index] : 0 }} onClick={() => handleDelete(index)}>X</button>
          </li>
        ))}
      </ul>

      {list.length > 0 && (
        <button onClick={handleDeleteAll}>Borrar todas las tareas</button>
      )}
    </div>
  );
};

export default TodoList;
