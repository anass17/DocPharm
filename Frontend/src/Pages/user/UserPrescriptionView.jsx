import UserSimpleLayout from "./layouts/UserSimpleLayout";
import PrescriptionViewSection from "./sections/PrescriptionViewSection";

export default function UserPrescriptionView() {

    return (
        <>
            <UserSimpleLayout>
                <PrescriptionViewSection />
            </UserSimpleLayout>
        </>
    )
}