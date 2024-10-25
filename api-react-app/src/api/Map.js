import React, {useState} from "react";
import { Map, MapInfoWindow, MapMarker } from "react-kakao-maps-sdk";

function MyMap(){

    const [result, setResult] = useState('');
    //지도에 표시될 마커들의 리스트 상태
    const [markers,setMarkers] = useState([]);
    //활성화된 마커의 id를 관리하는 state
    const [activeMarker,setActiveMarker] = useState(null);


    //지도의 중심좌표
    const center = {
        lat:33.450701,
        lng:126.570667
    }

    //지도 클릭시 마커 추가
    const handleMapClick = (event,mouseEvent)=>{
        const latlang = mouseEvent.latLng//좌표를 저장
        setResult(`클릭한 위치의 위도는 ${latlang.getLat()}이고, 경도는 ${latlang.getLng()}입니다.`)
        const newMarker = {
            id:markers.length,//배열의 길이를 id로 설정
            position:{lat:latlang.getLat(),lng:latlang.getLng()},
            info:`마커 위치: (${latlang.getLat()},${latlang.getLng()})`
        }
        setMarkers([...markers, newMarker]);
    }

    //마커에 마우스를 올렸을 때 인포윈도우 활성화하기
    const handleMouseOver = (id) => {
        setActiveMarker(id);
    }
    //마커에 마우스를 뺐을때 인포윈도우 비활성화
    const handleMouseOut = () =>{
        setActiveMarker(null);
    }

    return(
        <div>
            <Map
                center={center}//지도 중심 좌표 lat : 위도, lng : 경도
                style={{width:"600px",height:"600px"}} //지도 너비와 높이
                level={3}//지도 확대 정도/숫자가 작을수록 크게,클수록 작게보임
                onClick={handleMapClick}
            >
                {markers.map(marker=>(
                    <MapMarker
                        key={marker.id}
                        position={marker.position}
                        // onClick={()=>handleMouseOver(marker.id)} //클릭했을때
                        onMouseOver={()=>handleMouseOver(marker.id)} //마우스를 올렸을 때
                        onMouseOut={handleMouseOut}
                    >
                        {/* 마커에 자식요소를 넣으면 자동으로 info로 들어간다. */}
                        {activeMarker === marker.id && (                        
                            <div style={{padding:"5px",color:"#000"}}>
                                {marker.info}
                            </div>
                        )}
                    </MapMarker>
                ))}



                {/* <MapMarker position={positions ?? center} /> 
                    position에 값이 없으면 center를 사용해라*/}
                {/* <MapMarker position={positions ?? center} >
                    <MapInfoWindow //인포윈도우를 생성하고 지도에 표시한다.
                        position={positions ?? center} //인포윈도우가 표시될 위치
                        removable={true} //인포윈도우를 닫을 수 있는 x버튼 표시
                    />
                    <div style={{padding:"5px",color:"#000"}}>
                        Hello World!
                    </div>
                </MapMarker>
                <MapInfoWindow //인포윈도우를 생성하고 지도에 표시한다.
                    position={positions ?? center} //인포윈도우가 표시될 위치
                    removable={true} //인포윈도우를 닫을 수 있는 x버튼 표시
                />
                <div style={{padding:"5px",color:"#000"}}>
                    Hello World!
                </div> */}
            </Map>
            <p>
                지도를 클릭해주세요!
            </p>
            <p id="result">{result}</p>
        </div>
    )
}

export default MyMap;