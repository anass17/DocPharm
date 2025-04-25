import DoctorListingSection from "./sections/DoctorListingSection";
import UserSidebarLayout from "./layouts/UserSidebarLayout";
import PharmacyFiltersSidebar from "../../components/Sidebar/PharmacyFiltersSidebar";
import { useState } from "react";

export default function UserDoctorsListing() {
    const [sorting, setSorting] = useState('recent')
    const [filters, setFilters] = useState(0)

    return (
        <>
            <UserSidebarLayout filters={filters} setFilters={setFilters} Sidebar={PharmacyFiltersSidebar} title={"All Doctors"} sorting={sorting} setSorting={setSorting}>
                <DoctorListingSection sorting={sorting} filters={filters} />
            </UserSidebarLayout>
        </>
    )
}