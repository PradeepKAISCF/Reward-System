import * as api from '../api'


export const checkNotification = (id,toast) => async(dispatch) => {
  try {
    
    const {data} = await api.getNotification(id)
    if(data.length > 0){
      for (let i = 0; i < data.length; i++) {
        const user = data[i].userPosted
        const question = data[i].questionid
        toast.success(`${user} answered for your question`, {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          },onclick = () =>{window.location.href = `https://localhost:3000/Questions/${question}`});
        }
    }
  } catch (error) {
    console.log(error)
  }
}