import { Typography } from 'antd';
import AdminSidebar from '../../../components/Sidebar/AdminSidebar';
import AdminNavbar from '../../../components/Navbar/AdminNavbar';

const {Title} = Typography

function AdminSidebarLayout({children, menuItem}) {

    return (
        <>
            <AdminNavbar />
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