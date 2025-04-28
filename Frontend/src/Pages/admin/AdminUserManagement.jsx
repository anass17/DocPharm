import AdminSidebarLayout from "./layouts/AdminSidebarLayout";
import UserManagementSection from "./sections/UserManagementSection";

export default function AdminUserManagement() {

    return (
        <>
            <AdminSidebarLayout menuItem={'13'}>
                <UserManagementSection />
            </AdminSidebarLayout>
        </>
    )
}