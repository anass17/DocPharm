import { Button } from "@mui/material"
import {GRAY4, PRIMARY_GREEN } from "../../config/colors"

export function DarkGreenButton ({children, onClick=null, ...rest}) {
    return (
        <Button sx={{ bgcolor: rest.disabled ? GRAY4 : PRIMARY_GREEN , py: 1, px: 4, color: '#FFF', gap: 1.5 }} {...rest} onClick={onClick}>{children}</Button>
    )
}
