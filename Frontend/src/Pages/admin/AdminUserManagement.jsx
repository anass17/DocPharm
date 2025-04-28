import AdminSidebarLayout from "./layouts/AdminSidebarLayout";
import UserManagementSection from "./sections/UserManagementSection";

export default function AdminUserManagement() {

    return (
        <>
            <AdminSidebarLayout menuItem={'15'}>
                <UserManagementSection />
            </AdminSidebarLayout>
        </>
    )
}