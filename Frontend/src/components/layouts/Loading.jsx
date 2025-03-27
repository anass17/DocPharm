import { GREEN2, GREEN3 } from "../../config/colors"


export default function Loading() {
    return (
        <>
            <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1500, backgroundColor: GREEN3, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '100vh'}}>
                <p style={{ fontSize: '25px' }}>Loading ...</p>
            </div>
        </>
    )
}