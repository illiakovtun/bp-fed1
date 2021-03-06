import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Maps from '../../helpers/Maps';
import Img from '../../img/investigate.svg';

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
    width: '460px'
  },
  input__search: {
    width: '350px',
    position: 'relative'
  },
  button: {
    background: '#6200EE',
  },
  search : {
    position: 'absolute',
    bottom: '12px',
    left: '350px',
    width: '45px',
    height: '45px',
    backgroundImage: `url(${Img})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    border: '0',
    background: '#eaeaea'
  }
}));

function Create ({addNewUser}) {
  const [fname, setfName] = useState('');
  const [lname, setlName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [visitMap, setVisitMap] = useState(false);
  const router = useHistory();

  const handleNameChange = (event) => {
    setFullName(event.target.value);
    const [first, last] = fullName.split(' ');
    setfName(first);
    setlName(last);
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

    if (!fullName || !email || !phone || !address) {
      return;
    }

    addNewUser(fname, lname, email, phone, address);

    router.push('/');
  };

  const classes = useStyles();
  
  return (
    <form action="http://localhost:3000/" onSubmit={handleSubmit} className={classes.root}>
        <TextField
          variant="filled"
          type="text"
          className={classes.input}
          id="standard-basic"
          label="Enter user name"
          required
          value={fullName}
          onChange={handleNameChange}
        />
        <TextField
          variant="filled"
          type="text"
          className={classes.input}
          id="input"
          label="Enter email"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          variant="filled"
          type="text"
          className={classes.input}
          id="input"
          label="Enter phone"
          required
          value={phone}
          onChange={handlePhoneChange}
        />
        <TextField
          variant="filled"
          type="text"
          className={classes.input}
          id="input"
          label="Enter address"
          required
          value={address}
          onChange={handleAddressChange}
        />
        <div className={classes.input__search}>
          <button
            className={classes.search}
            onClick={() => setVisitMap(true)}
          >
          </button>
        </div>
          <Button
            type="submit"
            className={classes.button}
          >
            SAVE
          </Button>
          {visitMap &&
          <Maps
          setAddress={setAddress}
          address={address}
        />}
    </form>
  )
}

export default Create;