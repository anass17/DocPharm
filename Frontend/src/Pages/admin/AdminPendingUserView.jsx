import AdminSimpleLayout from "./layouts/AdminSimpleLayout";
import PendingUsersViewSection from "./sections/PendingUserViewSection";

export default function AdminPendingUserView() {

    return (
        <>
            <AdminSimpleLayout>
                <PendingUsersViewSection />
            </AdminSimpleLayout>
        </>
    )
}