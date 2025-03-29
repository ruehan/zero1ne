import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";

interface MapComponentProps {
	position: [number, number];
	popupText?: string;
}

const MapContainer = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 12px;
	overflow: hidden;
	position: relative;
`;

const FallbackContainer = styled.div`
	width: 100%;
	height: 100%;
	background-color: #f0f0f0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px;
	text-align: center;
	color: #333;
`;

const Address = styled.p`
	margin-top: 10px;
	font-weight: bold;
`;

const MapComponent: React.FC<MapComponentProps> = ({ position, popupText }) => {
	const [mapError, setMapError] = useState(false);
	const [latitude, longitude] = position;

	// 카카오맵 로드 오류 처리를 위한 타임아웃 설정
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (!window.kakao || !window.kakao.maps) {
				console.log("카카오맵 로드 타임아웃");
				setMapError(true);
			}
		}, 3000);

		return () => clearTimeout(timeout);
	}, []);

	// 맵 오류 시 대체 UI
	if (mapError) {
		return (
			<FallbackContainer>
				<div>🗺️ 지도를 불러올 수 없습니다</div>
				<Address>주소: 충청북도 청주시 청원구 오창읍 양청송대길 10, 308호</Address>
			</FallbackContainer>
		);
	}

	try {
		return (
			<MapContainer>
				<Map center={{ lat: latitude, lng: longitude }} style={{ width: "100%", height: "100%" }} level={3}>
					<MapMarker position={{ lat: latitude, lng: longitude }}>{popupText && <div style={{ color: "#000", padding: "5px", width: "150px", textAlign: "center" }}>(주)제로원</div>}</MapMarker>
				</Map>
			</MapContainer>
		);
	} catch (error) {
		console.error("카카오맵 렌더링 오류:", error);
		return (
			<FallbackContainer>
				<div>🗺️ 지도를 불러올 수 없습니다</div>
				<Address>주소: 충청북도 청주시 청원구 오창읍 양청송대길 10, 308호</Address>
			</FallbackContainer>
		);
	}
};

export default MapComponent;
