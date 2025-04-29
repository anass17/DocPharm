import UserSimpleLayout from "./layouts/UserSimpleLayout";
import SettingsSection from "./sections/SettingsSection";

export default function UserSettings() {

    return (
        <>
            <UserSimpleLayout>
                <SettingsSection />
            </UserSimpleLayout>
        </>
    )
}