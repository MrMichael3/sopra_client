import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {getDomain} from "../../helpers/getDomain";
import Player from "../../views/Player";
import {Spinner} from "../../views/design/Spinner";
import {Button} from "../../views/design/Button";
import {withRouter} from "react-router-dom";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            username: "test",
            userId: null
        };
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        fetch(`${getDomain()}/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(async user => {
                this.setState({user: user});
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the users: " + err);
            });
    }

    return() {
        this.props.history.push("/game");
    }

    render() {
        return (
            <Container>
                <h2>User Profile </h2>
                <p>See profile of: {this.state.username}</p>
                {!this.state.user ? (
                    <Spinner/>
                ) : (
                    <div>
                        <p>Username: {this.state.user.username}</p>
                        <p>Username: {this.state.user.creationDay}</p>
                        <p>Username: {this.state.user.birthday}</p>
                        <p>Username: {this.state.user.status}</p>
                        <p>Username: {this.state.user.username}</p>
                        <Button
                            width="100%"
                            onClick={() => {
                                this.return();
                            }}
                        >
                            Return
                        </Button>
                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(Profile);
