import React, { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import Header from "./components/Header/Header";
import "./App.css";
import backgroundImage from "./assets/visual_02.png";

const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
			'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
			sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	body {
		overflow-x: hidden;
		overflow-y: hidden;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	button {
		cursor: pointer;
	}
`;

const MainSection = styled.div`
	padding-top: 80px;
	height: 100vh;
	background-image: url(${backgroundImage});
	background-size: cover;
	background-position: center;
	position: relative;
	overflow: hidden;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1;
	}
`;

const ContentContainer = styled.div`
	height: calc(100vh - 80px);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 2rem;
	text-align: center;
	position: relative;
	z-index: 2;
`;

const TextWrapper = styled.div`
	max-width: 800px;
	color: white;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const MainTitle = styled(motion.h1)`
	font-size: 3.5rem;
	margin-bottom: 1.5rem;
	font-weight: 700;

	@media (max-width: 768px) {
		font-size: 2.5rem;
	}
`;

const MainDescription = styled(motion.p)`
	font-size: 1.25rem;
	line-height: 1.6;

	@media (max-width: 768px) {
		font-size: 1rem;
	}
`;

const titleVariants = {
	hidden: { y: -50, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 30,
			duration: 0.5,
		},
	},
	exit: {
		y: 50,
		opacity: 0,
		transition: {
			duration: 0.3,
		},
	},
};

const descriptionVariants = {
	hidden: { y: -30, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 30,
			duration: 0.5,
			delay: 0.2,
		},
	},
	exit: {
		y: 30,
		opacity: 0,
		transition: {
			duration: 0.3,
		},
	},
};

function App() {
	const [page, setPage] = useState(0);

	const contentItems = [
		{
			title: "제로원이 안내합니다",
			description: "폐기물 제로화를 위한 연구의 길, 유기성 폐기물 자원화 연구기업 제로원이 동행합니다.",
		},
		{
			title: "친환경 순환 경제의 미래",
			description: "지속 가능한 자원 순환을 위한 혁신적 기술 개발, 제로원이 함께합니다.",
		},
		{
			title: "환경과 경제의 조화로운 솔루션",
			description: "폐기물을 자원으로 변화시키는 통합 환경 관리 시스템으로 지구를 지키는 비즈니스를 만듭니다.",
		},
	];

	// 4초마다 페이지 변경
	useEffect(() => {
		const interval = setInterval(() => {
			setPage((prevPage) => (prevPage + 1) % contentItems.length);
		}, 4000);

		return () => clearInterval(interval);
	}, [contentItems.length]);

	const currentContent = contentItems[page];

	return (
		<>
			<GlobalStyle />
			<Header />
			<MainSection>
				<ContentContainer>
					<TextWrapper>
						<AnimatePresence mode="wait">
							<MainTitle key={`title-${page}`} variants={titleVariants} initial="hidden" animate="visible" exit="exit">
								{currentContent.title}
							</MainTitle>
						</AnimatePresence>

						<AnimatePresence mode="wait">
							<MainDescription key={`desc-${page}`} variants={descriptionVariants} initial="hidden" animate="visible" exit="exit">
								{currentContent.description}
							</MainDescription>
						</AnimatePresence>
					</TextWrapper>
				</ContentContainer>
			</MainSection>
		</>
	);
}

export default App;
