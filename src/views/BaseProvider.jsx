'use client'

import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentUserThunk } from "@/redux/slices/currentUserSlice";
import {Toaster} from "react-hot-toast";

export default function BaseProvider({ children }) {
    const user = useSelector(state => state.currentUser);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchCurrentUserThunk());
    }, [dispatch]);


    useEffect(() => {
        if (!user.token || user.status!==null) {
            router.push('/login');
        }
    }, [user, router]);

    return (
        <div>
            <Toaster />
            {children}
        </div>
    );
}