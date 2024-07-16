import React, { useEffect } from 'react'
import { useAuth } from './auth'
import { getDatabase, ref, onValue } from 'firebase/database'

function Notifications() {
  const { currentUser } = useAuth()
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (currentUser) {
      const db = getDatabase()
      const notificationsRef = ref(db, 'notifications/' + currentUser.uid)
      onValue(notificationsRef, snapshot => {
        const data = snapshot.val()
        if (data) {
          setNotifications(Object.values(data))
        }
      })
    }
  }, [currentUser])

  return (
    <div>
      {notifications.map((notification, index) => (
        <div key={index}>
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  )
}

export default Notifications
