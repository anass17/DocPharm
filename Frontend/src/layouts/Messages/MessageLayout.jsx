import { Container, Box } from "@mui/material"

export default function MessageLayout({children}) {

  return (
    <>
      <Container maxWidth="lg" sx={{display:"flex", alignItems:'center', height: '100vh' }}>
            <Box py={{xs: 7, md: 10 }} px={{ xs: 3, md: 10 }} textAlign={"center"} sx={{ position: 'relative', backgroundColor: '#FFF', width: '100%', borderRadius: '5px', boxShadow: '0px 1px 2px rgba(0, 0, 0, .15)', border: '1px solid rgba(0, 0, 0, .1)' }}>
                {children}
            </Box>
        </Container>
    </>

  )
}