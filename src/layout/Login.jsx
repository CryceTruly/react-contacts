import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import AppHeader from "../components/common/Header";

const LoginComponent = ({
  formProps: {
    onChange,
    loginFormInvalid,
    registerMsg,
    form,
    authError,
    loading,
    onSubmit,
  },
}) => {
  return (
    <>
      <AppHeader />
      <Grid textAlign="center" centered verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 550, marginTop: 50 }}>
          <Header as="h2">Log-in to your account</Header>
          <Form size="large" autoComplete="off">
            <Segment>
              {authError && (
                <Message visible={authError} negative>
                  <Message.Header>{authError}</Message.Header>
                  <p>Please try again!</p>
                </Message>
              )}
              {registerMsg && (
                <Message visible={registerMsg} positive>
                  <Message.Header>{registerMsg}</Message.Header>
                  <p>Please provide your password to login!</p>
                </Message>
              )}
              <Form.Input
                fluid
                placeholder="Username"
                label="Username"
                value={form.username || ""}
                name="username"
                onChange={onChange}
              />
              <Form.Input
                fluid
                placeholder="Password"
                label="Password"
                onChange={onChange}
                value={form.password || ""}
                name="password"
                type="password"
              />

              <Button
                primary
                fluid
                disabled={loginFormInvalid || loading}
                size="tiny"
                onClick={onSubmit}
                onChange={onChange}
                loading={loading}
              >
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <Link to="/auth/register">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default LoginComponent;
