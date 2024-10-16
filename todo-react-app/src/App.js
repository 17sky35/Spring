import logo from './logo.svg';
import Todo from './Todo'; // Todo 컴포넌트 import
import Count from './Count';
import React,{ useEffect, useState } from 'react';
import './App.css';
import {Container,List,Paper,Grid,Button,AppBar,Toolbar,Typography} from "@mui/material";
import AddTodo from './AddTodo';
import axios from 'axios';
import { call, signout } from './service/ApiService';

// 컴포넌트
// 페이지에 렌더링할 React 엘리먼트를 반환하는 작고 재사용 가능한 코드조각
function App() {
  //Todo를 가지고 있는 state
  const[items, setItems]= useState([])
  //로딩여부를 가리는 state
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    //백엔드에게 요청
    // axios.get("http://localhost:9090/todo", {
    //   headers: {
    //       "Content-Type": "application/json"
    //   }
    // })
    // .then(response => {
    //     setItems(response.data); // response.data를 통해 서버에서 반환된 데이터를 처리
    // })
    // .catch(error => {
    //     console.error("There was an error!", error); // 에러 처리
    // });
    call("/todo","GET") 
    .then(result => {
      setItems(result.data);
      setLoading(false);
    })    
  },[])
  


  // 추가
  // 전체 데이터를 App.js에서 관리하기 때문에 함수를 App.js에 작성함
  const addItem = (item) => {
    // item.id = 'ID-' + items.length;
    // item.done = false; // done 초기화
    // // ... : 스프레드연산자
    // // 배열이나 객체의 요소를 개별적으로 펼쳐서 다른 배열이나 객체에 삽입할 때 사용한다.
    // // 리액트에서 상태를 업데이트할 때 사용한다.
    // setItems([...items,item]);
    // console.log("items : ", items)

    
    //벡엔드 연결
    call("/todo","POST",item)
    .then(result => setItems(result.data))
  }
  
  //내용 수정
  const editItem = (item) => {
    // setItems([...items])

    //백엔드 연결---------------------------------
    call("/todo","PUT",item) // 이제는 /todo에 접근하려면 토큰인증이 필요하다.
    .then(result => setItems(result.data))
  }
    

  // 삭제
  const deleteItem = (item) => {
    // // 삭제할 아이템을 찾는다.
    // const newItems = items.filter( e => e.id !== item.id )
    // // 삭제할 아이템을 제외한 아이템을 다시 배열에 저장한다.
    // setItems([...newItems]);

    //백엔드 연결
    call("/todo","DELETE",item)
    .then(result => setItems(result.data))
  }
  // App.js에서 Todo에 deleteItem 연결하기

  // map() -> 반복문 안에 들어있는 내용을 하나씩 꺼내서 처리한다.
  // key : 요소의 리스트를 만들 때, React에서 컴포넌트를 렌더링 했을 때 
  // 어떤 아이템이 변경되었는지 빠르게 감지하기 위해 사용한다.
  // 만약 key가 설정되지 않았다면 가상DOM을 순차적으로 비교하면서 감지하기 때문에
  // key가 없을때보다 속도가 느리다.
  let todoItems = items.length > 0 && (
    <Paper style={{margin:16}}>
      <List>
        {items.map((item) =>(
          <Todo item={item} key={item.id} deleteItem={deleteItem} editItem = {editItem}/>
        ))}
      </List>
    </Paper>    
  );
  // JSX문법 : 자바스크립트 코드 안에 HTML코드가 들어가는것
  // Babel : JSX로 작성된 자바스크립트를 순수 자바스크립트로 만들어주는 라이브러리


  //navigatinBar 추가
  let navigatinBar = (
    <AppBar position='static'>
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant='h6' > 오늘의 할일</Typography>
          </Grid>
          <Grid item>
            {/* variant의 속성값 : contained 입체적인 버튼(배경 색상 포함)
                                  outlined 테두리만 있는 버튼
                                  text 텍스트만 있는 버튼 */}
            <Button color='inherit' variant='text' onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )

  // 로딩중이 아닐 때 렌더링할 화면
  let todoListPage=(
    <div className="App">
        {navigatinBar}
      <Container maxWidth="md">
        <AddTodo addItem={addItem}/>
      {/* props를 컴포넌트에 전달하기
      이름={useState값} */}
      <div className="TodoList">
        {todoItems}
      </div>
      </Container>
    </div>
  )

  //로딩중일 때 렌더링 할 부분
  let loadingPage = <h1>로딩중...</h1>
  let content = loadingPage;

  //loading : ture -> 로딩중
  //loading : false -> 로딩중이 아닌상태
  if(!loading){
    //로딩중이 아니면 todoListPage를 렌더링
    content = todoListPage;
  }

  return (
    <div className='App'>
      {content}
    </div>
  );
}


// 해당 파일에서는 하나의 컴포넌트만은 내보낸다.
// export default 구문을 사용해 내보낸 컴포넌트는 중괄호({})를 사용하지 않고
// 불러올 수 있으며, 이를 또한 원하는 이름으로 바꿔서 불러올 수 있다.
export default App;