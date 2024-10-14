import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MypageLeft from './MypageLeft';
import { API_BASE_URL } from '../service/app-config';



const MyInfoUp = () => {


    return (
        <div className="mypageContainer">
            <MypageLeft />

            <div className="cartWrapper">
                <h1>내정보 변경</h1>

            </div>
        </div>
    );
};

export default MyInfoUp;
