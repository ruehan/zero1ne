import React from "react";
import { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Solution from "./components/Solution/Solution";
import CoreTechnology from "./components/CoreTechnology/CoreTechnology";
import "./App.css";

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
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	button {
		cursor: pointer;
	}
`;

// 임시 콘텐츠 섹션 - 실제 콘텐츠로 교체 가능
const ContentSection = styled.section`
	min-height: 70vh;
	background-color: #f5f7f5;
	padding: 5rem 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const SectionTitle = styled.h2`
	font-size: 2.5rem;
	color: #0d5932;
	margin-bottom: 2rem;
	text-align: center;
`;

const SectionText = styled.p`
	font-size: 1.1rem;
	color: #333;
	max-width: 800px;
	text-align: center;
	line-height: 1.6;
`;

function App() {
	return (
		<>
			<GlobalStyle />
			<Header />
			<Hero />
			<Solution />
			<CoreTechnology />
			<ContentSection>
				<SectionTitle>순환 경제로의 전환</SectionTitle>
				<SectionText>
					제로원은 폐기물을 단순한 쓰레기가 아닌 가치 있는 자원으로 바라봅니다. 발생지 감량부터 수집, 자원화까지 이어지는 완벽한 순환 고리를 만들어 환경 부담은 줄이고 경제적 가치는 높이는 지속가능한
					미래를 함께 만들어 갑니다.
				</SectionText>
			</ContentSection>
		</>
	);
}

export default App;
