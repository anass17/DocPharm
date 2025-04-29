import ProfileSection from "../user/sections/ProfileSection";
import UserSimpleLayout from "./layouts/UserSimpleLayout";

export default function UserProfile() {

    return (
        <>
            <UserSimpleLayout>
                <ProfileSection />
            </UserSimpleLayout>
        </>
    )
}