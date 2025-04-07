import { Button } from "@mui/material"
import {GREEN } from "../../config/colors"

export function DarkGreenButton ({children, onClick=null}) {
    return (
        <Button sx={{ bgcolor: GREEN, py: 1, px: 5, color: '#FFF' }} onClick={onClick}>{children}</Button>
    )
}
