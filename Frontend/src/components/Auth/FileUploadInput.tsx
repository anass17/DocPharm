import { CloudUpload } from "@mui/icons-material"
import { Box, Button, Input, Typography } from "@mui/material"
import { GRAY4, GRAY2, GRAY3 } from "../../config/colors"

interface props {
    format: string
    description: string
}

export default function FileUploadInput({format, description}: props) {
    return (
        <Box mb={2}>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
                sx={{ bgcolor: '#F9F9F9', height: 110, border: '1px solid' + GRAY4, color: GRAY2, boxShadow: 'none', '&:hover': {boxShadow: '0px 1px 2px rgba(0, 0, 0, .2)'} }}
                fullWidth
                >
                {description}
                <Input
                    type="file"
                    sx={{ display: 'none' }}
                    // onChange={(event) => console.log(event.target.files)}
                />
            </Button>
            <Typography textAlign={"left"} variant="body2" fontSize={13} color={GRAY3} mt={0.5}>Format: {format}</Typography>
        </Box>
    )
}