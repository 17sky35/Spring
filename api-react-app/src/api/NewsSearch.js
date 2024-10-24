import userEvent from "@testing-library/user-event";
import axios from "axios";
import React,{useState} from "react";

function NewsSearch(){

    const [query,setQuery] = useState('');
    const [result,setResult] = useState([]);
    const [error,setError] = useState('');

    const clientId = 'bFq0Fj2phTIER882qECQ';
    const clientSecret = 'mOnwlkBvEBT';

    const searchNews = () => {
        try {
            const response = axios.get('https://openapi.naver.com/v1/search/news.json',{
                params: {
                  query: query,
                },
                headers: {
                  'X-Naver-Client-Id': clientId,
                  'X-Naver-Client-Secret': clientSecret,
                },
              });
            response.then(res => setResult(res.data.items))
        } catch (err) {
            setError('뉴스 검색에 실패했습니다.')
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        searchNews();
    }

    return(
        <div>
            <h1>네이버 뉴스 검색</h1>
            <form onSubmit={handleSearch}>
                <input 
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="검색할 뉴스를 입력하세요"
                />
                <button type="submit">검색</button>
            </form>       
            <ul>
                {result.map((news) => (
                    <li key={news.isbn}>
                        <p>뉴스 기사 원문의 URL : {news.originalLink}</p>
                        <p>뉴스 기사의 네이버 뉴스 URL : {news.link}</p>
                        <p>뉴스 기사의 내용을 요약한 패시지 정보 : {news.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NewsSearch;