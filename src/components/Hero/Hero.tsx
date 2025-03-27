import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { motion, useAnimation, Variants, useViewportScroll, useTransform } from "framer-motion";
import techImage from "../../assets/images/visual_02.png";

// 스타일드 컴포넌트
const HeroSection = styled.section`
	height: 100vh;
	width: 100%;
	display: flex;
	position: relative;
	overflow: hidden;
	background: linear-gradient(135deg, #053a20 0%, #085838 50%, #053a20 100%);
`;

const HeroContent = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100%;
	padding: 0 5%;
	z-index: 2;

	@media (max-width: 1024px) {
		flex-direction: column-reverse;
		padding-top: 80px;
	}
`;

const LeftContent = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-right: 2rem;
	color: white;

	@media (max-width: 1024px) {
		padding-right: 0;
		padding-top: 2rem;
		text-align: center;
		align-items: center;
	}
`;

const RightContent = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;

	@media (max-width: 1024px) {
		height: 40%;
		min-height: 300px;
	}
`;

const Headline = styled(motion.h1)`
	font-size: 3.5rem;
	font-weight: 800;
	line-height: 1.2;
	margin-bottom: 1.5rem;

	@media (max-width: 768px) {
		font-size: 2.5rem;
	}
`;

const TextHighlight = styled.span`
	position: relative;
	display: inline-block;
	color: #8dffbe;

	&::after {
		content: "";
		position: absolute;
		left: 0;
		bottom: 5px;
		width: 100%;
		height: 8px;
		background-color: rgba(141, 255, 190, 0.2);
		z-index: -1;
	}
`;

const Description = styled(motion.p)`
	font-size: 1.1rem;
	line-height: 1.6;
	margin-bottom: 2rem;
	max-width: 600px;

	@media (max-width: 768px) {
		font-size: 1rem;
	}
`;

const ButtonContainer = styled(motion.div)`
	display: flex;
	gap: 1rem;
	margin-bottom: 3rem;

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 300px;
		gap: 0.5rem;
	}
`;

const Button = styled(motion.button)`
	padding: 0.8rem 1.8rem;
	border-radius: 4px;
	font-weight: 600;
	font-size: 1rem;
	cursor: pointer;
	border: none;
	transition: transform 0.2s, box-shadow 0.2s;

	&:hover {
		transform: translateY(-2px);
	}
`;

const PrimaryButton = styled(Button)`
	background-color: #0d5932;
	color: white;
	box-shadow: 0 4px 10px rgba(13, 89, 50, 0.3);

	&:hover {
		background-color: #0a4527;
		box-shadow: 0 6px 15px rgba(13, 89, 50, 0.4);
	}
`;

const SecondaryButton = styled(Button)`
	background-color: transparent;
	color: white;
	border: 2px solid white;

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
`;

const StatsContainer = styled(motion.div)`
	display: flex;
	gap: 2rem;

	@media (max-width: 768px) {
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}
`;

const StatItem = styled(motion.div)`
	display: flex;
	flex-direction: column;
`;

const StatValue = styled.span`
	font-size: 2rem;
	font-weight: 700;
	color: #8dffbe;
`;

const StatLabel = styled.span`
	font-size: 0.9rem;
	color: rgba(255, 255, 255, 0.8);
`;

const TechImageContainer = styled(motion.div)`
	width: 80%;
	max-width: 500px;
	height: auto;
	position: relative;

	@media (max-width: 1024px) {
		width: 70%;
		max-width: 350px;
	}
`;

const TechImage = styled(motion.img)`
	width: 100%;
	height: auto;
	object-fit: contain;
	border-radius: 12px;
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const TechImageGlow = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border-radius: 12px;
	background: radial-gradient(circle at center, rgba(141, 255, 190, 0.4) 0%, transparent 70%);
	filter: blur(20px);
	z-index: -1;
`;

const GradientOverlay = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: radial-gradient(circle at 70% 30%, rgba(141, 255, 190, 0.1) 0%, transparent 60%);
	z-index: 1;
`;

// 스크롤 경로 애니메이션 컴포넌트
const ScrollPathContainer = styled.div`
	position: fixed;
	right: 40px;
	top: 50%;
	transform: translateY(-50%);
	height: 70vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 100;

	@media (max-width: 991px) {
		right: 25px;
		height: 60vh;
	}

	@media (max-width: 768px) {
		display: none;
	}
`;

