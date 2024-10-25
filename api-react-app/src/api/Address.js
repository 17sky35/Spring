import React, { useState, useEffect } from 'react';
import {useDaumPostcodePopup} from 'react-daum-postcode';
import '../css/address.css'
import MyMap3 from './Map3';

const PostcodeComponent = () => {
  const [postcode, setPostcode] = useState(''); // 우편번호를 저장할 state
  const [address, setAddress] = useState(''); // 주소를 저장할 state
  const [detailAddress, setDetailAddress] = useState(''); // 상세주소를 저장할 state
  const [extraAddress, setExtraAddress] = useState(''); // 참고항목을 저장할 state

    // Daum 우편번호 API 스크립트 URL
    let scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'

    // react-daum-postcode의 useDaumPostcodePopup 훅을 사용하여 API를 팝업으로 실행할 준비
    const open = useDaumPostcodePopup(scriptUrl);

  
    // Daum Postcode API에서 주소 선택 완료 후 실행되는 함수
    const handleComplete = (data) => {
        let addr = ''; // 주소 변수
        let extraAddr = ''; // 참고항목 변수

        // 사용자가 선택한 주소 타입에 따라 주소 설정
        // 도로명 주소(R) 또는 지번 주소(J)를 선택했는지 확인

        if (data.userSelectedType === 'R') {
            addr = data.roadAddress; // 도로명 주소 선택 시 도로명 주소 할당
        } else {
            addr = data.jibunAddress; // 지번 주소 선택 시 지번 주소 할당
        }

        // 참고항목 처리 (도로명 주소인 경우)
        if (data.userSelectedType === 'R') {
            // 법정동명이 있는지 확인하고 추가 (법정동, 법정리가 있을 때만)
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
            }
            // 건물명이 있고 공동주택일 경우 추가
            if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
            }
            // 참고항목이 있다면 괄호로 감싸서 추가
            if (extraAddr !== '') {
            extraAddr = ` (${extraAddr})`;
            }
            // 참고항목 state 업데이트
            setExtraAddress(extraAddr);
        } else {
            // 지번 주소인 경우 참고항목을 빈 문자열로 설정
            setExtraAddress('');
        }

        setPostcode(data.zonecode); // 우편번호 설정
        setAddress(addr);// 주소 설정

        // 상세주소 입력 필드로 포커스를 이동
        document.getElementById('sample6_detailAddress').focus();
        }

        // 팝업을 열고 완료 시 handleComplete 함수 실행
        const handleClick = () => {
        open({ onComplete: handleComplete });
        };

  return (
    <div className="form-group">
      <div className="form-row">
        <input
          type="text"
          id="sample6_postcode"
          placeholder="우편번호"
          value={postcode}
          readOnly
        />
        <input
          type="button"
          onClick={handleClick}
          value="우편번호 찾기"
        />
      </div>
      <input
        type="text"
        id="sample6_address"
        placeholder="주소"
        value={address}
        readOnly
      />
      <div className="form-row split">
        <input
        type="text"
        id="sample6_detailAddress"
        placeholder="상세주소"
        value={detailAddress}
        onChange={(e) => setDetailAddress(e.target.value)}
        />
        <input
          type="text"
          id="sample6_extraAddress"
          placeholder="참고항목"
          value={extraAddress}
          readOnly
        />                              
      </div>
      <MyMap3/>
    </div>
  );
};

export default PostcodeComponent;