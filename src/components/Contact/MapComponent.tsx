import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface MapComponentProps {
	position: [number, number];
	popupText: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ position, popupText }) => {
	// const [latitude, longitude] = position;

	return (
		// <div></div>
		<Map center={{ lat: 36.712678, lng: 127.438168 }} style={{ width: "100%", height: "100%" }}>
			<MapMarker position={{ lat: 36.712678, lng: 127.438168 }}>{/* <div style={{ color: "#000" }}>(주)제로원</div> */}</MapMarker>
		</Map>
	);
};

export default MapComponent;
