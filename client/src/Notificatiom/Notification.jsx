import * as api from '../api'

const createNotification = () => {
    if(!("Notification" in window)){(alert("no"))}
    else if (Notification.permission === 'granted') {
        const notification = new Notification({
            notificationText: 'There is a new post available.',
          });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          createNotification();
        }
      });
    }
  };
  

export const checkNotification = (id) => async(dispatch) => {
  try {
    const {data} = await api.getNotification(id);
    console.log( data )
    for (let i = 0; i <= data.length; i++) {
        createNotification()
        console.log('try')
      }
  } catch (error) {
    console.log(error)
  }
}