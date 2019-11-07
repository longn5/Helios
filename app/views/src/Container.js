import React from "react";
import "./Container.css";

const Registrant = props => {
  let emailOptIn;
  if (props.emailOptIn === true) emailOptIn = "Yes";
  else emailOptIn = "No";

  return (
    <tr>
      <td>{props.fullName}</td>
      <td>{props.email}</td>
      <td>{props.dateOfBirth}</td>
      <td>{props.favoriteFiveIntegers}</td>
      <td>{emailOptIn}</td>
      <td>{props.timeOfRegistration}</td>
    </tr>
  );
};

class Container extends React.Component {
  state = {
    data: null
  };
  // Call the fetch function below once the component mounts
  componentDidMount() {
    this.callBackendAPI()
      .then(res => {
        this.setState({ data: res });
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  //Fetches new data when are changes to the database
  componentDidUpdate(prevState) {
    if (this.state.data !== prevState.data) {
      this.callBackendAPI()
        .then(res => {
          this.setState({ data: res });
          console.log(res);
        })
        .catch(err => console.log(err));
    }
  }

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch("/register");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    if (!this.state.data) return <div />;
    return (
      <div className="registrant">
        <table className="reg-table">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Integers</th>
              <th>Opt In</th>
              <th>Time Registered</th>
            </tr>
            {this.state.data.map(reg => (
              <Registrant
                fullName={reg.fullName}
                email={reg.email}
                dateOfBirth={reg.dateOfBrith} //need to fix typo
                favoriteFiveIntegers={reg.favoriteFiveInegers} //fix typo
                emailOptIn={reg.emailOptIn}
                timeOfRegistration={reg.timeOfRegisteration} //fix typo
                key={reg.fullName}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Container;
