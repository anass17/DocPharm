import { Typography } from "@mui/material";
import { DarkGreenButton } from "../../components/Button/FilledButtons";
import MessageLayout from "../../layouts/Messages/MessageLayout";
import { Link, useNavigate } from "react-router-dom"


function NotFound() {

    const navigate = useNavigate()

    return (
        <MessageLayout>
            <Typography variant="h6" component="strong" mb={2}>Opps!</Typography>
            <Typography variant="h4" component="h1" mb={5}>Page Not Found</Typography>
            <Typography variant="body1" mb={5}>It seems that you are looking at the wrong place.</Typography>
            <Link to="/home">
                <DarkGreenButton onClick={() => navigate(-1)}>Back</DarkGreenButton>
            </Link>
        </MessageLayout>
    )
}

export default NotFound