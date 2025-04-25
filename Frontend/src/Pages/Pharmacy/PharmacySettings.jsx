import PharmacySettingsSection from "./sections/PharmacySettingsSection";
import PharmacySimpleLayout from "./layouts/PharmacySimpleLayout";

export default function PharmacySettings() {

    return (
        <>
            <PharmacySimpleLayout>
                <PharmacySettingsSection />
            </PharmacySimpleLayout>
        </>
    )
}