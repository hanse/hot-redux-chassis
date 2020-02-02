import styles from './Dashboard.css';
import React, { useState } from 'react';
import LoginForm from 'app/components/LoginForm';
import MessageBox from 'app/components/MessageBox';
import Button from 'app/components/Button';
import Feed from './Feed';
import Modal from 'app/components/Modal';

type Props = {
  username: string;
  isLoggedIn: boolean;
  login: (username: string, password: string) => any;
  logout: () => any;
  clearLoginError: () => void;
  loginFailed: boolean;
};

function Dashboard(props: Props) {
  const [loginOpen, setLoginOpen] = useState(false);
  return (
    <div className={styles.root}>
      {props.isLoggedIn && <h2>{`Hello, ${props.username}!`}</h2>}

      {!props.isLoggedIn && (
        <>
          <Button onClick={() => setLoginOpen(true)}>Login</Button>
          <Modal
            isOpen={loginOpen}
            onDismiss={() => setLoginOpen(false)}
            title="Login"
          >
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
          </Modal>
        </>
      )}

      {props.isLoggedIn && (
        <div>
          <Button
            onClick={() => {
              setLoginOpen(false);
              props.logout();
            }}
          >
            Log out
          </Button>
        </div>
      )}

      <Feed />
    </div>
  );
}

export default Dashboard;
