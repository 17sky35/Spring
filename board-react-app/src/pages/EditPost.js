import React, {useContext,useEffect,useState} from "react";
import { BoardContext } from "../context/BoardContext";
import { useParams, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";


const EditPost = () => {

    const navigate = useNavigate();
    const[post,setPost]=useState({author:"",title:"",content:""});
    const {id} = useParams();
    const {boardList,setBoardList} = useContext(BoardContext);
    const {author,title,content} = post;


    //수정 완료 버튼
    const updatePost = () => {
        const newBoardList = boardList.map((item)=>{
            if(item.id === parseInt(id)){
                return{...item,...post};
            }
            return item;
        })    

        setBoardList(newBoardList);
        navigate("/post/"+id);
    }
    //수정 취소 버튼
    const backToPost = () => {navigate("/post/"+id)}
    //useEffect
    useEffect(()=>{
        //수정한 내용을 데이터베이스에 저장
    },[])

    return(
        <div>
            <h1>글 수정하기</h1>
            <form>
                <CustomInput label="제목" value={title} onChange={(e=>setPost((prevPost)=>({...prevPost,title:e.target.value})))}/>
                <CustomInput label="작성자" value={author} onChange={(e=>setPost((prevPost)=>({...prevPost,author:e.target.value})))}/>
                <CustomInput
                    label="내용"
                    multiline
                    rows={6}
                    value={content}
                    onChange={(e=>setPost((prevPost)=>({...prevPost,content:e.target.value})))}
                />
                <div>
                    <CustomButton label="수정 완료" onClick={updatePost}/>
                    <CustomButton label="수정 취소" variant="outlined" color="secondary" onClick={backToPost}/>
                </div>
            </form>
        </div>
    )
}

export default EditPost