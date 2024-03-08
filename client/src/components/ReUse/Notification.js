import {React, useState, useEffect} from 'react';
 // Import your CSS file for styling

const Notification = ({ isAuthenticated, notifications }) => {
    function calculateTimeDifference(notificationTime) {
        const currentTime = new Date();
        const notificationDate = new Date(notificationTime);
      
        // Calculate the time difference in milliseconds
        const timeDifference = currentTime - notificationDate;
      
        // Convert the time difference to seconds, minutes, hours, and days
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
      
        // Determine the appropriate time unit
        if (days > 0) {
          return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        } else if (hours > 0) {
          return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else if (minutes > 0) {
          return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        } else {
          return 'Just now';
        }
      }
  return (
    <div className="notification-container">
      <div className="notification-header">
        Notifications

      </div>
      <div className="notification-body">
        {isAuthenticated ? (
            <div>
                {
                    notifications && notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <div key={index} className="notification-item">
                                <p className='notification-text'>{notification.notification_description}</p>
                                <p className='notification-time'>{calculateTimeDifference(notification.time_added)}</p>
                            </div>
                        ))
                    ) : (
                        <h3>No notifications</h3>
                    )
                }
            </div>
            ) : (
            <div>
                <h3>Log in to view notifications</h3>
            </div>
            
        )}
      </div>
    </div>
  );
};

export default Notification;