import UserPaymentLayout from "./layouts/UserPaymentLayout";
import { useEffect, useState } from "react";
import axios from 'axios';
import { backend_url } from "../../config/app";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/actions/cartActions";

export default function UserPaymentSuccess() {
    const location = useLocation();
    const dispatch = useDispatch()

    useEffect(() => {

        const params = new URLSearchParams(location.search);
        const sessionId = params.get('session_id');

        if (sessionId) {
            confirmOrder(sessionId);
        }

    }, [location])

    const confirmOrder = async (sessionId) => {
        try {

            fetch(`${backend_url}/api/confirm-order/${sessionId}`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('auth_token')
                }
            }).then(response => {
                response.status === 200 ? dispatch(clearCart()) : null
            })
            .catch(error => {
                console.error(error);
            });
            

        } catch (error) {
          console.error('Error verifying payment:', error);
        }
    };

    return (
        <>
            <UserPaymentLayout url={'/medicines'}>
                We have notified the pharmacy, and we will keep you updated of the status of your order
            </UserPaymentLayout>
        </>
    )
}