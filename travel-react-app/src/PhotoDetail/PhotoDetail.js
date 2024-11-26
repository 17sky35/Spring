import React, { useState } from "react";
import backgroundImage from "../image/back.jpg"

const PhotoDetail = () => {

    // 전체 사진 상태
    const [photos, setPhotos] = useState([]);
    // 각 사진에 대한 메모 상태
    const [photoMemo, setPhotoMemo] = useState([]);
    // 선택된 사진들 상태
    const [selectedPhotos, setSelectedPhotos] = useState([]);

    // 페이지 관련 상태
    const [currentPage, setCurrentPage] = useState(1);
    const photosPerPage = 16; // 페이지 당 사진갯수

    // 사진 추가 버튼
    const addPhotoButton = (event) => {
        const files = event.target.files; // 사용자가 선택한 파일들
        const newImages = Array.from(files).map((file) => {
            const reader = new FileReader();
            return new Promise((resolve) => {
                reader.onloadend = () => {
                    resolve(reader.result); // 파일 읽기가 끝나면 DataURL 반환
                };
                reader.readAsDataURL(file); // 파일을 DataURL 형식으로 읽기
            });
        });

        // 모든 이미지가 읽히면 상태 업데이트
        Promise.all(newImages).then((imageURLs) => {
            setPhotos((prevImages) => [...imageURLs,...prevImages,]);
            setPhotoMemo((prevMemos) => [
                ...prevMemos,
                ...imageURLs.map(() => ""), // 새로운 사진에는 초기 메모 비워둠
            ]);
            setSelectedPhotos((prevSelected) => [
                ...prevSelected,
                ...imageURLs.map(() => false), // 새로운 사진에는 선택되지 않음
            ]);
        });
    };

    // 메모 변경 함수
    const handleNoteChange = (index, note) => {
        const updatedNotes = [...photoMemo];
        updatedNotes[index] = note;
        setPhotoMemo(updatedNotes);
    };

    // 체크박스 선택 함수
    const handleCheckboxChange = (index) => {
        const updatedSelection = [...selectedPhotos];
        updatedSelection[index] = !updatedSelection[index]; // 체크 상태 반전
        setSelectedPhotos(updatedSelection);
    };

    // 선택된 사진 삭제 함수
    const deletePhotoButton = () => {
        const newPhotos = photos.filter((_, index) => !selectedPhotos[index]);
        const newMemos = photoMemo.filter((_, index) => !selectedPhotos[index]);
        const newSelection = selectedPhotos.filter((selected) => !selected);

        setPhotos(newPhotos);
        setPhotoMemo(newMemos);
        setSelectedPhotos(newSelection);
    };

    // 페이지네이션을 위한 페이지 계산
    const lastIndex = currentPage * photosPerPage; // 현재 페이지 끝 인덱스
    const firstIndex = lastIndex - photosPerPage; // 현재 페이지 시작 인덱스
    const currentPhotos = photos.slice(firstIndex, lastIndex); // 현재 페이지의 사진들
    const currentMemos = photoMemo.slice(firstIndex, lastIndex); // 현재 페이지의 메모들

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(photos.length / photosPerPage);

    // 페이지 변경 함수
    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 전체 저장 버튼
    const savePhotoButton = () => {};

    return (
        <div style={{
                padding: "30px",
                backgroundImage: `url(${backgroundImage})`, // 배경 이미지 추가
                backgroundSize: "cover", // 배경 이미지 크기 설정 (화면에 맞게 크기 조정)
                backgroundPosition: "center", // 배경 이미지 위치 설정
                backgroundRepeat: "no-repeat", // 배경 이미지 반복 안함
                height:"100vh"
            }}
        >
        <h2 style={{fontSize:"70px", textShadow: '3px 3px 5px rgba(0, 0, 0, 0.5)',color:"#87CEEB"}}>PhotoDetail</h2>

        {/* 버튼 묶음 div */}
        <div
            style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            padding: "10px",
            }}
        >
            {/* 사진 추가 버튼 */}
            <label
                htmlFor="file-input"
                style={{
                    margin: "5px",
                    width: "60px",
                    height: "60px",
                    fontSize: "20px",
                    backgroundColor: "#333",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                }}
            >
            사진 첨부
            </label>
            <input
                style={{
                    margin: "5px",
                    height: "40px",
                    display: "none",
                }}
                id="file-input"
                type="file"
                accept="image/*"
                multiple
                onChange={addPhotoButton} // 파일이 선택되면 이벤트 처리
            />
            {/* 사진 삭제 버튼 */}
            <button
                style={{
                    margin: "5px",
                    width: "60px",
                    height: "60px",
                    fontSize: "20px",
                    backgroundColor: "#333",
                    color: "white",
                }}
                onClick={deletePhotoButton}
            >
            선택 삭제
            </button>
            <button
                style={{
                    margin: "5px",
                    width: "60px",
                    height: "60px",
                    fontSize: "20px",
                    backgroundColor: "#333",
                    color: "white",
                }}
                onClick={savePhotoButton}
            >
            전체 저장
            </button>
        </div>

        {/* 사진 업로드 공간 div */}
        <div
            style={{
            display: "flex",
            flexWrap: "wrap", // 자동 줄 바꿈
            gap: "10px", // 사진들 사이 간격 설정
            }}
        >
            {currentPhotos.map((photo, index) => (
            <div
                key={index}
                style={{
                width: "calc(12.5% - 10px)", // 사진 한줄 갯수 정하기 20% 5개 10% 10개
                marginBottom: "20px",
                textAlign: "center", // 사진을 가운데 정렬
                position: "relative", // 비율을 유지하기 위해 position 설정
                }}
            >
                <div
                style={{
                    paddingBottom: "120%", // 2.5:3 사진비율 유지하려면 3/2.5 = 120%
                    position: "relative",
                    width: "100%", // 가로 100%로 설정
                }}
                >
                <img
                    src={photo}
                    alt={`Uploaded photo ${index + 1}`}
                    style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // 이미지 비율 유지하면서 부모 div에 맞추기
                    borderRadius: "8px",
                    }}
                />
                {/* 체크박스 추가 */}
                <input
                    type="checkbox"
                    checked={selectedPhotos[firstIndex + index]}
                    onChange={() => handleCheckboxChange(firstIndex + index)}
                    style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        zIndex: "10",
                        width:"18px", //체크박스 크기조절하고싶을때
                        height:"18px" //체크박스 크기조절하고싶을때
                        }}
                />
                </div>

                {/* 사진에 대한 메모 입력 필드 */}
                <textarea
                    value={currentMemos[index]}
                    onChange={(e) => handleNoteChange(firstIndex + index, e.target.value)}
                    placeholder="메모를 입력하세요"
                    style={{
                        width: "95%",
                        marginTop: "10px",
                        padding: "5px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        resize: "none",
                        minHeight: "40px",
                    }}
                />
            </div>
            ))}
        </div>

        {/* 페이지 */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            {[...Array(totalPages)].map((_, index) => (
            <button
                key={index}
                onClick={() => changePage(index + 1)}
                style={{
                margin: "5px",
                padding: "10px",
                backgroundColor: currentPage === index + 1 ? "#333" : "#ccc",
                color: "white",
                border: "none",
                borderRadius: "5px",
                }}
            >
                {index + 1}
            </button>
            ))}
        </div>
        </div>
    );
};

export default PhotoDetail;