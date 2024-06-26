import React from 'react'
import { useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast} from 'react-toastify';


const Verify = () => {

  const [userData, setUserData] = useState({
    email: '',
  })


  const [error, setError] = useState(false)

  const ForgotUser = async (e) => {
    e.preventDefault()
    setError('')
    try {

      const response = await axios.post(`https://blog-backend-six-drab.vercel.app/api/users/verify`, userData)

      if (response.status==200) {
        toast.info('Please check your mail', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

    }
    catch (err) {
      setError(err.response.data.message)
    }
  }
  
  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return {...prevState,[e.target.name]:e.target.value}
    })
  }

  return (
    <section className='login'>
      <div className="container">
        <h2>Verify Email</h2>
        <form className='form login_form' onSubmit={ForgotUser}>
          {error && <p className="form_error-message">{error}</p>}
          <input type="email" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler} />
          <button className='btn primary'>Submit</button>
        </form>
      </div>
    </section>
  )
}

export default Verify