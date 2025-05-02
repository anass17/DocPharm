import { LoadingOutlined } from "@ant-design/icons";
import { GRAY0, GRAY2, GREEN, GREEN2, GREEN3, LIGHT_BLUE } from "../../config/colors"
import { Spin } from "antd";
import '../../assets/style/CustomLoading.css'
import { Typography } from "@mui/material";


function LoadingOverlay() {
    return (
        <>
            <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1500, backgroundColor: LIGHT_BLUE, display: 'flex', gap: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', minHeight: '100vh'}}>
                <span className="loader"></span>
                <Typography variant='h4' color={GRAY0} letterSpacing={2}><span style={{ color: GREEN }}>D</span>oc<span style={{ color: GREEN }}>P</span>harm</Typography>
            </div>
        </>
    )
}

export default LoadingOverlay;