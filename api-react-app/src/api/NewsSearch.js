import axios from "axios";
import React,{useState} from "react";

function NewsSearch(){

    const [query,setQuery] = useState(''); //검색어 state
    const [result,setResult] = useState([]); //검색결과 state
    const [loading,setLoading] = useState(false); //로딩 상태
    const [error,setError] = useState(null);

    //네이버 도서 검색 API 호출 함수
    const searchBooks = () => {

        try {
            const response = axios.get('http://localhost:9090/api/news',{params: {query}})

            response.then(res => setResult(res.data.items))
        } catch (err) {
            setError('도서 검색에 실패했습니다.')
        }
    }

    const handleSearch = (e) => {
        if(!query){
            alert('검색어를 입력하세요')
            return;
        }
        e.preventDefault();
        searchBooks();
    }

    return(
        <div>
            <h1>네이버 뉴스 검색</h1>
            <form onSubmit={handleSearch}>
                <input 
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="뉴스 뭐볼래?"
                />
                <button type="submit">검색</button>
            </form>            
            <ul style={{backgroundColor:"gray"}}>
                {result.map((news) => (
                    <li style={{border:"1px solid red",margin:"15px",backgroundColor:"white"}}>
                        <p>{news.title}</p>
                        <p>뉴스 기사 원문의 URL : {news.originalLink}</p>
                        <p>뉴스 기사의 네이버 뉴스 URL : {news.link}</p>
                        <p>뉴스 기사의 내용을 요약한 패시지 정보 : {news.description}</p>
                        <p>뉴스 기사가 네이버에 제공된 시간: {news.pubDate}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NewsSearch;