import { CloudUpload } from "@mui/icons-material"
import { Box, Button, Input, Typography } from "@mui/material"
import { GRAY4, GRAY2, GRAY3 } from "../../config/colors"

import UploadIcon from "../../assets/icons/UploadIcon"
import PictureIcon from "../../assets/icons/PictureIcon"
import FrontCardIcon from "../../assets/icons/PictureIcon"
import BackCardIcon from "../../assets/icons/BackCardIcon"
import FileIcon from "../../assets/icons/FileIcon"

function FileUploadInput({Icon = UploadIcon, onChange, inputName, format, description, error}) {

    let borderColor;
    {
        error ? (
            borderColor = '#F00'
        ) : (
            borderColor = GRAY4
        )
    }

    return (
        <Box mb={2}>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                // startIcon={<Icon />}
                sx={{ bgcolor: '#F9F9F9', height: 110, border: '1px solid ' + borderColor, color: GRAY2, boxShadow: 'none', '&:hover': {boxShadow: '0px 1px 2px rgba(0, 0, 0, .2)'} }}
                fullWidth
            >
                <Icon />
                {description}
                <Input
                    type="file"
                    sx={{ display: 'none' }}
                    name={inputName}
                    onChange={onChange}
                />
            </Button>
            <Typography textAlign={"left"} variant="body2" fontSize={13} color={GRAY3} mt={0.5}>Format: {format}</Typography>
        </Box>
    )
}

export default FileUploadInput;