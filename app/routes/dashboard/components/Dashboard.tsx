import styles from './Dashboard.css';
import React from 'react';
import ballmer from 'app/assets/ballmer.jpg';
import LoginForm from 'app/components/LoginForm';
import MessageBox from 'app/components/MessageBox';
import Button from 'app/components/Button';
import Feed from './Feed';

type Props = {
  username: string;
  isLoggedIn: boolean;
  login: (username: string, password: string) => any;
  logout: () => any;
  clearLoginError: () => void;
  loginFailed: boolean;
};

function Dashboard(props: Props) {
  return (
    <div className={styles.root}>
      {props.isLoggedIn && <h2>{`Hello, ${props.username}!`}</h2>}

      {!props.isLoggedIn && (
        <div className={styles.loginContainer}>
          {props.loginFailed && (
            <MessageBox
              message="The login details were not correct"
              type="error"
              onClose={props.clearLoginError}
            />
          )}
          <LoginForm onSubmit={props.login} />
        </div>
      )}

      {props.isLoggedIn && (
        <div>
          <Button onClick={props.logout}>Log out</Button>
          <img src={ballmer} alt="Steve Ballmer" />
        </div>
      )}

      <Feed />
    </div>
  );
}

export default Dashboard;
