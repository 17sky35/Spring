import React from "react";
import { Navigate } from "react-router-dom";

const SocialLogin = (props) => {
    const getUrlParameter = (name) => {
        //window.location.search : URL에서 쿼리스트링을 가져오는 속성
        let search = window.location.search;
        let params = new URLSearchParams(search);
        return params.get(name);
    }
    const token = getUrlParameter("token");
    console.log('토큰 파싱 : ' + token);

    if(token){
        console.log('로컬스토리지에 토큰 저장' + token);
        localStorage.setItem("ACCESS_TOKEN",token);
        return(
            //<Navigate/> : 페이지를 리다이렉트 할 때 사용하는 컴포넌트이다.
            <Navigate to={{pathname:"/", state:{from:props.location}}}/>
        )
    }else{
        return(
            <Navigate to={{pathname:"/login", state:{from:props.location}}}/>
        )
    }
}

export default SocialLogin;