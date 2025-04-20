import ProfileSection from "./sections/ProfileSection";
import DoctorSimpleLayout from "./layouts/DoctorSimpleLayout";

export default function DoctorProfile() {

    return (
        <>
            <DoctorSimpleLayout>
                <ProfileSection />
            </DoctorSimpleLayout>
        </>
    )
}