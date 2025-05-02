import { Typography } from "antd"
import { Typography as TP } from "@mui/material"
import { GREEN } from "../../../config/colors"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const UserPaymentLayout = ({url, children}) => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate(url)
        }, 5000)
    })

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <div style={{ textAlign: 'center', paddingBottom: 50 }}>
                    <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={150} fill={GREEN} viewBox="0 0 512 512">
                        {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                    </div>
                    <Typography.Title level={2} style={{ marginBottom: 0.5, color: GREEN }}>Thank You</Typography.Title>
                    <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 30 }}>Payment Done Successfully</Typography.Title>
                    <TP>{children}</TP>
                </div>
            </div>
        </>
    )
}

export default UserPaymentLayout