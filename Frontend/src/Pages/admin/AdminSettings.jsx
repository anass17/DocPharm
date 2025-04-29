import AdminSimpleLayout from "./layouts/AdminSimpleLayout";
import SettingsSection from "./sections/SettingsSection";

export default function AdminSettings() {

    return (
        <>
            <AdminSimpleLayout>
                <SettingsSection />
            </AdminSimpleLayout>
        </>
    )
}