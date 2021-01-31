import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '100px',
    textAlign: '-webkit-center',
    '& > *': {
      display: 'flex',
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  input: {
    width: '350px'
  },
  button: {
    background: '#6200EE',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '200px'
  }
}));

function Edit ({editUser, deleteUser, userList}) {
  const {id} = useParams();
  const user = userList.find(el => el._id === id)
  console.log('userList', user);
  const [fname, setfName] = useState(user?.fname || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const router = useHistory();

  const handleNameChange = (event) => {
    setfName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    editUser(fname, email, phone, address, id);
    router.push('/');
  };

  const classes = useStyles();
  
  return (
    <form onSubmit={handleSubmit} className={classes.root} >
        <TextField
          variant="filled"
          type="text"
          className={classes.input}
          label="Edit product name"
          required
          value={fname}
          onChange={handleNameChange}
        />
        <TextField
          type="text"
          variant="filled"
          className={classes.input}
          label="Edit email"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          type="text"
          variant="filled"
          className={classes.input}
          label="Edit phone"
          required
          value={phone}
          onChange={handlePhoneChange}
        />
        <TextField
          type="text"
          variant="filled"
          className={classes.input}
          label="Edit address"
          required
          value={address}
          onChange={handleAddressChange}
        />
          <div className={classes.container}>
            <Button
              type="submit"
              className={classes.button}
            >
              Save
            </Button>
            <Button
              type="button"
              className={classes.button}
              onClick={() => deleteUser(userList._id)}
            >
              Delete
            </Button>
          </div>
    </form>
  )
}

export default Edit;