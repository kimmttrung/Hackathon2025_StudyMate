import React from "react";

class DisplayInfor extends React.Component {
    render() {
        // destructuring  

        // destructuring array/object
        const { listUser } = this.props; // object
        // props > viết tắt properties

        return (
            <div >
                {listUser.map((user) => {
                    return (
                        <div key={user.id}>
                            <div>My name is {user.name}</div>
                            <div>My age is {user.age}</div>
                            <hr />
                        </div>
                    )
                })}
            </div>
        )
    }

}
export default DisplayInfor;