import { Typography } from "@mui/material";
import MessageLayout from "../../layouts/Messages/MessageLayout";
import { DarkGreenButton } from "../../components/Button/FilledButtons";
import { Link } from "react-router-dom";


function NotFound() {
    return (
        <MessageLayout>
            <Typography variant="h4" component="h1" mb={5}>Access Denied</Typography>
            <Typography variant="body1" mb={5}>You are not authorized to access this page</Typography>
            <Link to="/home">
                <DarkGreenButton>Home</DarkGreenButton>
            </Link>
        </MessageLayout>
    )
}

export default NotFound