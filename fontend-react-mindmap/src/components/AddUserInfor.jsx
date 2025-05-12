import React from "react";

class AddUserInfor extends React.Component {
    state = {
        name: '',
        age: '',
        address: "HP"
    };


    // handleClick = (event) => {
    //     console.log("My name is", this.state.name);
    //     // console.log(event.target);

    //     // merge State: class react
    //     this.setState({
    //         name: "Hieu",
    //         age: Math.floor((Math.random() * 100) + 1)
    //     })
    // }

    handleOnChangeInput = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleOnChangeAge = (event) => {
        this.setState({
            age: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        this.props.handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1) + '-random',
            name: this.state.name,
            age: this.state.age
        });
    }

    handleOnMouse(event) {
        console.log(event);
    }


    // JXS
    render() {
        return (
            <div className="flex justify-content-center gap-2">
                My name is {this.state.name} and I am {this.state.age};
                <form onSubmit={(event) => this.handleOnSubmit(event)}>
                    <label htmlFor="">Your name: </label>
                    <input
                        value={this.state.name}
                        type="text"
                        onChange={(event) => this.handleOnChangeInput(event)}
                    />
                    <label htmlFor="">Your age: </label>
                    <input
                        type="text"
                        value={this.state.age}
                        onChange={(event) => this.handleOnChangeAge(event)}
                    />
                    <button onClick={() => this.handleOnSubmit}>Submit</button>
                </form>
            </div>
        );
    }
}

export default AddUserInfor;