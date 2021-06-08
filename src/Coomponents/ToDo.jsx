import { useState } from "react";

const ToDo = () => {
   const [inputObj, setInputObj] = useState({
      input: "",
      id: 0,
      checked: false
   });
   const [todo, setTodo] = useState([]);

   const addClick = (e) => {
      e.preventDefault();
      setTodo([...todo, { input: inputObj.input, id: inputObj.id + 1 }]);
      setInputObj({ ...inputObj, input: "", id: inputObj.id + 1 });
   };

   const handleChange = (id) => {
      const newTodo = todo.map((td) => {
         id === td.id ? (td.checked = !td.checked) : "";
         return td;
      });

      setTodo([...newTodo]);
   };
   const deleteItem = (id) => {
      const newTodo = todo.filter((td) => {
         return id !== td.id;
      });
      setTodo([...newTodo]);
   };
   const editItem = (id) => {
      const withOutEdit = todo.filter((td) => {
         return id !== td.id;
      });
      const changeEdit = todo.find((td) => td.id === id);

      setInputObj({
         inputObj,
         input: changeEdit.input,
         id: inputObj.id + 1,
         checked: false
      });
      setTodo([...withOutEdit]);
   };
   console.log(inputObj);
   console.log(todo);
   return (
      <div className="container">
         <input
            type="text"
            value={inputObj.input}
            id={inputObj.id}
            onChange={(e) => {
               const inputValue = e.target.value;

               setInputObj({
                  ...inputObj,
                  input: inputValue,
                  id: inputObj.id
               });
            }}
         />
         <button className="add" onClick={(e) => addClick(e)}>
            Add
         </button>
         <ul className={todo.length !== 0 ? "display" : "non"}>
            {todo &&
               todo.map((td) => {
                  const { input, id, checked } = td;
                  return (
                     <li id={id}>
                        <input
                           type="checkbox"
                           checked={checked}
                           onChange={() => {
                              handleChange(id);
                           }}
                        />

                        <div className="type-box">{input}</div>
                        <div className="buttons">
                           <button
                              className="btn dlt"
                              onClick={(e) => {
                                 deleteItem(id);
                              }}
                           >
                              Delete
                           </button>
                           <button
                              className="btn edit"
                              onClick={(e) => {
                                 editItem(id);
                              }}
                           >
                              Edit
                           </button>
                        </div>
                     </li>
                  );
               })}
         </ul>
      </div>
   );
};
export default ToDo;
