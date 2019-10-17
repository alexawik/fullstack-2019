import React from 'react'
import './Notification.css'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  //console.log(message)

  if (message.includes('already removed')) {
    return (
      <div className="error">
        {message}
      </div>
    )
  } else {
    return (
      <div className="notification">
        {message}
      </div>
    )
  }


}

export default Notification