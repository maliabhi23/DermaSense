import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Button, Fieldset, Input, Spinner, Stack, Text } from "@chakra-ui/react"
import { Field } from "../components/ui/field"
import { useForm } from "react-hook-form"
import { PasswordInput } from "../components/ui/password-input"
import { useNavigate } from 'react-router-dom'
import { showToast } from '../customcomponent/ToastComponent'
import axios from 'axios'
import Aos from 'aos'

export default function Signup() {

        const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
            reset
          } = useForm()

        const navigate = useNavigate();
    
        const [load,setLoad] = useState(false);

          useEffect(()=>{
            Aos.init({
              duration:500,
              delay:200
            });
          },[]);

        const checkSignup = async(data)=>{
          try{
            setLoad(true);
            let url = String(import.meta.env.VITE_URL);
            url += 'v1/signup';
  
            const response = await axios.post(url,data,{headers:{"Content-Type": "application/json"},});
            
            console.log(response);

            if(response.data.success){
              localStorage.setItem('token',response.data.token);
              showToast(response.data.message,"success");
              reset();
              setLogin(true);
              navigate('/login');
            }else{
              showToast(response.data.message,"error");
            }
  
          }catch(err){
            showToast('User already exists!',"error");
          }finally{
            reset();
            setLoad(false);
          }
        }

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5" >
    <div className="w-100 bg-light mt-5 shadow-lg p-2" style={{ maxWidth: "400px" }} data-aos='fade-up'> 
      <form  onSubmit={handleSubmit(checkSignup)}>
      <Fieldset.Root size="lg" maxW="md" width="100%" marginTop={'5%'}  colorPalette={'blue'}>
        <Stack>
          <Fieldset.Legend className='text-center'>Sign Up</Fieldset.Legend>
        </Stack>

        <Fieldset.Content>
        <Field label="Name">
            <Input name="name" type='text'  required {...register('name')}/>
          </Field>
          
          <Field label="Email">
            <Input name="email" type='email'  required {...register('email')}/>
          </Field>

          <Field label="Password">
              <PasswordInput required {...register('password')}/>
          </Field>
        </Fieldset.Content>

        <Button type="submit" colorPalette={'green'} variant={'subtle'} alignSelf="flex-center" marginTop={'5%'} rounded={'2%'} disabled={load}>
          {load ? <Spinner/> : 'Submit'}
        </Button>
          <h6 className='text-center mt-4 mb-2 changeCol' style={{cursor:'pointer'}} onClick={()=>navigate('/login')}>Already Have Account? Login</h6>
      </Fieldset.Root>
      </form>
    </div>
  </Container>
  )
}
