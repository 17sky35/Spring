import React,{useState} from "react";
import axios from "axios";

function BookSearch(){

    const [query,setQuery] = useState(''); //검색어 state
    const [result,setResult] = useState([]); //검색결과 state
    const [loading,setLoading] = useState(false); //로딩 상태
    const [error,setError] = useState(null);

    //네이버 도서 검색 API 호출 함수
    //네이버 서버로 접근하는 주소가 주어진다.
    //CORS제한이 걸려서 우리의 브라우저가 응답을 못받는다.
    //우리의 서버에서 네이버서버로 요청을 보낸다.
    //서버 -> 서버 CORS가 안걸린다.
    const searchBooks = () => {

        try {
            const response = axios.get('http://localhost:9090/api/books',{params: {query}})

            //검색 결과를 result 상태에 저장
            response.then(res => setResult(res.data.items))
        } catch (err) {
            setError('도서 검색에 실패했습니다.')
        }
    }

    //검색버튼 클릭시 호출
    const handleSearch = (e) => {
        if(!query){
            alert('검색어를 입력하세요')
            return;
        }
        e.preventDefault();//새로고침을 강제로 막음
        searchBooks();
    }

    return(
        <div>
            <h1>네이버 도서 검색</h1>
            <form onSubmit={handleSearch}>
                <input 
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="책 이름을 입력하세요"
                />
                <button type="submit">검색</button>
            </form>            
            <ul>
                {result.map((book) => (
                    <li key={book.isbn}>
                        <img src={book.image} alt={book.title}/>
                        <p>제목 : {book.title}</p>
                        <p>저자 : {book.author}</p>
                        <p>출판사 : {book.publisher}</p>
                        <p>가격 : {book.discount ? `${book.discount}원`:'가격 정보 없음'}</p>
                        {/* target="_blank" - 새 탭에서 열겠다 */}
                        {/* rel="noopener noreferrer" - 어디서 왔는지 숨기기 */}
                        <a href={book.link} target="_blank" rel="noopener noreferrer">더보기</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BookSearch;