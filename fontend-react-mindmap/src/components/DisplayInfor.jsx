import React from "react";
import './DisplayInfor.scss';

class DisplayInfor extends React.Component {
    state = {
        isShowisListUser: true
    }
    handleShowHide = () => {
        this.setState({
            isShowisListUser: !this.state.isShowisListUser
        })
    }

    render() {

        // destructuring array/object
        const { listUser } = this.props; // object
        // props > viết tắt properties

        return (
            <div className="display-infor-contanier">
                <div>
                    <span onClick={() => { this.handleShowHide() }}>
                        {this.state.isShowisListUser === true ? "Hide list user" : "Show list user"}
                    </span>
                    <div>
                        {this.state.isShowisListUser &&
                            <div>
                                {listUser.map((user) => {
                                    return (
                                        <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                                            <div>My name is {user.name}</div>
                                            <div>My age is {user.age}</div>
                                            <hr />
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                </div>
            </div >
        )
    }

}
export default DisplayInfor;