const ScrollPath = styled.div<{ isHeroSection: boolean }>`
	width: 2px;
	height: 100%;
	background-color: ${(props) => (props.isHeroSection ? "rgba(255, 255, 255, 0.15)" : "rgba(13, 89, 50, 0.15)")};
	position: relative;
	overflow: visible;
	border-radius: 15px;
	box-shadow: ${(props) => (props.isHeroSection ? "0 0 5px rgba(255, 255, 255, 0.1)" : "0 0 5px rgba(13, 89, 50, 0.1)")};
`;

const ScrollTrail = styled(motion.div)<{ isHeroSection: boolean }>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 0;
	background: ${(props) => (props.isHeroSection ? "linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0.7))" : "linear-gradient(to bottom, #0d5932, rgba(13, 89, 50, 0.7))")};
	z-index: 1;
	border-radius: 15px;
	box-shadow: ${(props) => (props.isHeroSection ? "0 0 8px rgba(255, 255, 255, 0.4)" : "0 0 8px rgba(13, 89, 50, 0.4)")};
`;

const ScrollDots = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ScrollLabels = styled.div`
	position: absolute;
	right: 15px;
	width: 120px;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;

	@media (max-width: 991px) {
		right: 12px;
	}
`;

const ScrollPlane = styled(motion.div)`
	position: absolute;
	right: -18px;
	width: 36px;
	height: 36px;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 4;
`;

const TruckWrapper = styled(motion.div)<{ isHeroSection: boolean }>`
	width: 38px;
	height: 38px;
	position: relative;
	filter: ${(props) => (props.isHeroSection ? "drop-shadow(0 0 10px rgba(255, 255, 255, 0.7))" : "drop-shadow(0 0 10px rgba(13, 89, 50, 0.7))")};
	transform-origin: center;

	/* SVG 트럭 아이콘 스타일링 */
	svg {
		width: 100%;
		height: 100%;
		fill: ${(props) => (props.isHeroSection ? "#ffffff" : "#0d5932")};
	}
`;

const AirplaneWrapper = styled(motion.div)<{ isHeroSection: boolean }>`
	width: 38px;
	height: 38px;
	position: relative;
	filter: ${(props) => (props.isHeroSection ? "drop-shadow(0 0 12px rgba(255, 255, 255, 0.9))" : "drop-shadow(0 0 12px rgba(13, 89, 50, 0.9))")};
	transform-origin: center;

	&::before {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		background-color: ${(props) => (props.isHeroSection ? "#ffffff" : "#0d5932")};
		clip-path: polygon(50% 0%, 100% 100%, 50% 70%, 0% 100%);
	}

	&::after {
		content: "";
		position: absolute;
		top: 55%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 40%;
		height: 40%;
		background-color: ${(props) => (props.isHeroSection ? "rgba(141, 255, 190, 1)" : "rgba(255, 255, 255, 1)")};
		border-radius: 50%;
		box-shadow: ${(props) => (props.isHeroSection ? "0 0 15px 5px rgba(141, 255, 190, 0.8)" : "0 0 15px 5px rgba(255, 255, 255, 0.8)")};
	}
