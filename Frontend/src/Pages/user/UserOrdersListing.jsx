import UserDashboardLayout from "./layouts/UserDashboardLayout";
import OrderListingSection from "./sections/OrderListingSection";

export default function UserOrdersListing() {

    return (
        <>
            <UserDashboardLayout menuItem={'16'} title={'Orders'} description={"Keep track on your orders"}>
                <OrderListingSection />
            </UserDashboardLayout>
        </>
    )
}