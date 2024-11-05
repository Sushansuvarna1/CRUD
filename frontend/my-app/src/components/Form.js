import React, { useEffect, useRef,useMemo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser, getUser } from "../features/list/listSlice";
import { getAccount } from "../features/list/validationSlice";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Form = (props) => {
  const [name, setName] = useState([]);
  const [filter, setFilter] = useState("");
  const [id, setID] = useState("");
  const { editId, handleClose } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => {
    return state.app.users;
  });
  


  const arr = data?.find((ele) => {
    return ele._id == editId;
  });
  useEffect(() => {
    dispatch(getUser());
}, []);


const userID = useSelector((state) => {
  return state.validation?.account?.id
});

console.log("userID",userID)

  const handelNameChange = (e) => {
    setName(e.target.value);
    if (
      (Array.isArray(data) ? data : []).find(
        (ele) => e.target.value?.toLowerCase() === ele?.name?.toLowerCase() && ele?._id !== editId
      )
    ) {
      setFilter("data is already exsist");
    } else {
      setFilter("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = {
      name,
      id
    };
    setName("");
    editId
      ? dispatch(updateUser(form)) && handleClose()
      : dispatch(createUser(form));
    if (createUser.fulfilled) {
      navigate("/formlist");
    }
  };

  useEffect(() => {
    if (editId) {
      setName(arr.name);
      setID(arr._id);
    }
  }, [editId]);

  return (
    <div className="form">
      <h1 className="h1">Create New User</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="textbox"
          type="text"
          value={name}
          onChange={handelNameChange}
          placeholder="Enter full name"
        />

        {filter && (
          <Stack>
            <Alert severity="warning">{filter}</Alert>
          </Stack>
        )}
        <button className="button">submit</button>
      </form>
    </div>
  );
};

export default Form;
