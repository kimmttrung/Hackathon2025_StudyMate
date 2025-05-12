import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

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
                <UserInfor />
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