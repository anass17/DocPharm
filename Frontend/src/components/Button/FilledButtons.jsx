import { Button } from "@mui/material"
import {GREEN } from "../../config/colors"

export function DarkGreenButton ({children}) {
    return (
        <Button sx={{ bgcolor: GREEN, py: 1, px: 5, color: '#FFF' }}>{children}</Button>
    )
}
