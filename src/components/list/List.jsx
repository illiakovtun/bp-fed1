import React from 'react';
import './list.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '20px'
  }
}))

function List({userList, deleteUser}) {
  const router = useHistory();
  const classes = useStyles();
  
  return (
    <div className="list">
      <ul className="items">
        {userList.map(user => (
          <li key={user._id} className="item">
            <div className="item__info">
              <p>{`${user.fname || "test"} ${user.lname || ''}`}</p>
              <p>{`${user.email} | ${user.phone}`}</p>
              <p>{`${user.address}`}</p>
            </div>
            <div className="item__options">
              <div className="options">
                <Button
                  color="primary"
                  variant="outlined"
                  className={classes.button}
                  type="button"
                  onClick={() => router.push(`/edit/${user._id}`)}
                >
                  EDIT
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  className="button"
                  type="button"
                  onClick={() => deleteUser(user._id)}
                >
                  DELETE
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
