import { useNavigate } from "react-router-dom";

function MultiButtons(){

    const navigate = useNavigate();

    const handleButtonClick = (event) => {

        const buttonId = event.target.id;

        switch(buttonId){
            case 'address':
                navigate('/address')
                break;
            case 'bookSearch':
                navigate('/search')
                break;
            case 'newsSearch':
                navigate('/newsSearch')
                break;
            case 'map':
                navigate('/map')
                break;
            case 'map2':
                navigate('/map2')
                break;
            case 'map3':
                navigate('/map3')
                break;
        }
    }

    return(
        <div>
            <button id="address" onClick={handleButtonClick}>
                주소 찾기 api
            </button>
            <button id="bookSearch" onClick={handleButtonClick}>
                도서 찾기 api
            </button>
            <button id="newsSearch" onClick={handleButtonClick}>
                뉴스 검색 api
            </button>
            <button id="map" onClick={handleButtonClick}>
                카카오 지도 api
            </button>
            <button id="map2" onClick={handleButtonClick}>
                카카오 지도2 api
            </button>
            <button id="map3" onClick={handleButtonClick}>
                카카오 지도3 api
            </button>
        </div>
    )
}

export default MultiButtons;