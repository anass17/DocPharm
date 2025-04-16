import { Button } from "@mui/material"
import {GRAY4, GREEN } from "../../config/colors"

export function DarkGreenButton ({children, onClick=null, ...rest}) {
    return (
        <Button sx={{ bgcolor: rest.disabled ? GRAY4 : GREEN , py: 1, px: 5, color: '#FFF' }} {...rest} onClick={onClick}>{children}</Button>
    )
}
