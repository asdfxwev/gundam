import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './SignupForm.css';
import { useNavigate } from 'react-router-dom';

// 중복 확인 함수들
const checkIdExists = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3001/users?id=${id}`);
        return response.data.length > 0;
    } catch (error) {
        console.error('Error checking ID:', error);
        return false;
    }
};
const checkEmailExists = async (email) => {
    try {
        // 서버로부터 모든 사용자 데이터를 가져오는 용도
        const response = await axios.get('http://localhost:3001/users');

        // 응답 데이터를 확인하여 구조가 올바른지 콘솔에 출력(에러 확인용)
        console.log('Response data:', response.data);

        // 가져온 데이터에서 이메일이 있는지 확인하는 코드
        const emailExists = response.data.some(user => {
            // user.email이 존재하는지 확인하는 코드
            if (user.email) {
                const normalizedEmail = user.email.trim().toLowerCase();
                const normalizedInputEmail = email.trim().toLowerCase();
                console.log(`Comparing ${normalizedEmail} with ${normalizedInputEmail}`); // 로그 추가
                return normalizedEmail === normalizedInputEmail;
            }
            return false;
        });

        return emailExists;
    } // 에러날 경우 코드
    catch (error) {
        console.error('Error checking email:', error);
        return false;
    }
};



// const checkPhoneNumberExists = async (phoneNumber) => {
//     try {
//         const response = await axios.get(`http://localhost:3001/users?phoneNumber=${phoneNumber}`);
//         return response.data.length > 0;
//     } catch (error) {
//         console.error('Error checking phone number:', error);
//         return false;
//     }
// };

const checkPhoneNumberExists = async (phoneNumber) => {
    try {
        // 서버로부터 모든 사용자 데이터를 가져오는 용도
        const response = await axios.get('http://localhost:3001/users');

        // 응답 데이터를 확인하여 구조가 올바른지 콘솔에 출력(에러 확인용)
        console.log('Response data:', response.data);

        // 가져온 데이터에서 이메일이 있는지 확인하는 코드
        const phoneNumberExists = response.data.some(user => {
            // user.email이 존재하는지 확인하는 코드
            if (user.phoneNumber) {
                const normalizedPhone = user.phoneNumber.trim().toLowerCase();
                const normalizedInputPhone = phoneNumber.trim().toLowerCase();
                console.log(`Comparing ${normalizedPhone} with ${normalizedInputPhone}`); // 로그 추가
                return normalizedPhone === normalizedInputPhone;
            }
            return false;
        });

        return phoneNumberExists;
    } // 에러날 경우 코드
    catch (error) {
        console.error('Error checking phoneNumber:', error);
        return false;
    }
};

