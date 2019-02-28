import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 0), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;
const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 1, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
class Register extends React.Component {
    /**
     * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
     * The constructor for a React component is called before it is mounted (rendered).
     * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
     * These fields are then handled in the onChange() methods in the resp. InputFields
     */
    constructor() {
        super();
        this.state = {
            name: null,
            username: null
        };
    }
    /**
     * HTTP POST request is sent to the backend.
     * If the request is successful, a new user is returned to the front-end and its token is stored in the localStorage.
     */

    register(){
        fetch(`${getDomain()}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                name: this.state.name,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(addUser => {
                const user = new User(addUser);
                this.props.history.push(`/login`);
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during the register: ${err.message}`);
                }
            });
        this.props.history.push('/register');

    }

    /**
     *  Every time the user enters something in the input field, the state gets updated.
     * @param key (the key of the state for identifying the field that needs to be updated)
     * @param value (the value that gets assigned to the identified state key)
     */
    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }



render() {
    return (
        <BaseContainer>
            <FormContainer>
                <Form>
                    <Label>Username</Label>
                    <InputField
                        placeholder="Enter here.."
                        onChange={e => {
                            this.handleInputChange("username", e.target.value);
                        }}
                    />
                    <Label>Name</Label>
                    <InputField
                        placeholder="Enter here.."
                        onChange={e => {
                            this.handleInputChange("name", e.target.value);
                        }}
                    />
                    <Label>Password</Label>
                    <InputField
                        placeholder="Enter here.."
                        onChange={e => {
                            this.handleInputChange("password", e.target.value);
                        }}
                    />
                    <ButtonContainer>
                        <Button
                            width="50%"
                            disabled={!this.state.username || !this.state.name || !this.state.password}
                            onClick={() => {
                                this.register();
                            }}
                        >
                            Register
                        </Button>
                    </ButtonContainer>
                </Form>
            </FormContainer>
        </BaseContainer>
    );
}
}

export default withRouter(Register);