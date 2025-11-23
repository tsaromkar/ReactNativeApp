import { useState, useMemo, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { axiosPost } from '@network/axios';
import useAuthContext from '@contexts/hooks/useAuthContext';
import { useFormik } from 'formik';
import * as yup from 'yup';

export const useLogin = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { setTokens } = useAuthContext();

    const onSubmit = async (values) => {
        const { name, email, password } = values;
        const body = isLogin ? {
            email,
            password
        } : {
            name,
            email,
            password
        }
        try {
            const res = await axiosPost(`/user-api/${isLogin ? "login" : "signup"}`, body);
            const { data, message } = res;
            Toast.show({
                type: 'success',
                text1: message,
            })
            setTokens(data);
        } catch (e) {
            console.log("🚀 ~ onLogin ~ error:", e)
        }
    }

    const validationSchema = useMemo(() => yup.object().shape({
        name: !isLogin
            ? yup.string()
                .required('Name is required')
                .matches(/^[a-zA-Z\s]+$/, 'Name should contain letters only')
            : yup.string().notRequired(),
        email: yup.string().email('Invalid email address').required('Email is required'),
        password: yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/, 'Password must contain letters, numbers, and at least one special character'),
    }), [isLogin]);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        onSubmit,
        validationSchema,
        enableReinitialize: false,
    });

    // Trigger validation when isLogin changes
    useEffect(() => {
        formik.validateForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin]);

    return {
        formik,
        isLogin,
        setIsLogin,
    }
}