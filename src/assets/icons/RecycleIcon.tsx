import React from "react";

const RecycleIcon: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
			<path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
			<path d="M11 19h8.203a1.786 1.786 0 0 0 1.516-.857 1.786 1.786 0 0 0 0-1.786l-3.704-6.414" />
			<path d="M12 19l-3-5" />
			<path d="M5 7l3-5h8l2 3.857" />
			<path d="M12 5l-3 5.5" />
			<path d="M16.5 10.5l-2.995-2" />
			<path d="M20.075 9.327l-3.9 6.773" />
		</svg>
	);
};

export default RecycleIcon;
