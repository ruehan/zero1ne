import React, { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
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
	min-height: 100vh;
	background-color: #f9f9f9;
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
			<ContentSection>
				<SectionTitle>환경과 경제의 균형</SectionTitle>
				<SectionText>
					제로원은 폐기물 처리의 새로운 패러다임을 제시합니다. 우리의 솔루션은 자원 순환을 최적화하고 기업의 비용을 절감하며 지구 환경을 보호합니다. 더 자세한 내용을 알아보세요.
				</SectionText>
			</ContentSection>
		</>
	);
}

export default App;
