import BookAppointmentSection from "./sections/BookAppointmentSection";
import UserSimpleLayout from "./layouts/UserSimpleLayout";

export default function UserBookAppointment() {

    return (
        <>
            <UserSimpleLayout>
                <BookAppointmentSection />
            </UserSimpleLayout>
        </>
    )
}