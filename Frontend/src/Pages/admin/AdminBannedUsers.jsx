import AdminSidebarLayout from "./layouts/AdminSidebarLayout";
import BannedUsersSection from "./sections/BannedUsersSection";

export default function AdminBannedUsers() {

    return (
        <>
            <AdminSidebarLayout menuItem={'16'}>
                <BannedUsersSection />
            </AdminSidebarLayout>
        </>
    )
}