import React from "react";

const DambiIcon: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
			<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
			<path d="M12 8v8" />
			<path d="M8 12h8" />
			<path d="M8 8v4" />
			<path d="M16 12v4" />
			<path d="M8 16h8" />
		</svg>
	);
};

export default DambiIcon;
