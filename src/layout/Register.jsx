import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Logo from "../components/common/logo.svg";
import AppHeader from "../components/common";
const Register = ({
  formProps: { onChange, registerFormValid, loading, fieldErrors, onSubmit, },
}) => {
  return (
    <div>
      <AppHeader />
      <Grid centered verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 550, marginTop: 50 }}>
          <Header as="h2">SignUp Here</Header>
          <Form size="huge" autoComplete="off">
            <Segment>
              <Form.Input
                fluid
                name="username"
                label="Username"
                onChange={onChange}
                placeholder="Username"
                error={
                  fieldErrors?.username && {
                    content: fieldErrors?.username,
                    pointing: "below",
                  }
                }
              />
              <Form.Input
                fluid
                name="firstName"
                label="First Name"
                onChange={onChange}
                error={
                  fieldErrors?.first_name && {
                    content: fieldErrors?.first_name,
                    pointing: "below",
                  }
                }
                placeholder="Firstname"
              />
              <Form.Input
                fluid
                name="lastName"
                label="Last Name"
                error={
                  fieldErrors?.last_name && {
                    content: fieldErrors?.last_name,
                    pointing: "below",
                  }
                }
                onChange={onChange}
                placeholder="Lastname"
              />
              <Form.Input
                fluid
                name="email"
                label="Email"
                error={
                  fieldErrors?.email && {
                    content: fieldErrors?.email,
                    pointing: "below",
                  }
                }
                onChange={onChange}
                placeholder="E-mail address"
              />
              <Form.Input
                fluid
                error={
                  fieldErrors?.password && {
                    content: fieldErrors?.password,
                    pointing: "above",
                  }
                }
                name="password"
                label="Password"
                placeholder="Password"
                onChange={onChange}
                type="password"
              />
              <Button
                primary
                fluid
                size="tiny"
                onClick={onSubmit}
                loading={loading}
                disabled={registerFormValid || loading}
              >
                Register
              </Button>
            </Segment>
          </Form>
          <Message>
            Already Have an account? <Link to="/auth/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Register;
