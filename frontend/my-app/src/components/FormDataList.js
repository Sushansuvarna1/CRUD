import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../features/list/listSlice";
import { getUser } from "../features/list/listSlice";
import Form from "./Form";

const FormDataList = () => {
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState("");
  const[name,setName]=useState('')
  const dispatch = useDispatch();

  const data = useSelector((state) => state?.app?.users);
console.log("data",data)
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleDeletClick = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEditClick = () => {
    setModal(!modal);
  };

  const handleClose = () => {
    setModal(false);
  };

  const handelNameChange=(e)=>{
    setName(e.target.value)
  }

  const FilterdValue = Array.isArray(data) ? data.filter((ele) => {
    return ele.name.toLowerCase().includes(name.toLowerCase());
  }) : [];
  return (
    <div>    
      {modal ? (
        <div>
          <Form editId={editId} handleClose={handleClose} />
          <button className="cancle" onClick={handleClose}>
            X
          </button>
        </div>
      ) : (
        <div className="container">
          <input
          className="search"
          type="text"
          value={name}
          onChange={handelNameChange}
          placeholder="Search"
        />
          {  FilterdValue.map((ele) => {
            return (
              <li key={ele._id} className="card">
                <h3 >{ele.name}</h3>
                <div className="button-container">
                  <button
                    className="delete-btn"
                    onClick={() => handleDeletClick(ele._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      handleEditClick();
                      setEditId(ele._id);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </li>
              
            );
          })}
            
        </div>
      )}

    </div>
  );
};

export default FormDataList;
