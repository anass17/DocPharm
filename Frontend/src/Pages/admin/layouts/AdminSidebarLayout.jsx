import PharmacyNavbar from '../../../components/Navbar/PharmacyNavbar';
import { Typography } from 'antd';
import AdminSidebar from '../../../components/Sidebar/AdminSidebar';

const {Title} = Typography

function AdminSidebarLayout({children, menuItem}) {

    return (
        <>
            {/* <AdminNa /> */}
            <div style={{ display: "flex" }}>
                <AdminSidebar menuItem={menuItem} />
                <div style={{ padding: "3rem 2.5rem", flex: 1 }}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default AdminSidebarLayout;