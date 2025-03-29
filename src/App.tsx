import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { motion } from "framer-motion";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Solution from "./components/Solution/Solution";
import CoreTechnology from "./components/CoreTechnology/CoreTechnology";
import SuccessStories from "./components/SuccessStories/SuccessStories";
import Contact from "./components/Contact/Contact";
import EnvironmentalImpact from "./components/EnvironmentalImpact/EnvironmentalImpact";
import Footer from "./components/Footer/Footer";
import "./App.css";

// 글로벌 스타일
const GlobalStyle = createGlobalStyle`
	:root {
		--primary-color: #2D70F6;
		--secondary-color: #4285F4;
		--accent-color: #34C759;
		--text-color: #212529;
		--text-color-light: #6c757d;
		--text-color-lighter: #ADB5BD;
		--bg-color: #FFFFFF;
		--bg-color-light: #F8F9FA;
		--bg-color-lighter: #E9ECEF;
		--header-height: 70px;
		--border-radius-sm: 6px;
		--border-radius-md: 12px;
		--border-radius-lg: 16px;
		--box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	}

	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	body {
		font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
			'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: var(--text-color);
		background-color: var(--bg-color);
		line-height: 1.5;
		overflow-x: hidden;
	}

	html {
		scroll-behavior: smooth;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	button {
		cursor: pointer;
		border: none;
		background: none;
	}

	img {
		max-width: 100%;
		height: auto;
	}

	section {
		width: 100%;
		padding: 100px 0;
	}

	h1, h2, h3, h4, h5, h6 {
		font-weight: 700;
		line-height: 1.3;
		margin-bottom: 16px;
	}

	h1 {
		font-size: 3.5rem;
		letter-spacing: -0.5px;

		@media (max-width: 768px) {
			font-size: 2.5rem;
		}
	}

	h2 {
		font-size: 2.5rem;
		letter-spacing: -0.3px;

		@media (max-width: 768px) {
			font-size: 2rem;
		}
	}

	h3 {
		font-size: 2rem;

		@media (max-width: 768px) {
			font-size: 1.75rem;
		}
	}

	p {
		margin-bottom: 16px;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 24px;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 12px 28px;
		border-radius: var(--border-radius-sm);
		font-weight: 600;
		font-size: 1rem;
		transition: all 0.2s ease;
	}

	.btn-primary {
		background-color: var(--primary-color);
		color: white;
		box-shadow: 0 4px 10px rgba(45, 112, 246, 0.3);
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 15px rgba(45, 112, 246, 0.4);
	}

	.btn-secondary {
		background-color: white;
		color: var(--primary-color);
		border: 1px solid #E9ECEF;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
	}

	.btn-secondary:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	}

	.text-primary {
		color: var(--primary-color);
	}

	.text-accent {
		color: var(--accent-color);
	}

	.card {
		background-color: white;
		border-radius: var(--border-radius-md);
		box-shadow: var(--box-shadow);
		padding: 24px;
		transition: all 0.3s ease;
	}

	.card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
	}
`;

// 테마
const theme = {
	colors: {
		primary: "var(--primary-color)",
		secondary: "var(--secondary-color)",
		accent: "var(--accent-color)",
		text: "var(--text-color)",
		textLight: "var(--text-color-light)",
		textLighter: "var(--text-color-lighter)",
		background: "var(--bg-color)",
		backgroundLight: "var(--bg-color-light)",
		backgroundLighter: "var(--bg-color-lighter)",
	},
	breakpoints: {
		mobile: "576px",
		tablet: "768px",
		laptop: "992px",
		desktop: "1200px",
	},
	borderRadius: {
		small: "var(--border-radius-sm)",
		medium: "var(--border-radius-md)",
		large: "var(--border-radius-lg)",
	},
	boxShadow: "var(--box-shadow)",
};

// 스타일드 컴포넌트
const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

const MainContent = styled.main`
	flex: 1;
	position: relative;
`;

const SectionContainer = styled.div`
	scroll-margin-top: var(--header-height);
	position: relative;
`;

const ScrollProgressContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 3px;
	background: rgba(0, 0, 0, 0.05);
	z-index: 1000;
`;

const ScrollProgressBar = styled(motion.div)`
	height: 100%;
	background: var(--primary-color);
	transform-origin: left;
`;

function App() {
	const [scrollProgress, setScrollProgress] = useState(0);

	// 스크롤 진행률 업데이트
	useEffect(() => {
		const handleScroll = () => {
			const totalHeight = document.body.scrollHeight - window.innerHeight;
			const progress = window.scrollY / totalHeight;
			setScrollProgress(progress);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		// 섹션 간 부드러운 전환을 위한 추가 설정
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("active");
					} else {
						entry.target.classList.remove("active");
					}
				});
			},
			{ threshold: 0.3 }
		);

		const sections = document.querySelectorAll("section");
		sections.forEach((section) => {
			observer.observe(section);
		});

		return () => {
			sections.forEach((section) => {
				observer.unobserve(section);
			});
		};
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />

			<AppContainer>
				<ScrollProgressContainer>
					<ScrollProgressBar style={{ scaleX: scrollProgress }} />
				</ScrollProgressContainer>

				<Header />

				<MainContent>
					<SectionContainer id="hero">
						<Hero />
					</SectionContainer>

					<SectionContainer id="solution">
						<Solution />
					</SectionContainer>

					<SectionContainer id="technology">
						<CoreTechnology />
					</SectionContainer>

					<SectionContainer id="environmental-impact">
						<EnvironmentalImpact />
					</SectionContainer>

					{/* <SectionContainer id="process">
						<SolutionProcess />
					</SectionContainer> */}

					<SectionContainer id="success">
						<SuccessStories />
					</SectionContainer>

					<SectionContainer id="contact">
						<Contact />
					</SectionContainer>
				</MainContent>

				<Footer />
			</AppContainer>
		</ThemeProvider>
	);
}

export default App;
