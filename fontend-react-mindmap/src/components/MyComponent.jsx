import React from "react";
import DisplayInfor from "./DisplayInfor";
import AddUserInfor from "./AddUserInfor";

class MyComponent extends React.Component {
    state = {
        listUser: [
            { id: 1, name: "Trang", age: "4" },
            { id: 2, name: "Eric", age: "14" },
            { id: 3, name: "Trung", age: "64" },
        ]
    }

    // JXS
    render() {

        return (
            <div>
                <AddUserInfor />
                <br />

                <DisplayInfor
                    listUser={this.state.listUser}
                    User={this.state.listUser}
                />
            </div>
        );
    }
}

export default MyComponent;