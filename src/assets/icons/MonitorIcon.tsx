import React from "react";

const MonitorIcon: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
			<rect x="2" y="3" width="20" height="14" rx="2" />
			<line x1="8" y1="21" x2="16" y2="21" />
			<line x1="12" y1="17" x2="12" y2="21" />
			<polyline points="7 10 12 15 17 10" />
		</svg>
	);
};

export default MonitorIcon;
