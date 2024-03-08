import React, { Fragment,useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserPopup from './UserPopup';


const AllAdmins = () =>{
    const [users, setUsers] = useState([]);
    const [selectedRank, setSelectedRank] = useState('Default Clearance');
    const [current_admin, setCurrentAdmin] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() =>{
        const getAdminList = async () => {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/admin/all/users`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();
                console.log(parseRes);
                if(parseRes.authorized){
                    setUsers(parseRes.users);
                    setCurrentAdmin(parseRes.current_admin);
                }
                else{
                    toast.error(parseRes.message);
                }   
                
            } catch (err) {
                console.error(err.message);
            }
        };

        getAdminList(); // Call the function to fetch products when the component mounts

    }, []);

    const showPopUpFunc = (user) => {
        setShowPopup(true);
        setSelectedUser(user);
    }

    const closePopUp = () => {
        setShowPopup(false);
        setSelectedUser(null);
    }

    
    
    return (
        <Fragment>
            <table className='order-table'>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>User Points</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => (
                        <tr key={user.user_id}>
                            <td><a onClick={() => showPopUpFunc(user)} 
                                style={{
                                    cursor: 'pointer',
                                    color: '#8f6ec5'
                                }}
                            >{user.user_id}</a></td>
                            <td>{user.full_name}</td>
                            <td>{user.email}</td>
                            <td>{user.points}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>

            {
                showPopup && selectedUser &&  <UserPopup close={closePopUp} user_data={selectedUser} />
            }
        </Fragment>
    )
}

export default AllAdmins;