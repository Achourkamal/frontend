import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import React, {useState} from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBBtn
}
from 'mdb-react-ui-kit';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const BASEURL = process.env.REACT_APP_BASEURL;


function Login() {
  const [email, setEmail] = useState(null)
  const [password, setPassord] = useState(null)
  const [error, setError] = useState(null);
  const navigate = useNavigate();


    const handleSubmitForm = async () => {
         try {
            const response = await axios.post(`${BASEURL}/auth/login`, {email, password});
            localStorage.setItem('userConnectedData', JSON.stringify(response.data));
            navigate('/admin/dashboard')
        } catch (error) {
            setError(error.response?.data?.message || 'login error');
        } finally {
            // setIsLoading(false);
        }

  };
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
     {error && <Alert variant="danger">{error}</Alert>}

      <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' onChange={e => setEmail(e.target.value)} />
      <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={e => setPassord(e.target.value)}/>

      <MDBBtn className="mb-4" onClick={handleSubmitForm}>Sign in</MDBBtn>

      <div className="text-center">
        <p>Not a member? <a href="#!">Register</a></p>
      </div>

    </MDBContainer>
  );
}

export default Login;