import React, { Fragment,useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserPopup from './UserPopup';


const AllAdmins = () =>{
    const [admins, setAdmins] = useState([]);
    const [ranks, setRanks] = useState(['Default Clearance', 'super', 'customer_service', 'seller']);
    const [selectedRank, setSelectedRank] = useState('Default Clearance');
    const [current_admin, setCurrentAdmin] = useState({});
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() =>{
        const getAdminList = async () => {
            try {
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/admin/all/admins`, {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

                const parseRes = await response.json();

                if(parseRes.authorized){
                    setAdmins(parseRes.admins);
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

    const showPopUpFunc = (admin) => {
        setShowPopup(true);
        setSelectedAdmin(admin);
    }

    const closePopUp = () => {
        setShowPopup(false);
        setSelectedAdmin(null);
    }

    const handleChange = async (e, admin_id) => {
        setSelectedRank(e.target.value);
        if(current_admin.clearance_level !== 'super'){
            toast.error("You aren't authorized to change the rank of other admins");
            return;
        }
        try {
            const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/admin/all/change_admin_rank`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify({ admin_id, rank: e.target.value })
            });
    
            const parseRes = await response.json();
    
            if (parseRes.changed) {
                toast.success(parseRes.message);
                setAdmins((admins) =>
                    admins.map((admin) =>
                        admin.user_id === admin_id
                            ? { ...admin, clearance_level: e.target.value }
                            : admin
                    )
                );
            } else {
                toast.error(parseRes.message);
            }
        } catch (err) {
            console.error(err.message);
        }
    };
    
    return (
        <Fragment>
            <table className='order-table'>
                <thead>
                    <tr>
                        <th>Admin ID</th>
                        <th>Admin Name</th>
                        <th>Admin Email</th>
                        <th>Admin Status</th>
                        <th>Is Employed</th>
                        <th>Change Rank</th>
                    </tr>
                </thead>
                <tbody>
                    {admins && admins.map(admin => (
                        <tr key={admin.user_id}>
                            <td><a onClick={() => showPopUpFunc(admin)} 
                                style={{
                                    cursor: 'pointer',
                                    color: '#8f6ec5'
                                }}
                            >{admin.user_id}</a></td>
                            <td>{admin.full_name}</td>
                            <td>{admin.email}</td>
                            <td>{admin.clearance_level}</td>
                            <td className={admin.is_employed? 'paid' : 'not-paid'}><p >{admin.is_employed ? 'Employed': 'Fired'}</p></td>
                            <td>
                            <select value={selectedRank} onChange={(e) => handleChange(e, admin.user_id)} className='admin-select'>
                            {ranks.map(rank => (
                                <option key={rank} value={rank}>{rank}</option>
                            ))}
                            </select>

                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>

            {
                showPopup && selectedAdmin &&  <UserPopup close={closePopUp} user_data={selectedAdmin} />
            }
        </Fragment>
    )
}

export default AllAdmins;