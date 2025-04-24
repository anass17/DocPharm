import { LoadingOutlined } from "@ant-design/icons";
import { GREEN2, GREEN3, LIGHT_BLUE } from "../../config/colors"
import { Spin } from "antd";
import '../../assets/style/CustomLoading.css'


function LoadingOverlay() {
    return (
        <>
            <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1500, backgroundColor: LIGHT_BLUE, display: 'flex', gap: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', minHeight: '100vh'}}>
                <span class="loader"></span>
            </div>
        </>
    )
}

export default LoadingOverlay;