import React from "react";

const ConsultIcon: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
			<path d="M8 3H5a2 2 0 0 0-2 2v3" />
			<path d="M21 8V5a2 2 0 0 0-2-2h-3" />
			<path d="M3 16v3a2 2 0 0 0 2 2h3" />
			<path d="M16 21h3a2 2 0 0 0 2-2v-3" />
			<line x1="12" y1="7" x2="12" y2="13" />
			<line x1="9" y1="10" x2="15" y2="10" />
			<circle cx="12" cy="16" r="1" />
		</svg>
	);
};

export default ConsultIcon;