`;

const Airplane = motion(AirplaneWrapper);

// 애니메이션 설정
const fadeIn: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: "easeOut",
		},
	},
};

const staggerChildren = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.3,
		},
	},
};

const imageAnimation: Variants = {
	hidden: { opacity: 0, scale: 0.8, y: 20 },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: "easeOut",
			delay: 0.5,
		},
	},
};

const pulseAnimation = {
	initial: { scale: 1 },
	pulse: {
		scale: 1.05,
		transition: {
			yoyo: Infinity,
			duration: 2,
			ease: "easeInOut",
		},
	},
};

const floatAnimation = {
	initial: { y: 0 },
	float: {
		y: [0, -15, 0],
		transition: {
			repeat: Infinity,
			duration: 3,
			ease: "easeInOut",
		},
	},
};

const scrollArrowAnimation = {
	initial: { y: 0, opacity: 0.6 },
	animate: {
		y: [0, 10, 0],
		opacity: [0.6, 1, 0.6],
		transition: {
			repeat: Infinity,
			duration: 2,
			ease: "easeInOut",
		},
	},
};

const Hero: React.FC = () => {
	const controls = useAnimation();
	const { scrollY, scrollYProgress } = useViewportScroll();
	const [activeSection, setActiveSection] = useState(0);
	const [isHeroSection, setIsHeroSection] = useState(true);

	// 스크롤 네비게이션 참조
	const scrollDotsRef = useRef<HTMLDivElement>(null);
	// 트럭 애니메이션 컨트롤
	const truckControls = useAnimation();

	// 섹션 정의
	const sections = [
		{ id: "hero", label: "제로원", ref: useRef<HTMLElement | null>(null) },
		{ id: "solution", label: "솔루션", ref: useRef<HTMLElement | null>(null) },
		{ id: "technology", label: "기술", ref: useRef<HTMLElement | null>(null) },
		{ id: "process", label: "도입 및 사후관리", ref: useRef<HTMLElement | null>(null) },
		{ id: "cases", label: "도입 성공 사례", ref: useRef<HTMLElement | null>(null) },
	];

	// 트레일과 트럭 회전 애니메이션
	const planeRotation = useTransform(scrollYProgress, [0, 0.33, 0.67, 1], [0, 5, -5, 0]);
	const trailHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

	// 스크롤 이벤트 처리
	useEffect(() => {
		// 애니메이션 시작
		controls.start("visible");

		// 섹션 참조 획득
		// Hero 섹션은 항상 있으므로 첫 번째로 설정
		sections[0].ref.current = document.querySelector("section#hero") || document.querySelector("section");

		// 나머지 섹션 찾기
		for (let i = 1; i < sections.length; i++) {
			const section = sections[i];
			const element = document.getElementById(section.id);
			if (element) {
				section.ref.current = element;
			}
		}

		// 섹션 높이에 따른 위치 계산 함수
		const calculatePositions = () => {
			// 섹션 위치 및 높이 정보 수집
			const sectionsInfo = sections
				.map((section, index) => {
					if (section.ref.current) {
						const offsetTop = section.ref.current.offsetTop;
						const height = section.ref.current.clientHeight;
						return { index, offsetTop, height };
					}
					return null;
				})
				.filter(Boolean) as Array<{ index: number; offsetTop: number; height: number }>;

			if (sectionsInfo.length === 0) return null;

			// 전체 페이지 길이 계산
			const totalScrollHeight =
				Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) -
				window.innerHeight;

			// 네비게이션 경로 높이
			const pathHeight = scrollDotsRef.current?.clientHeight || 0;
			if (pathHeight === 0) return null;

			// 각 섹션의 상대적 위치 계산 (0~1 사이 값)
			const sectionPositions = sectionsInfo.map((section) => {
				const relativePosition = section.offsetTop / totalScrollHeight;
				// 스크롤 경로에서의 위치 (픽셀)
				const pathPosition = Math.min(relativePosition * pathHeight, pathHeight - 20);
				return {
					index: section.index,
					position: pathPosition,
				};
			});

			return { sectionPositions, pathHeight, totalScrollHeight };
		};

		// 위치 계산 정보 초기화
		let positionInfo = calculatePositions();

		// DOM 요소에 위치 적용
		const updateDotPositions = () => {
			if (!positionInfo) {
				positionInfo = calculatePositions();
				if (!positionInfo) return;
			}

			const { sectionPositions } = positionInfo;

			// 닷과 라벨 요소 가져오기
			const dotsContainer = scrollDotsRef.current;
			const labelsContainer = dotsContainer?.nextElementSibling as HTMLElement;

			if (!dotsContainer || !labelsContainer) return;

			// 기존 요소 모두 제거
			while (dotsContainer.firstChild) {
				dotsContainer.removeChild(dotsContainer.firstChild);
			}

			while (labelsContainer.firstChild) {
				labelsContainer.removeChild(labelsContainer.firstChild);
			}

			// 새 위치로 요소 생성
			sectionPositions.forEach(({ index, position }) => {
				// 스크롤 닷 생성
				const dot = document.createElement("div");
				dot.className = `scroll-dot-${index}`;
				dot.setAttribute("data-index", index.toString());
				dot.style.position = "absolute";
				dot.style.top = `${position}px`;
				dot.style.width = index === activeSection ? "12px" : "8px";
				dot.style.height = index === activeSection ? "12px" : "8px";
				dot.style.borderRadius = "50%";
				dot.style.zIndex = "3";
				dot.style.cursor = "pointer";
				dot.style.transition = "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";

				// 닷 배경색 설정
				if (index <= activeSection) {
					dot.style.backgroundColor = isHeroSection ? "#ffffff" : "#0d5932";
					dot.style.boxShadow = isHeroSection ? "0 0 10px rgba(255, 255, 255, 0.6)" : "0 0 10px rgba(13, 89, 50, 0.6)";
				} else {
					dot.style.backgroundColor = isHeroSection ? "rgba(255, 255, 255, 0.3)" : "rgba(13, 89, 50, 0.3)";
				}

				// 링 효과 생성 코드 제거, 바로 onclick 이벤트로 넘어감
				dot.onclick = () => scrollToSection(sections[index].id);
				dotsContainer.appendChild(dot);

				// 라벨 생성
				const label = document.createElement("div");
				label.className = `section-label-${index}`;
				label.textContent = sections[index].label;
				label.setAttribute("data-index", index.toString());

				// 라벨 스타일 설정
				label.style.position = "absolute";
				label.style.top = `${position}px`;
				label.style.right = "0";
				label.style.transform = "translateY(-50%)";
				label.style.fontSize = "0.8rem";
				label.style.letterSpacing = "0.5px";
				label.style.fontWeight = index === activeSection ? "700" : "400";
				label.style.whiteSpace = "nowrap";
				label.style.opacity = index === activeSection ? "1" : "0.8";
				label.style.cursor = "pointer";
				label.style.transition = "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
				label.style.zIndex = "5";

				// 색상 설정 - 제로원 섹션에서는 항상 흰색으로
				if (isHeroSection) {
					label.style.color = "#ffffff";
					label.style.textShadow = "0 1px 3px rgba(0, 0, 0, 0.4)";
				} else {
					label.style.color = index === activeSection ? "#0d5932" : "rgba(13, 89, 50, 0.8)";
				}

				// 배경 및 블러 효과
				label.style.padding = "6px 14px";
				label.style.borderRadius = "30px";
				label.style.backgroundColor = isHeroSection
					? index === activeSection
						? "rgba(13, 89, 50, 0.9)"
						: "rgba(5, 58, 32, 0.8)"
					: index === activeSection
					? "rgba(255, 255, 255, 0.85)"
					: "rgba(255, 255, 255, 0.7)";

				// 블러 효과 적용
				label.style.backdropFilter = "blur(15px)";
				// TypeScript 린터 에러 방지를 위해 any 타입으로 캐스팅
				(label.style as any).webkitBackdropFilter = "blur(15px)";

				// 그림자 효과
				label.style.boxShadow =
					index === activeSection
						? isHeroSection
							? "0 4px 20px rgba(0, 0, 0, 0.5)"
							: "0 4px 20px rgba(13, 89, 50, 0.4)"
						: isHeroSection
						? "0 2px 10px rgba(0, 0, 0, 0.2)"
						: "0 2px 10px rgba(0, 0, 0, 0.1)";

				// 활성 상태 표시기
				if (index === activeSection) {
					const indicator = document.createElement("div");
					indicator.style.position = "absolute";
					indicator.style.right = "-5px";
					indicator.style.top = "50%";
					indicator.style.transform = "translateY(-50%)";
					indicator.style.width = "3px";
					indicator.style.height = "50%";
					indicator.style.backgroundColor = isHeroSection ? "#8dffbe" : "#0d5932";
					indicator.style.borderRadius = "2px";

					label.appendChild(indicator);
				}

				// 호버 효과
				label.onmouseover = () => {
					label.style.opacity = "1";
					label.style.transform = "translateY(-50%) translateX(2px)";
					label.style.backgroundColor = isHeroSection ? "rgba(13, 89, 50, 0.95)" : "rgba(255, 255, 255, 0.95)";
					label.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.25)";
				};

				label.onmouseout = () => {
					label.style.opacity = index === activeSection ? "1" : "0.8";
					label.style.transform = "translateY(-50%)";
					label.style.backgroundColor = isHeroSection
						? index === activeSection
							? "rgba(13, 89, 50, 0.9)"
							: "rgba(5, 58, 32, 0.8)"
						: index === activeSection
						? "rgba(255, 255, 255, 0.85)"
						: "rgba(255, 255, 255, 0.7)";
					label.style.boxShadow =
						index === activeSection
							? isHeroSection
								? "0 4px 20px rgba(0, 0, 0, 0.5)"
								: "0 4px 20px rgba(13, 89, 50, 0.4)"
							: isHeroSection
							? "0 2px 10px rgba(0, 0, 0, 0.2)"
							: "0 2px 10px rgba(0, 0, 0, 0.1)";
				};

				label.onclick = () => scrollToSection(sections[index].id);
				labelsContainer.appendChild(label);
			});
		};

		// 초기 위치 설정
		setTimeout(() => {
			updateDotPositions();

			// 스크롤 이벤트 핸들러
			const handleScroll = () => {
				if (!positionInfo) {
					positionInfo = calculatePositions();
					if (!positionInfo) return;
				}

				const { totalScrollHeight, pathHeight } = positionInfo;

				// 현재 스크롤 위치
				const scrollPosition = window.scrollY;

				// 스크롤 진행률 계산 (0 ~ 1)
				const scrollProgress = Math.min(Math.max(scrollPosition / totalScrollHeight, 0), 1);

				// 트럭 위치 계산
				const truckPosition = pathHeight * scrollProgress;

				// 트럭 위치 업데이트
				truckControls.set({ top: truckPosition });

				// 현재 활성 섹션 찾기
				const viewportMiddle = scrollPosition + window.innerHeight / 3;
				let newActiveSection = 0;

				for (let i = 0; i < sections.length; i++) {
					const section = sections[i];
					if (section.ref.current) {
						const sectionTop = section.ref.current.offsetTop;
						const sectionBottom = sectionTop + section.ref.current.clientHeight;

						if (viewportMiddle >= sectionTop && viewportMiddle < sectionBottom) {
							newActiveSection = i;
							break;
						}
					}
				}

				// 활성 섹션 업데이트
				if (newActiveSection !== activeSection) {
					setActiveSection(newActiveSection);
					setIsHeroSection(newActiveSection === 0);

					// 닷과 라벨의 활성 상태 업데이트
					const dots = scrollDotsRef.current?.children;
					const labels = scrollDotsRef.current?.nextElementSibling?.children;

					if (dots && labels) {
						for (let i = 0; i < dots.length; i++) {
							const isActive = i <= newActiveSection;
							const dot = dots[i] as HTMLElement;
							const label = labels[i] as HTMLElement;

							// 활성 상태에 따른 클래스 적용
							dot.className = `scroll-dot-${i} ${isActive ? "active" : ""}`;
							label.className = `section-label-${i} ${i === newActiveSection ? "active" : ""}`;
						}
					}
				}
			};

			// 이벤트 리스너 등록
			window.addEventListener("scroll", handleScroll);
			window.addEventListener("resize", () => {
				positionInfo = calculatePositions();
				updateDotPositions();
				handleScroll();
			});

			// 초기 스크롤 위치 처리
			handleScroll();

			return () => {
				window.removeEventListener("scroll", handleScroll);
				window.removeEventListener("resize", handleScroll);
			};
		}, 300);
	}, [controls, sections, truckControls, activeSection]);

	// 네비게이션 클릭 처리 - 단순화
	const scrollToSection = (sectionId: string) => {
		const sectionIndex = sections.findIndex((s) => s.id === sectionId);
		if (sectionIndex === -1) return;

		// 1. 먼저 트럭 위치 업데이트
		truckControls.set({ top: sections[sectionIndex].ref.current?.offsetTop || 0 });

		// 2. 그 다음 스크롤 이동
		const section = document.getElementById(sectionId) || sections[sectionIndex].ref.current;
		if (section) {
			window.scrollTo({
				top: section.offsetTop - 80,
				behavior: "smooth",
			});
		}
	};

	return (
		<HeroSection id="hero">
			<GradientOverlay
				initial={{ opacity: 0 }}
				animate={{
					opacity: 1,
					y: [0, -15, 0],
				}}
				transition={{
					opacity: { duration: 1.5 },
					y: {
						repeat: Infinity,
						duration: 3,
						ease: "easeInOut",
					},
				}}
			/>

			<HeroContent>
				<LeftContent>
					<Headline variants={fadeIn} initial="hidden" animate={controls}>
						식품 폐기물의 <br />
						<TextHighlight>순환 경제</TextHighlight> 구축
					</Headline>

					<Description variants={fadeIn} initial="hidden" animate={controls} transition={{ delay: 0.2 }}>
						제로원은 첨단 기술을 활용하여 식품 폐기물을 자원으로 변환합니다. 친환경적이고 지속 가능한 방식으로 순환 경제를 구현하며 환경 보호와 경제적 이익을 동시에 제공합니다.
					</Description>

					<ButtonContainer variants={staggerChildren} initial="hidden" animate={controls} transition={{ delay: 0.4 }}>
						<PrimaryButton variants={fadeIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							솔루션 알아보기
						</PrimaryButton>

						<SecondaryButton variants={fadeIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							무료 상담 신청
						</SecondaryButton>
					</ButtonContainer>

					<StatsContainer variants={staggerChildren} initial="hidden" animate={controls} transition={{ delay: 0.6 }}>
						<StatItem variants={fadeIn}>
							<StatValue>30%</StatValue>
							<StatLabel>연간 CO2 감소</StatLabel>
						</StatItem>

						<StatItem variants={fadeIn}>
							<StatValue>85%</StatValue>
							<StatLabel>자원 재활용률</StatLabel>
						</StatItem>

						<StatItem variants={fadeIn}>
							<StatValue>40%</StatValue>
							<StatLabel>운영 비용 절감</StatLabel>
						</StatItem>
					</StatsContainer>
				</LeftContent>

				<RightContent>
					<TechImageContainer variants={imageAnimation} initial="hidden" animate={controls}>
						<TechImage src={techImage} alt="순환 경제 기술" variants={pulseAnimation} initial="initial" animate="pulse" />
						<TechImageGlow variants={pulseAnimation} initial="initial" animate="pulse" />
					</TechImageContainer>
				</RightContent>
			</HeroContent>

			{/* 스크롤 경로 애니메이션 */}
			<ScrollPathContainer>
				<ScrollPath isHeroSection={isHeroSection}>
					<ScrollTrail
						isHeroSection={isHeroSection}
						style={{ height: trailHeight }}
						animate={{
							boxShadow: isHeroSection
								? ["0 0 8px rgba(255, 255, 255, 0.4)", "0 0 12px rgba(255, 255, 255, 0.6)", "0 0 8px rgba(255, 255, 255, 0.4)"]
								: ["0 0 8px rgba(13, 89, 50, 0.4)", "0 0 12px rgba(13, 89, 50, 0.6)", "0 0 8px rgba(13, 89, 50, 0.4)"],
						}}
						transition={{
							boxShadow: {
								repeat: Infinity,
								duration: 2,
								ease: "easeInOut",
							},
						}}
					/>
					<ScrollDots ref={scrollDotsRef}>{/* 동적으로 생성됨 */}</ScrollDots>
					<ScrollLabels>{/* 동적으로 생성됨 */}</ScrollLabels>
					<ScrollPlane animate={truckControls} initial={{ top: 0 }}>
						<TruckWrapper
							isHeroSection={isHeroSection}
							style={{
								rotate: planeRotation,
							}}
							animate={{
								filter: isHeroSection
									? ["drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))", "drop-shadow(0 0 12px rgba(255, 255, 255, 0.8))", "drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))"]
									: ["drop-shadow(0 0 8px rgba(13, 89, 50, 0.4))", "drop-shadow(0 0 12px rgba(13, 89, 50, 0.8))", "drop-shadow(0 0 8px rgba(13, 89, 50, 0.4))"],
								scale: [1, 1.05, 1],
							}}
							transition={{
								filter: {
									repeat: Infinity,
									duration: 2,
									ease: "easeInOut",
								},
								scale: {
									repeat: Infinity,
									duration: 3,
									ease: "easeInOut",
								},
							}}
						>
							{/* 트럭 SVG 아이콘 */}
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
								<path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM208 416c0 26.5-21.5 48-48 48s-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48zm272 48c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48z" />
							</svg>
						</TruckWrapper>
					</ScrollPlane>
				</ScrollPath>
			</ScrollPathContainer>
		</HeroSection>
	);
};

export default Hero;
