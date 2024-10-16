import React,{useState} from "react"
import { ListItem, 
        ListItemText, 
        InputBase,
        Checkbox,
        ListItemSecondaryAction,
        IconButton
        } from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined"
// useState
// 리액트에서 사용되는 Hook중 하나로 함수형 컴포넌트에서 상태 변수를 사용할 수 있도록 해준다.
// Hook을 사용하면 제공하는 기능과 상태변수를 사용할 수 있다.

// 함수 생성 방법
// 1.function 함수명(){

// }
// 2.let 함수명 = function(){   ->  let 함수명 = () => {}
    
// }
// 화살표 함수 규칙
// 1. 매개변수가 1개면 소괄호 생략 가능
// 2. 명령이 한 줄이면서 return이 있다면, 중괄호와 return 같이 생략 가능

const Todo = (props) => {
    const [item, setItem] = useState(props.item);    
    const deleteItem = props.deleteItem;    
    const [readOnly, setReadOnly] = useState(true);
    const editItem = props.editItem;

    const editEventHandler = (e) => {
        // item.title = e.target.value; // 변경만 해서는 렌더링이 안된다.
        // editItem(); // 없으면 아예 수정이 안됨

        //백엔드 연결----------------------------
        setItem({...item,title:e.target.value})
    }

    // deletEventHandler 작성
    const deletEventHandler = () => {
        // 삭제하려고 하는 todo 전달
        deleteItem(item);
    }
    // 체크박스변경
    const checkboxEventHandler = (e) => {
        item.done = e.target.checked;
        editItem(item);
    }

    // turnOffReadOnly 함수
    // 내용쪽을 클릭했을 때 수정 가능한 상태로 만들기
    const turnOffReadOnly = () => {
        setReadOnly(false);
    }

    // turnOnReadOnly 함수
    const turnOnReadOnly = (e) => {
        if(e.key === 'Enter'){
            setReadOnly(true);

            //백엔드 연결---------------------------
            editItem(item);
        }
    }

    return(
    <ListItem>
        <Checkbox checked={item.done} onChange={checkboxEventHandler}/>
        <ListItemText>
            <InputBase 
            inputProps={{"aria-label" : "naked", "readOnly":readOnly}}
            onClick={turnOffReadOnly}
            onKeyDown={turnOnReadOnly}
            onChange={editEventHandler}
            type="text"
            id={item.id}
            name={item.id}
            value={item.title}
            multiline={true}
            fullWidth={true}
            />
        </ListItemText>
        <ListItemSecondaryAction>
            {/* 삭제 */}
            <IconButton aria-label="Delete Todo" onClick={deletEventHandler}>
                <DeleteOutlined />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
    );
}
export default Todo;