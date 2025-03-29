import React from "react";
import styled from "styled-components";

interface MapComponentProps {
	position: [number, number];
	popupText?: string;
}

const MapContainer = styled.div`
	width: 100%;
	height: 450px;
	border-radius: 12px;
	overflow: hidden;
	position: relative;

	@media (max-width: 768px) {
		height: 350px;
	}

	@media (max-width: 480px) {
		height: 300px;
	}
`;

const GoogleMapIframe = styled.iframe`
	width: 100%;
	height: 100%;
	border: none;
`;

const MapOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	background-color: white;
	padding: 10px 15px;
	z-index: 10;
	border-bottom-right-radius: 8px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	width: 300px;

	@media (max-width: 768px) {
		width: 250px;
	}

	@media (max-width: 480px) {
		width: 200px;
		padding: 8px 12px;
	}
`;

const CompanyName = styled.div`
	font-weight: bold;
	font-size: 14px;
	color: #0d5932;

	@media (max-width: 480px) {
		font-size: 13px;
	}
`;

const CompanyAddress = styled.div`
	font-size: 12px;
	color: #555;

	@media (max-width: 480px) {
		font-size: 11px;
	}
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
	const [latitude, longitude] = position;

	// 구글 지도 Embed API URL 생성
	const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=제로원,충청북도+청주시+청원구+오창읍+양청송대길+10&zoom=18&language=ko`;

	try {
		return (
			<MapContainer>
				<GoogleMapIframe src={googleMapsUrl} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="제로원 위치" />
				<MapOverlay>
					<CompanyName>(주)제로원</CompanyName>
					<CompanyAddress>충청북도 청주시 청원구 오창읍 양청송대길 10, 308호</CompanyAddress>
				</MapOverlay>
			</MapContainer>
		);
	} catch (error) {
		console.error("지도 렌더링 오류:", error);
		return (
			<FallbackContainer>
				<div>🗺️ 지도를 불러올 수 없습니다</div>
				<Address>주소: 충청북도 청주시 청원구 오창읍 양청송대길 10, 308호</Address>
			</FallbackContainer>
		);
	}
};

export default MapComponent;
