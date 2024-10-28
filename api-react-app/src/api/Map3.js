import React, {useState} from "react";
import {useDaumPostcodePopup} from 'react-daum-postcode';
import { Map,MapMarker } from "react-kakao-maps-sdk";

function MyMap3(){

    const [address,setAddress] = useState('');
    //얻어온 좌표를 저장할 state
    const [position,setPosition] = useState(null);

    let scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'

    // react-daum-postcode의 useDaumPostcodePopup 훅을 사용하여 API를 팝업으로 실행할 준비
    const open = useDaumPostcodePopup(scriptUrl);

    //주소-좌표 변환 객체를 생성
    let geoCoder = new window.kakao.maps.services.Geocoder();
    const handleComplete = (data) => {
        let addr = data.address;
        setAddress(addr);

        geoCoder.addressSearch(data.address,function(results,status){
            //정상적으로 검색이 완료됐으면
            if(status === window.kakao.maps.services.Status.OK){
                let result = results[0];
                //좌표를 객체로 만들어서
                let center ={
                    lng:result.x,
                    lat:result.y
                }
                setPosition(center);
            }
        });
    }

    const handleClick = () => {
        open({ onComplete: handleComplete });
        };

    return(
        <div >
            <input type="text" value={address} placeholder="주소" readOnly />
            <input type="button" onClick={handleClick} value="주소 검색" />
            {/* Map 컴포넌트를 사용할 때 초기값으로 위도와 경도를 주지않으면 다은 좌표를 넣어도 이동이 안된다. */}
            {position !== null &&(<Map center={position} style={{width:"400px",height:"400px"}} level={3}>
                <MapMarker position={position}/>
            </Map>)}
        </div>
    )
}

export default MyMap3;