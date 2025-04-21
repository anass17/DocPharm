import { notification, Typography } from "antd";
import { useState } from "react";
import { backend_url } from "../../../config/app";
import Cookies from 'js-cookie';

const { Title, Text } = Typography

const AppointmentsSection = () => {

    const [loading, setLoading] = useState(false);
    const [api, NotificationHolder] = notification.useNotification();

    const openNotification = (message, description, type = 'info') => {
        api.open({
            type: type,
            message: message,
            description: <p>{description}</p>,
            placement: 'bottomRight',
            duration: 5,
            showProgress: true,
            pauseOnHover: true,
        });
    };


    

    return (
        <>
            {NotificationHolder}
        </>
    )
}

export default AppointmentsSection;