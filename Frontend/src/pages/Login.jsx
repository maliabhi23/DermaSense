import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Button, Fieldset, Input, Spinner, Stack, Text } from "@chakra-ui/react"
import { Field } from "../components/ui/field"
import { useForm } from "react-hook-form"
import { PasswordInput } from "../components/ui/password-input"
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AppContext from '../context/AppContext'
import {showToast} from '../customcomponent/ToastComponent'
import Aos from 'aos'

export default function Login() {

  useEffect(()=>{
    Aos.init({
      duration:500,
      delay:200
    });
  },[]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm();

    const [load,setLoad] = useState(false);

    const {login,setLogin} = useContext(AppContext);

    // v1/login
    const checkLogin = async(data)=>{
        try{
          setLoad(true);
          let url = String(import.meta.env.VITE_URL);
          url += 'v1/login';

          const response = await axios.post(url,data,{headers:{"Content-Type": "application/json"},});

          if(response.data.success){
            localStorage.setItem('token',response.data.token);
            showToast(response.data.message,"success");
            reset();
            setLogin(true);
            navigate('/home');
          }else{
            showToast(response.data.message,"error");
          }

        }catch(err){
          if (err.response) {
            // Server responded with a status code outside 2xx
            showToast(err.response.data.message || "Login failed", "error");
          } else {
            // Network or unknown error
            showToast("Something went wrong. Please try again.", "error");
          }
        }finally{
          reset();
          setLoad(false);
        }
     
    }

    const navigate = useNavigate();

    return (
    <Container className="mt-5 d-flex justify-content-center align-items-center" >
      <div className="w-100 bg-light mt-5 shadow-lg p-2" style={{ maxWidth: "400px" }} data-aos='fade-up'>  
        <form  onSubmit={handleSubmit(checkLogin)}>
        <Fieldset.Root size="lg" maxW="md" width="100%" marginTop={'5%'}  colorPalette={'blue'}>
          <Stack>
            <Fieldset.Legend className='text-center'>Login</Fieldset.Legend>
          </Stack>

          <Fieldset.Content>
            <Field label="Email">
              <Input name="email" type='email'  required {...register('email')}/>
            </Field>

            <Field label="Password">
                <PasswordInput required {...register('password')}/>
            </Field>
          </Fieldset.Content>

          <Button type="submit" colorPalette={'green'} variant={'subtle'} alignSelf="flex-center" marginTop={'5%'} rounded={'2%'} disabled={load}>
            {load ?<Spinner/> :'Submit'}
          </Button>
            <h6 className='text-center mt-4 mb-2 changeCol' style={{cursor:'pointer'}} onClick={()=>navigate('/signup')}>Don't have an account? Sign Up</h6>
        </Fieldset.Root>
        </form>
      </div>
    </Container>
  )
}
