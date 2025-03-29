import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useAnimation, Variants } from "framer-motion";
import techImage from "../../assets/images/visual_02.png";
import ContactModal from "../Modal/ContactModal";

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
	background-color: #2563eb;
	color: white;
	border: 2px solid #fff;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

	&:hover {
		background-color: #1d4ed8;
		box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
	}
`;

const SecondaryButton = styled(Button)`
	background-color: rgba(255, 255, 255, 0.15);
	color: white;
	border: 2px solid #fff;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

	&:hover {
		background-color: rgba(255, 255, 255, 0.25);
		box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
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

const Hero: React.FC = () => {
	const controls = useAnimation();
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		controls.start("visible");
	}, [controls]);

	const handleSolutionClick = () => {
		// 솔루션 섹션으로 스크롤
		document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" });
	};

	const handleContactClick = () => {
		setModalOpen(true);
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
						<PrimaryButton variants={fadeIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSolutionClick}>
							솔루션 알아보기
						</PrimaryButton>

						<SecondaryButton variants={fadeIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleContactClick}>
							무료 상담 신청
						</SecondaryButton>
					</ButtonContainer>

					<StatsContainer variants={staggerChildren} initial="hidden" animate={controls} transition={{ delay: 0.6 }}>
						{/* <StatItem variants={fadeIn}>
							<StatValue>30%</StatValue>
							<StatLabel>연간 CO2 감소</StatLabel>
						</StatItem> */}

						<StatItem variants={fadeIn}>
							<StatValue>85%</StatValue>
							<StatLabel>자원 재활용률</StatLabel>
						</StatItem>

						<StatItem variants={fadeIn}>
							<StatValue>30%</StatValue>
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

			{/* 스크롤 다운 인디케이터 */}
			<ScrollDownLink href="#solution" variants={fadeIn} initial="hidden" animate={controls} transition={{ delay: 1.2 }}>
				<ScrollText>더 알아보기</ScrollText>
				<ScrollDownIcon
					animate={{ y: [0, 10, 0] }}
					transition={{
						repeat: Infinity,
						duration: 1.5,
						ease: "easeInOut",
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M12 5v14M5 12l7 7 7-7" />
					</svg>
				</ScrollDownIcon>
			</ScrollDownLink>

			<ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
		</HeroSection>
	);
};

// 스타일 컴포넌트 추가
const ScrollDownLink = styled(motion.a)`
	position: absolute;
	bottom: 40px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
	opacity: 0.8;
	text-decoration: none;
	transition: opacity 0.3s ease;
	z-index: 10;

	&:hover {
		opacity: 1;
	}

	@media (max-width: 768px) {
		bottom: 20px;
	}
`;

const ScrollText = styled.span`
	font-size: 0.9rem;
	margin-bottom: 10px;
	font-weight: 500;
	letter-spacing: 1px;
`;

const ScrollDownIcon = styled(motion.div)`
	display: flex;
	justify-content: center;
	align-items: center;

	svg {
		width: 28px;
		height: 28px;
	}
`;

export default Hero;
