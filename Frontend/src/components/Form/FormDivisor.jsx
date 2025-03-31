import { Box, Typography} from "@mui/material"
import { GRAY4, GRAY3 } from "../../config/colors"

function FormDivisor({children}) {

    return (

        <Box position={"relative"} mb={4}>
            <Typography variant="body1" component="h6" bgcolor={"#FFF"} zIndex={10} color={GRAY3} position={"relative"} display={"inline-block"} px={2}>{children}</Typography>
            <Box height={'1px'} width={"100%"} bgcolor={GRAY4} position={"relative"} bottom={11}  ></Box>
        </Box>

    )
}

export default FormDivisor;