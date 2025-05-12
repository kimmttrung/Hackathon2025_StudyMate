import React from "react";

class MyComponent extends React.Component {
    state = {
        name: 'Trung',
        age: 20,
        address: "HP"
    };


    handleClick = (event) => {
        console.log("My name is", this.state.name);
        // console.log(event.target);

        this.setState({
            name: "Hieu",
            age: Math.floor((Math.random() * 100) + 1)
        })
    }

    handleOnMouse(event) {
        console.log(event);
    }


    // JXS
    render() {
        return (
            <div>
                {Math.random()}
                My name is {this.state.name} and I am {this.state.age};
                <button onClick={this.handleClick}>Click me</button>

                <button onMouseOver={(event) => this.handleOnMouse(event)}>Hover me</button>
            </div>
        );
    }
}

export default MyComponent;