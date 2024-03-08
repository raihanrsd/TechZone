import React, { Fragment,useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./messages.css"
import UserImg from '../../image/user.png';
import SendIcon from '../../image/send.png';
import ChatImg from '../../image/comments.png';



const MessagingInterface = ({isAuthenticated, hideNavBar, setHideNavBar}) =>{

    const [users, setUsers] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect (() => {
        const getUsers = async () => {
            try{
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/messages/get_users`, {
                    method: 'GET',
                    headers: {token: localStorage.token}
                });

                const parseRes = await response.json();
                console.log(parseRes);
                console.log("kire kaj kor")
                setUsers(parseRes.users);
                setCurrentUserId(parseRes.current_user);

            }catch(err){
                console.error(err.message);
            }
        }
        getUsers();
    }, []);


    useEffect(() => {
        const getMessages = async () => {
            try{
                const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/messages/get_messages?user_id=${selectedUser.user_id}`, {
                    method: 'GET',
                    headers: {token: localStorage.token}
                });

                const parseRes = await response.json();
                console.log(parseRes);
                setMessages(parseRes.messages);

            }catch(err){
                console.error(err.message);
            }
        }

        if(selectedUser){
            getMessages();
        }

    }, [selectedUser])

    const selectUser = (user) => {
        setSelectedUser(user);
    }

    const onChange = e => {
        setMessage(e.target.value);
    }

    const handleSend = async () => {
        try{
            const body = {message, receiver_id: selectedUser.user_id};
            const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/messages/send_message`, {
                method: 'POST',
                headers: {token: localStorage.token, 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            if(parseRes.sent){
                setMessage('');
                setMessages(messages => {
                    const newMessages = [parseRes.message, ...messages];
                    return newMessages;
                });

                setUsers(users => {
                    const newUsers = users.map(user => {
                        if(user.user_id === selectedUser.user_id){
                            user.is_unread = 0;
                            console.log('user must change');
                        }

                        return user;
                    });
                    return newUsers;
                });
            }
        }catch(err){
            console.error(err.message);
        }
    }


    const formarLastSeen = (time) =>{
        const timeDifference = moment().diff(time, 'seconds');
        
        if (timeDifference < 60) {
          return moment().subtract(timeDifference, 'seconds').fromNow();
        } else if (timeDifference < 3600) {
          return moment().subtract(Math.floor(timeDifference / 60), 'minutes').fromNow();
        } else if (timeDifference < 86400) {
          return moment().subtract(Math.floor(timeDifference / 3600), 'hours').fromNow();
        } else if (timeDifference < 604800) {
          return moment().subtract(Math.floor(timeDifference / 86400), 'days').fromNow();
        } else {
          return moment(message.time_added).format('MMMM Do YYYY, h:mm:ss a');
        }
    }


    const format = (hoursDiff) => {
        if (hoursDiff < 24) {
            // If within the last 24 hours, show the relative time
            return 'h:mm A';
          } else if (hoursDiff < 24 * 30) {
            // If within the last 30 days, show the date
            return 'MMMM D';
          } else if (hoursDiff < 24 * 30 * 12) {
            // If within the last 12 months, show month and date
            return 'MMMM D';
          } else {
            // For longer durations, show month and year
            return 'MMMM YYYY';
          }
    }
    const navigate = useNavigate();
  const showMessages = () => {
    setHideNavBar(!hideNavBar);
    navigate('/');
  }

    return (
        <Fragment>
            <div className='messaging-interface'>
                <div className='message-list-div'>
                    <div className='search-div'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="rgba(255, 255, 255, 0.706)" class="bi bi-list" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                    </svg>
                    <input type='text' className='search-input' placeholder='Search' />
                    </div>
                    {
                        users && users.map((user, index) => {
                            return (
                                <div key={index} onClick={()=>selectUser(user)}>
                                    <div className={user === selectedUser ? 'message-list-item selected': 'message-list-item'} >
                                        <div className='message-list-item-img'>
                                            {
                                                user.profile_img === 'user.png' ?
                                                <img src={UserImg} alt='profile' className='profile-img' />:
                                                <img src={user.profile_img} alt='profile' className='profile-img' />
                                            }
                                           
                                        </div>
                                        <div className='message-list-item-details'>
                                            <div className='list-heading'>
                                                <p className='list-username'>{user.username}</p>
                                                <p className={user === selectedUser ? 'list-datetime selected': 'list-datetime'}>{moment(user.last_message_time).format('h:mm A')}</p>
                                            </div>
                                            <p className={user === selectedUser ? 'list-message selected': 'list-message'}>{user.last_message._message.length > 30 ?
                                                user.last_message._message.slice(0, 30) + '...' :
                                                user.last_message._message
                                        }</p>
                                            {
                                                user.is_unread > 0 &&
                                                <div className='unread-message'>
                                                    <p>{user.is_unread}</p>
                                                    
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        
                    }
                
                </div>

                <div className='message-conversation-div'>
                <div className='chat-header'>
  <div className='chat-header-user'>
    {selectedUser && (
      <>
        {selectedUser.profile_img === 'user.png' ? (
          <img src={UserImg} alt='profile' className='profile-img' />
        ) : (
          <img src={selectedUser.profile_img} alt='profile' className='profile-img' />
        )}
        <div className='user-last-seen'>
          <p className='chat-username'>{selectedUser.username}</p>
          <p className='chat-last-seen'>
            {selectedUser.last_message_time &&
             <p>last seen {formarLastSeen(selectedUser.last_message_time)} </p>}
          </p>
        </div>
      </>
    )}
  </div>
  <div></div>
</div>

                    <div className='all-messages'>
                    {
                        messages ? messages.map((message, index) => {
                            return(
                            <div key={index} className={message.sender_id === currentUserId? 'chat-message-user':'chat-message-other' }>
                                <div className={message.sender_id === currentUserId? 'chat-inner-user':'chat-inner-other' }>
                                    <p className='chat-text'>{message._message}</p>
                                    <p className='message-time'>{moment(message.time_added).format('h:mm A')}</p>
                                </div>
                            </div>
                            )

                        }) :
                        null
                    }
                    </div>

                   {selectedUser && <div className='chat-text-box'>
                    <input type='text' className='message-input' value={message} placeholder='Type a message' onChange={e => onChange(e)} />
                        <button className='send-button' onClick={handleSend}><img src={SendIcon} className='send-icon' /></button>
                    </div>
                    }
                    
                </div>
            </div>

            {
          isAuthenticated && 
          <button className='chat-btn' onClick={() => showMessages()}>
            <img src={ChatImg} alt="Chat" className='chat-icon' />
          </button>
        }
        </Fragment>
    )
}

export default MessagingInterface;