const SignupForm = () => {
    const navigate = useNavigate();
    const [isIdChecked, setIsIdChecked] = useState(false);
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const [isPhoneNumberChecked, setIsPhoneNumberChecked] = useState(false);

    const handleSubmit = async (values) => {
        if (!isIdChecked) {
            alert('아이디 중복 확인을 해주세요.');
            return;
        }
        if (!isEmailChecked) {
            alert('이메일 중복 확인을 해주세요.');
            return;
        }
        if (!isPhoneNumberChecked) {
            alert('핸드폰 번호 중복 확인을 해주세요.');
            return;
        }

        const { id, email, phoneNumber, address, dtl_address, ...otherValues } = values;
        const combinedAddress = `${address} ${dtl_address}`;

        try {
            const response = await axios.post('http://localhost:3001/users', { id, email, phoneNumber, address: combinedAddress, ...otherValues });
            console.log(response.data);
            navigate('/Login');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.onload = () => {
            const addressKakao = document.getElementById("address_kakao");
            if (addressKakao) {
                addressKakao.addEventListener("click", function () {
                    new window.daum.Postcode({
                        oncomplete: function (data) {
                            formik.setFieldValue('address', data.address);
                            document.querySelector("input[name='address']").focus();
                        }
                    }).open();
                });
            }
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const formik = useFormik({
        initialValues: {
            id: '',
            email: '',
            password: '',
            confirmPassword: '',
            address: '',
            dtl_address: '',
            phoneNumber: '',
            birthdate: '',
            gender: ''
        },
        validationSchema: Yup.object({
            id: Yup.string()
                .required('아이디를 입력해주세요.')
                .min(4, '아이디는 최소 4자 이상이어야 합니다.'),
            email: Yup.string()
                .email('올바른 이메일 주소를 입력하세요.')
                .required('이메일 주소는 필수 항목입니다.'),
            password: Yup.string()
                .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
                .required('비밀번호는 필수 항목입니다.'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
                .required('비밀번호 확인은 필수 항목입니다.'),
            address: Yup.string().required('주소는 필수 항목입니다.'),
            dtl_address: Yup.string(),
            phoneNumber: Yup.string()
                .matches(/^010[0-9]{8}$/, '유효한 핸드폰 번호를 입력하세요.')
                .required('핸드폰 번호는 필수 항목입니다.'),
            birthdate: Yup.date()
                .required('생년월일을 입력해주세요.'),
            gender: Yup.string()
                .required('성별을 선택하세요.')
        }),
        onSubmit: handleSubmit,
    });

    return (
        <div className='join_box'>
            <form onSubmit={formik.handleSubmit} className="signup-form">
                <h1 className='logo2'>
                    <a href="/"><img src='../../image/logo.png' alt='/' /></a>
                </h1>

                <div className="form-group">
                    <label htmlFor="id">아이디</label>
                    <input
                        id="id"
                        name="id"
                        type="text"
                        onChange={(e) => {
                            formik.handleChange(e);
                            setIsIdChecked(false);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.id}
                        placeholder="아이디를 입력하세요"
                    />
                    <button
                        type="button"
                        onClick={async () => {
                            if (!formik.values.id) {
                                alert('아이디를 입력하세요.');
                                return;
                            }
                            if (formik.errors.id) {
                                alert(formik.errors.id);
                                return;
                            }
                            const idExists = await checkIdExists(formik.values.id);
                            if (idExists) {
                                alert('이미 사용 중인 아이디입니다.');
                                setIsIdChecked(false);
                            } else {
                                alert('사용 가능한 아이디입니다.');
                                setIsIdChecked(true);
                            }
                        }}
                    >
                        중복 확인
                    </button>
                    {formik.touched.id && formik.errors.id ? (
                        <div className="error">{formik.errors.id}</div>
                    ) : null}
                </div>

                <div className="form-group">
                    <label htmlFor="email">이메일</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={(e) => {
                            formik.handleChange(e);
                            setIsEmailChecked(false);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        placeholder="이메일을 입력하세요"
                    />
                    <button
                        type="button"
                        onClick={async () => {
                            if (!formik.values.email) {
                                alert('이메일을 입력하세요.');
                                return;
                            }
                            if (formik.errors.email) {
                                alert(formik.errors.email);
                                return;
                            }
                            const emailExists = await checkEmailExists(formik.values.email);
                            if (emailExists) {
                                alert('이미 사용 중인 이메일입니다.');
                                setIsEmailChecked(false);
                            } else {
                                alert('사용 가능한 이메일입니다.');
                                setIsEmailChecked(true);
                            }
                        }}
                    >
                        중복 확인
                    </button>
                    {formik.touched.email && formik.errors.email ? (
                        <div className="error">{formik.errors.email}</div>
                    ) : null}
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">핸드폰 번호</label>
                    <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        onChange={(e) => {
                            formik.handleChange(e);
                            setIsPhoneNumberChecked(false);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.phoneNumber}
                        placeholder="핸드폰 번호를 입력하세요"
                    />
                    <button
                        type="button"
                        onClick={async () => {
                            if (!formik.values.phoneNumber) {
                                alert('핸드폰 번호를 입력하세요.');
                                return;
                            }
                            if (formik.errors.phoneNumber) {
                                alert(formik.errors.phoneNumber);
                                return;
                            }
                            const phoneNumberExists = await checkPhoneNumberExists(formik.values.phoneNumber);
                            if (phoneNumberExists) {
                                alert('이미 사용 중인 핸드폰 번호입니다.');
                                setIsPhoneNumberChecked(false);
                            } else {
                                alert('사용 가능한 핸드폰 번호입니다.');
                                setIsPhoneNumberChecked(true);
                            }
                        }}
                    >
                        중복 확인
                    </button>
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                        <div className="error">{formik.errors.phoneNumber}</div>
                    ) : null}
                </div>

                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder="비밀번호를 입력하세요"
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="error">{formik.errors.password}</div>
                    ) : null}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">비밀번호 확인</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                        placeholder="비밀번호를 다시 입력하세요"
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div className="error">{formik.errors.confirmPassword}</div>
                    ) : null}
                </div>

                <div className="form-group">
                    <label htmlFor="address">주소</label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                        placeholder="주소를 입력하세요"
                        readOnly
                    />
                    <button type="button" id="address_kakao">
                        주소 검색
                    </button>
                    {formik.touched.address && formik.errors.address ? (
                        <div className="error">{formik.errors.address}</div>
                    ) : null}
                </div>

                <div className="form-group">
                    <label htmlFor="dtl_address">상세 주소</label>
                    <input
                        id="dtl_address"
                        name="dtl_address"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dtl_address}
                        placeholder="상세 주소를 입력하세요"
                    />
                    {formik.touched.dtl_address && formik.errors.dtl_address ? (
                        <div className="error">{formik.errors.dtl_address}</div>
                    ) : null}
                </div>

                <div className="form-group">
                    <label htmlFor="birthdate">생년월일</label>
                    <input
                        id="birthdate"
                        name="birthdate"
                        type="date"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.birthdate}
                    />
                    {formik.touched.birthdate && formik.errors.birthdate ? (
                        <div className="error">{formik.errors.birthdate}</div>
                    ) : null}
                </div>

                <div className="form-group">
                    <label htmlFor="gender">성별</label>
                    <select
                        id="gender"
                        name="gender"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.gender}
                    >
                        <option value="" label="선택하세요" />
                        <option value="male" label="남성" />
                        <option value="female" label="여성" />
                    </select>
                    {formik.touched.gender && formik.errors.gender ? (
                        <div className="error">{formik.errors.gender}</div>
                    ) : null}
                </div>

                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default SignupForm;
