import React, { createContext, useEffect, useReducer } from 'react';
import userReduce from '../reducers/Users';
import * as Service from '../services/Users';
import actions from '../actions/Users';

const initialState = {
  user_info: {},
  list: [],
  is_verified : false,
  refresh: false,
  method: 'jwt'
};

export const UserContext = createContext(initialState);
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReduce, initialState);

  async function userLogin(payload) {
    var form = new FormData();
    form.append("email", payload.email);
    form.append("password", payload.password);
    const ret = await Service.login(form);
    dispatch({ type: actions.SET_USER, data: ret.data });
    return ret;
  }
  useEffect(() => {
    const init = async () => {
      try {
        await Service.verifyToken();
      }
      catch (err) {

      }
    }
    init()
  }, [])
  function logout() {
    Service.logout();
  }
  async function getAllRoles() {
    return Service.getAllRoles();
  }
  async function verifyToken(token) {
    return new Promise((resolve, reject) => {
      Service.verifyToken(token)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async function addUser(payload) {
    var form = new FormData();
    form.append("email", payload.email);
    form.append("password", payload.password);
    form.append("firstName", payload.firstName);
    form.append("lastName", payload.lastName);
    form.append("address", payload.address);
    form.append("is_registered", payload.is_registered);
    form.append("phone", payload.phone);
    form.append("role", "STAFF");
    const res = await Service.addUser(form);
    dispatch({ type: actions.REFRESH_DATA })
    return res;
  }


  async function getAllUser() {
    try {
      const data = await Service.getAllUser();
      dispatch({ type: actions.SET_LIST, data})
    } catch (err) {
      console.log(err)
    }
  }

  async function refreshData() {
    dispatch({ type: actions.REFRESH_DATA })
  }
  async function approveUser(id) {
    try {
      await Service.approveUser(id);
      dispatch({ type: actions.REFRESH_DATA })
    } catch (err) {
      throw err;
    }
  }

  async function updateUser(id, data) {
    delete data.state;
    delete data.status;
    delete data.avatarUrl;
    try {
      await Service.updateUser(id, data);
      dispatch({ type: actions.REFRESH_DATA })
    } catch (err) {
      throw err;
    }
  }

  async function getById(id) {
    try {
      return await Service.getById(id);
    } catch (err) {
      throw err;
    }
  }

  useEffect(async () => {
    if (state.refresh === true) {
      await getAllUser();
      dispatch({ type: actions.REFRESH_DATA })
    }
  }, [state.refresh])

  return (
    <UserContext.Provider
      value={{
        list: state.list,
        userLogin,
        verifyToken,
        getAllUser,
        getById,
        refreshData,
        dispatch,
        addUser,
        logout,
        getAllRoles,
        approveUser,
        updateUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};