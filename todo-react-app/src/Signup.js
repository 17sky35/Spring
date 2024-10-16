import React from 'react';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import { signup } from './service/ApiService';
//Link 컴포넌트
//a태그와 비슷한 역할을 한다
//리다이렉트할 때 쓴다.
import { Link } from 'react-router-dom';

function Signup() {

    const handleSubmit = (event) => {
        event.preventDefault();
        //오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌
        const data = new FormData(event.target);
        const username = data.get("username");
        const password = data.get("password");
        signup({username:username,password:password})
        .then(response => {
            //계정 생성 성공 시 login페이지로 리다이렉트
            window.location.href="/login";
        })
    }

    return (
        //Container는 기본적으로 div로 렌더링이 된다.
        //component 속성을 이용해서 다른 태그로 바꿀수 있다.
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <form noValidate onSubmit={handleSubmit}>
                {/* spacing : 간격을 의미 1당 8px */}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {/* 화면에 보이는 크기는 h5지만 실제 태그는 h1임 */}
                        <Typography component="h1" variant="h5">
                            계정 생성
                        </Typography>
                    </Grid>
                    {/* 아이디 */}
                    <Grid item xs={12}>
                        <TextField autoComplete='fname'
                            name="username"
                            variant="outlined"
                            required //필수로 입력해야 함
                            fullWidth
                            id="username"
                            label="아이디"
                            autoFocus
                        />
                    </Grid>
                    {/* 아이디 */}
                    {/* 비밀번호 */}
                    <Grid item xs={12}>
                        <TextField 
                            autoComplete='current-password'
                            name="password"
                            variant="outlined"
                            required //필수로 입력해야 함
                            fullWidth
                            id="password"
                            label="패스워드"
                        />
                    </Grid>
                    {/* 비밀번호 */}
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant='contained'
                            color="primary"
                        >계정 생성</Button>
                    </Grid>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to="/login" variant="body2">
                            계정이 이미 있습니까? 로그인 하세요
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default Signup;