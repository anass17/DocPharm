import ProfileSection from "./sections/ProfileSection";
import AdminSimpleLayout from "./layouts/AdminSimpleLayout";

export default function AdminProfile() {

    return (
        <>
            <AdminSimpleLayout>
                <ProfileSection />
            </AdminSimpleLayout>
        </>
    )
}