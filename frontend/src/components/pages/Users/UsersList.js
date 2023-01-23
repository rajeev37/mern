import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import { selectCurrentToken } from "../../../redux/slice/authSlice";
import { loading, apiActions } from "../../../redux/slice/apiSlice";
const UsersList = () => {
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    const loadingx = useSelector(loading);
    const [users, setUsers] = useState();
    const headers = {
        "authorization": `Bearer ${token}`
    }
    useEffect(() => {
        dispatch(apiActions.setLoading(true));
        axios.get("http://localhost:9000/api/user/users", {
            withCredentials: true,
            headers: headers
        }).then(res => {
            console.log("***users List res***", res.data);
            dispatch(apiActions.setLoading(false));
            setUsers(res.data.users);

        }).catch(err => {
            console.log("***users List err***", err);
        })
    }, []);
    const tableContent = users?.map(user => {
        const userRolesString = Object.keys(user.roles).toString().replaceAll(',', ', ');
        return <tr className="table__row user" key={user._id}>
            <td className="table__cell">{user.username}</td>
            <td className="table__cell">{userRolesString}</td>
            <td className="table__cell">
            </td>
        </tr>
    });
    let content;
    if (loadingx) {
        content = (<h1>Loading.....</h1>)
    } else {
        content = (
            <table className="table table--users">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th user__username">Username</th>
                        <th scope="col" className="table__th user__roles">Roles</th>
                        <th scope="col" className="table__th user__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }
    return content;
}

export default UsersList