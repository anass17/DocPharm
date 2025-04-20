import SettingsSection from "./sections/SettingsSection";
import DoctorSimpleLayout from "./layouts/DoctorSimpleLayout";

export default function DoctorSettings() {

    return (
        <>
            <DoctorSimpleLayout>
                <SettingsSection />
            </DoctorSimpleLayout>
        </>
    )
}