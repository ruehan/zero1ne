import React from "react";

interface IconProps {
	color?: string;
	width?: string;
	height?: string;
}

export const CarbonReductionIcon: React.FC<IconProps> = ({ color = "currentColor", width = "100%", height = "100%" }) => {
	return (
		<svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M12 3C7.58 3 4 6.58 4 11C4 15.42 7.58 19 12 19C16.42 19 20 15.42 20 11C20 6.58 16.42 3 12 3ZM12 17C8.69 17 6 14.31 6 11C6 7.69 8.69 5 12 5C15.31 5 18 7.69 18 11C18 14.31 15.31 17 12 17Z"
				fill={color}
			/>
			<path d="M11 7H13V13H11V7Z" fill={color} />
			<path d="M8 21H16V23H8V21Z" fill={color} />
			<path
				d="M12 16C9.24 16 7 13.76 7 11C7 8.24 9.24 6 12 6C14.76 6 17 8.24 17 11C17 13.76 14.76 16 12 16ZM12 8C10.34 8 9 9.34 9 11C9 12.66 10.34 14 12 14C13.66 14 15 12.66 15 11C15 9.34 13.66 8 12 8Z"
				fill={color}
			/>
			<path d="M6 13C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11C6.55 11 7 11.45 7 12C7 12.55 6.55 13 6 13Z" fill={color} />
			<path d="M18 13C17.45 13 17 12.55 17 12C17 11.45 17.45 11 18 11C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z" fill={color} />
			<path d="M6 7C5.45 7 5 6.55 5 6C5 5.45 5.45 5 6 5C6.55 5 7 5.45 7 6C7 6.55 6.55 7 6 7Z" fill={color} />
			<path d="M18 7C17.45 7 17 6.55 17 6C17 5.45 17.45 5 18 5C18.55 5 19 5.45 19 6C19 6.55 18.55 7 18 7Z" fill={color} />
		</svg>
	);
};

export const CircularEconomyIcon: React.FC<IconProps> = ({ color = "currentColor", width = "100%", height = "100%" }) => {
	return (
		<svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M17 7L16.59 6.59L14 4H9.99997L7.40997 6.59L6.99997 7L2.99997 11V14L4.87997 17.5L8.99997 19L12 21L15 19L19.12 17.5L21 14V11L17 7ZM19 13.63L17.37 16.59L13.75 18L12 19L10.25 18L6.62997 16.59L4.99997 13.63V11.37L8.24997 8H15.75L19 11.37V13.63Z"
				fill={color}
			/>
			<path d="M9.5 11L7.5 13L9.5 15L10.92 13.59L10 12.67L10.93 11.75L9.5 11Z" fill={color} />
			<path d="M14.5 11L13.08 12.41L14 13.33L13.07 14.25L14.5 15L16.5 13L14.5 11Z" fill={color} />
			<path d="M12 8.5L10 10.5H14L12 8.5Z" fill={color} />
			<path d="M12 17L14 15H10L12 17Z" fill={color} />
		</svg>
	);
};

export const SustainableEnvironmentIcon: React.FC<IconProps> = ({ color = "currentColor", width = "100%", height = "100%" }) => {
	return (
		<svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
				fill={color}
			/>
			<path
				d="M6.5 12.5L9 15L11 12.5H9.5C9.5 10.29 11.29 8.5 13.5 8.5C15.71 8.5 17.5 10.29 17.5 12.5C17.5 14.71 15.71 16.5 13.5 16.5V18.5C16.81 18.5 19.5 15.81 19.5 12.5C19.5 9.19 16.81 6.5 13.5 6.5C10.19 6.5 7.5 9.19 7.5 12.5H6L6.5 12.5Z"
				fill={color}
			/>
		</svg>
	);
};
