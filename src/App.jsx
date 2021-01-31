import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Create from "./components/create/Create";
import List from './components/list/List';
import Edit from './components/edit/Edit';
import {AppBar, Container, Toolbar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  nav: {
    marginBottom: '10px'
  },
  item: {
    padding: '0 25%',
    color: 'white',
    textDecoration: 'none'
  }
}))

 
function App() {
  const [userList, setUserList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(`https://v2mzkzwqi8.execute-api.ca-central-1.amazonaws.com/prod/user`)
      response = await response.json()
      setUserList(response)
    }

    fetchMyAPI()
  }, []);

  const deleteUser = (id) => {
    const filteredList = [...userList].filter(user => user._id !== id)

    setUserList(filteredList);
  }

  const editUser = (fname, email, phone, address, id) => {
    const edUser = {
      fname,
      email,
      phone,
      address,
    };

    setUserList(userList.map((user) => {
      if (user._id !== id) {
        return { ...user };
      }

      return {
        ...user,
        ...edUser,
      };
    }));
  }
  console.log(userList);

  const addNewUser = (fname, lname, email, phone, address) => {
    const newUser = {
      fname,
      lname,
      email,
      phone,
      address,
      _id: new Date(),
    };

    setUserList([...userList, newUser]);
  };

  return (
    <div className="App">
      <Router>
      <div>
        <AppBar position="fixed" className={classes.nav}>
          <Container fixed>
            <Toolbar>
              <Link to="/" className={classes.item}>LIST</Link>
              <Link to="/create" className={classes.item}>CREATE</Link>
            </Toolbar>
          </Container>
        </AppBar>

        <Switch>
          <Route path="/create">
            <Create
              addNewUser={addNewUser}
            />
          </Route>
          <Route path='/edit/:id'>
            <Edit
              editUser={editUser}
              userList={userList}
              deleteUser={deleteUser}
            />
          </Route>
          <Route path="/">
            <List
              userList={userList}
              setUserList={setUserList}
              deleteUser={deleteUser}
            />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
