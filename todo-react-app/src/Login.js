import React from "react";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import {signin} from "./service/ApiService";
import { Link } from "react-router-dom";

function Login (){

    //폼 제출시 호출되는 함수
    const handleSubmit = (event) => {
        event.preventDefault(); //페이지가 새로고침 되지 않도록 기본 동작을 막음
        const data = new FormData(event.target);//제출된 폼 데이터를 가져온다.
        const username = data.get("username");//username 필드의 값 가져오기
        const password = data.get("password");//password 필드의 값 가져오기
        console.log(username)
        console.log(password)
        signin({username:username,password:password})
    }




    //렌더링 되는 부분
    return(
        <Container component="main" maxWidth="xs" style={{marginTop:"8%"}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                </Grid>
            </Grid>
            {/* 폼을 제출하면 handleSubmit 함수가 실행되게 하자 */}
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* 아이디 입력필드 */}
                    <Grid item xs={12}>
                        <TextField variant="outlined"
                        required
                        fullWidth
                        id="username"
                        label="이메일 주소"
                        name="username"
                        autoComplete="username"/>  {/* 브라우저가 자동완성할 때 사용할 값 */}
                    </Grid>
                    {/* 비밀번호 입력필드 */}
                    <Grid item xs={12}>
                    <TextField variant="outlined"
                        required
                        fullWidth
                        id="password"
                        label="패스워드"
                        name="password"
                        autoComplete="current-password"/>
                    </Grid>
                    {/* 제출 버튼 */}
                    <Grid item xs={12}>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary">
                            로그인
                        </Button>
                    </Grid>
                    <Grid item>
                        <Link to="/signup" variant="body2">
                            계정이 없습니까? 여기서 가입하세요
                        </Link>
                    </Grid>
                </Grid>                
            </form>
        </Container>
    )
}
export default Login;