import Layout from "../../layouts/DefaultLayout";
import { Container, Box, Grid2, Typography, Button, TextField, Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@mui/material"
import { GRAY0, GREEN, GRAY2, GREEN2, GRAY4, GRAY3, GREEN3 } from "../../config/colors"
import { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { loginUser } from "../../store/actions/userActions";
import Cookies from 'js-cookie';
import { backend_url } from "../../config/app";

function Register() {
  
  const [data, setData] = useState({first_name: '', last_name: '', email: '', password: '', type: ''});
  const [errors, setErrors] = useState({first_name: '', last_name: '', email: '', password: '', type: ''})
  const [submit, setSubmit] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(e) {
      const {name, value} = e.target;

      setData({
          ...data,
          [name]: value
      })
  }

  async function handleSubmit(e) {
      e.preventDefault();

      setSubmit(true);
  
      try {
          const response = await fetch(backend_url + '/api/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          });
  
          const responseData = await response.json();
  
          if (response.status === 422) {
              setErrors(responseData.errors);
              setData({
                  ...data,
                  password: ''
              })
              setSubmit(false);
          } else if (response.status === 200) {
              dispatch(loginUser(responseData.user))
              Cookies.set('auth_token', responseData.token, { expires: 1, path: '/' });
              navigate('/verification');
          } else {
              setErrors('An unexpected error occurred.')
              setData({
                  ...data,
                  password: ''
              })
              setSubmit(false);
          }
      } catch (error) {
          setErrors('An error occurred while processing your request.')
          setData({
              ...data,
              password: '',
          })
          setSubmit(false);
      }
  }

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 5, display:"flex", alignItems:'center', minHeight: '100vh' }}>
          <Box sx={{ position: 'relative', backgroundColor: '#FFF', width: '100%', borderRadius: '5px', boxShadow: '0px 1px 2px rgba(0, 0, 0, .15)', border: '1px solid rgba(0, 0, 0, .1)' }}>
              <Typography variant="body2" position={"absolute"} bottom={20} left={30}>
                  Already a member ? 
                  <Link to="/login" style={{ textDecoration: 'none', marginLeft: '0.25rem', color: GREEN }}>Sign in</Link>
              </Typography>
              <Grid2 container spacing={5} p={4} pb={{ xs: 8, md: 4 }} alignItems={"center"}>
                  <Grid2 size={{md: 6, sm: 12}}>
                      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                          <Typography variant="h4" component="h1" mb={1}>Join Us!</Typography>
                          <Typography variant="body1" mb={8}>Create an account and access to our services</Typography>
                          <Box display={"flex"} gap={1} style={{ marginBottom: '12px' }}>
                              <TextField label="First Name" name="first_name" error={!!errors.first_name} helperText={errors.first_name} variant="outlined" onChange={handleChange} sx={{ backgroundColor: '#F9F9F9' }} fullWidth />
                              <TextField label="Last Name" name="last_name" error={!!errors.last_name} helperText={errors.last_name} onChange={handleChange} variant="outlined" sx={{ backgroundColor: '#F9F9F9' }} fullWidth />
                          </Box>
                          <TextField label="Email" variant="outlined" name="email" error={!!errors.email} helperText={errors.email} onChange={handleChange} sx={{ marginBottom: '12px', backgroundColor: '#F9F9F9' }} fullWidth />
                          <TextField label="Password" type="password" name="password" value={data.password} error={!!errors.password} helperText={errors.password} variant="outlined" onChange={handleChange} sx={{ marginBottom: '12px', backgroundColor: '#F9F9F9' }} fullWidth />

                          {/* Select - Account Type */}

                          <FormControl fullWidth error={!!errors.type}>
                              <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                              <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  label="Account Type"
                                  name="type"
                                  sx={{ textAlign: 'left' }}
                                  onChange={handleChange}
                                  value={data.type}
                              >
                                  <MenuItem value="">Select</MenuItem>
                                  <MenuItem value="client">Client</MenuItem>
                                  <MenuItem value="doctor">Doctor</MenuItem>
                                  <MenuItem value="pharmacy">Pharmacy</MenuItem>
                              </Select>
                              <FormHelperText>{errors.type}</FormHelperText>
                          </FormControl>

                          {/* Sumbit */}

                          <Box mt={2} display="flex" justifyContent={"space-between"} alignItems={"center"}>  
                              {
                                  !submit ?
                                  (
                                      <Button variant="contained" type="Submit" sx={{ bgcolor: GREEN, py: 1, px: 5 }}>
                                          Register
                                      </Button>
                                  ) : (
                                      <Button loading variant="outlined" type="button" sx={{ py: 1, px: 5 }}>
                                          Register
                                      </Button>   
                                  )
                              }
                          </Box>
                      </form>
                  </Grid2>
                  <Grid2 display={{md: 'block', xs: 'none'}} size={{md: 6}}>
                      <Box height={600} borderRadius={2} display={'flex'} alignItems={"center"} justifyContent={'center'} sx={{ background: `linear-gradient(45deg, ${GREEN3}, ${GREEN2})` }}>
                          <img style={{ width: '90%' }} src="/images/register.png" />
                      </Box>
                  </Grid2>
              </Grid2>
          </Box>
      </Container>
    </Layout>
  )
}

export default Register;