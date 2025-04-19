import { Button } from "@mui/material"
import { GRAY2 } from "../../config/colors"

export default function LoadingButton ({children, ...rest}) {
    return (
        <Button loading sx={{ bgcolor: '#EEE', px: 4, height: 40, color: GRAY2 }} {...rest}>
            {children}
        </Button>
    )
}
