import DoctorListingSection from "./sections/DoctorListingSection";
import UserSidebarLayout from "./layouts/UserSidebarLayout";
import DoctorFiltersSidebar from "../../components/Sidebar/DoctorFiltersSidebar";
import { useState } from "react";

export default function UserDoctorsListing() {
    const [sorting, setSorting] = useState('recent')
    const [filters, setFilters] = useState(0)

    return (
        <>
            <UserSidebarLayout filters={filters} setFilters={setFilters} Sidebar={DoctorFiltersSidebar} title={"All Doctors"} sorting={sorting} setSorting={setSorting}>
                <DoctorListingSection sorting={sorting} filters={filters} />
            </UserSidebarLayout>
        </>
    )
}