import React from "react";

class MyComponent extends React.Component {
    state = {
        name: 'Trung',
        age: 20,
        address: "HP"
    };


    // JXS
    render() {
        return (
            <div>
                my first component
                {Math.random()}
                My name is {this.state.name};
            </div>
        );
    }
}

export default MyComponent;