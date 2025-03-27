import React, { useEffect, useState } from "react";
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
	right: 35px;
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
	width: 3px;
	height: 100%;
	background-color: ${(props) => (props.isHeroSection ? "rgba(255, 255, 255, 0.3)" : "rgba(13, 89, 50, 0.2)")};
	position: relative;
	overflow: visible;
	border-radius: 4px;
`;

const ScrollTrail = styled(motion.div)<{ isHeroSection: boolean }>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 0;
	background: ${(props) =>
		props.isHeroSection ? "linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.4))" : "linear-gradient(to bottom, rgba(13, 89, 50, 0.95), rgba(13, 89, 50, 0.4))"};
	z-index: -1;
	border-radius: 4px;
	box-shadow: ${(props) => (props.isHeroSection ? "0 0 10px rgba(255, 255, 255, 0.5)" : "0 0 10px rgba(13, 89, 50, 0.5)")};
`;

const ScrollDots = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;

const ScrollDot = styled.div<{ active: boolean; isHeroSection: boolean }>`
	width: ${(props) => (props.active ? "16px" : "12px")};
	height: ${(props) => (props.active ? "16px" : "12px")};
	border-radius: 50%;
	background-color: ${(props) => {
		if (props.active) {
			return props.isHeroSection ? "#ffffff" : "#0d5932";
		}
		return props.isHeroSection ? "rgba(255, 255, 255, 0.5)" : "rgba(13, 89, 50, 0.4)";
	}};
	transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
	position: relative;
	z-index: 2;

	box-shadow: ${(props) => (props.active ? (props.isHeroSection ? "0 0 15px 4px rgba(255, 255, 255, 0.7)" : "0 0 15px 4px rgba(13, 89, 50, 0.5)") : "none")};

	&::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: ${(props) => (props.active ? "26px" : "0")};
		height: ${(props) => (props.active ? "26px" : "0")};
		border-radius: 50%;
		background-color: transparent;
		border: 2px solid
			${(props) => {
				if (props.active) {
					return props.isHeroSection ? "rgba(255, 255, 255, 0.6)" : "rgba(13, 89, 50, 0.6)";
				}
				return "transparent";
			}};
		transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
`;

const ScrollLabels = styled.div`
	position: absolute;
	left: -20px;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;

	@media (max-width: 991px) {
		left: -50px;
	}
`;

const SectionLabel = styled.div<{ active: boolean; isHeroSection: boolean }>`
	font-size: 0.85rem;
	color: ${(props) => {
		if (props.active) {
			return props.isHeroSection ? "#ffffff" : "#0d5932";
		}
		return props.isHeroSection ? "rgba(255, 255, 255, 0.5)" : "rgba(13, 89, 50, 0.4)";
	}};
	transition: all 0.3s ease;
	white-space: nowrap;
	transform: translateY(5px);
	opacity: ${(props) => (props.active ? 1 : 0.6)};
	font-weight: ${(props) => (props.active ? 700 : 400)};
	text-shadow: ${(props) => (props.active ? (props.isHeroSection ? "0 0 8px rgba(255, 255, 255, 0.4)" : "0 0 8px rgba(13, 89, 50, 0.4)") : "none")};
	background-color: ${(props) => (props.isHeroSection ? "rgba(5, 58, 32, 0.8)" : "rgba(255, 255, 255, 0.8)")};
	padding: 3px 8px;
	border-radius: 4px;
`;

const ScrollPlane = styled(motion.div)`
	position: absolute;
	right: -20px;
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 3;
`;

const TruckWrapper = styled(motion.div)<{ isHeroSection: boolean }>`
	width: 42px;
	height: 42px;
	position: relative;
	filter: ${(props) => (props.isHeroSection ? "drop-shadow(0 0 12px rgba(255, 255, 255, 0.9))" : "drop-shadow(0 0 12px rgba(13, 89, 50, 0.9))")};
	transform-origin: center;

	/* SVG 트럭 아이콘 스타일링 */
	svg {
		width: 100%;
		height: 100%;
		fill: ${(props) => (props.isHeroSection ? "#ffffff" : "#0d5932")};
	}

	/* 발광 효과 */
	&::after {
		content: "";
		position: absolute;
		top: 70%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 60%;
		height: 10px;
		background-color: ${(props) => (props.isHeroSection ? "rgba(141, 255, 190, 0.7)" : "rgba(255, 255, 255, 0.7)")};
		border-radius: 50%;
		filter: blur(6px);
		box-shadow: ${(props) => (props.isHeroSection ? "0 0 15px 5px rgba(141, 255, 190, 0.5)" : "0 0 15px 5px rgba(255, 255, 255, 0.5)")};
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
	const { scrollYProgress } = useViewportScroll();
	const [activeSection, setActiveSection] = useState(0);
	const [isHeroSection, setIsHeroSection] = useState(true);

	// 비행기의 Y 위치를 스크롤 진행에 따라 변환
	const planeYPosition = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
	const planeRotation = useTransform(scrollYProgress, [0, 0.33, 0.67, 1], [0, 5, -5, 0]);
	const trailHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

	useEffect(() => {
		controls.start("visible");

		// 스크롤 진행에 따라 활성화된 섹션 변경 및 현재 섹션 배경색 확인
		const unsubscribe = scrollYProgress.onChange((value) => {
			const sectionIndex = Math.min(Math.floor(value * 4), 3);
			setActiveSection(sectionIndex);

			// Hero 섹션(인덱스 0)인지 확인하여 배경색 타입 설정
			setIsHeroSection(sectionIndex === 0);
		});

		return () => unsubscribe();
	}, [controls, scrollYProgress]);

	return (
		<HeroSection>
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
					<ScrollDots>
						<ScrollDot active={activeSection >= 0} isHeroSection={isHeroSection} />
						<ScrollDot active={activeSection >= 1} isHeroSection={isHeroSection} />
						<ScrollDot active={activeSection >= 2} isHeroSection={isHeroSection} />
						<ScrollDot active={activeSection >= 3} isHeroSection={isHeroSection} />
					</ScrollDots>
					<ScrollLabels>
						<SectionLabel active={activeSection === 0} isHeroSection={isHeroSection}>
							소개
						</SectionLabel>
						<SectionLabel active={activeSection === 1} isHeroSection={isHeroSection}>
							솔루션
						</SectionLabel>
						<SectionLabel active={activeSection === 2} isHeroSection={isHeroSection}>
							기술
						</SectionLabel>
						<SectionLabel active={activeSection === 3} isHeroSection={isHeroSection}>
							문의
						</SectionLabel>
					</ScrollLabels>
					<ScrollPlane style={{ top: planeYPosition }}>
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
								{/* 트럭 모양의 SVG 경로 */}
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
