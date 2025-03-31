import { Typography } from "@mui/material";
import { DarkGreenButton } from "../../components/Button/FilledButtons";
import MessageLayout from "../../layouts/Messages/MessageLayout";
import { Link } from "react-router-dom"


function NotFound() {
    return (
        <MessageLayout>
            <Typography variant="h6" component="strong" mb={2}>Opps!</Typography>
            <Typography variant="h4" component="h1" mb={5}>Page Not Found</Typography>
            <Typography variant="body1" mb={5}>It seems that you are looking at the wrong place.</Typography>
            <Link to="/home">
                <DarkGreenButton>Home</DarkGreenButton>
            </Link>
        </MessageLayout>
    )
}

export default NotFound