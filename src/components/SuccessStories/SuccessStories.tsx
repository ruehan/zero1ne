import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useAnimation, useInView, Variants } from "framer-motion";

// 스타일드 컴포넌트
const SectionContainer = styled.section`
	padding: 5rem 0;
	background-color: #f0f7ff;
	background: linear-gradient(135deg, #f0f7ff 0%, #e0f0ff 100%);
`;

const SectionInner = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 2rem;
`;

const SectionHeader = styled.div`
	text-align: center;
	margin-bottom: 4rem;
`;

const SectionTag = styled(motion.div)`
	display: inline-block;
	background-color: rgba(52, 152, 219, 0.1);
	color: #3498db;
	font-weight: 600;
	font-size: 0.9rem;
	padding: 6px 12px;
	border-radius: 20px;
	margin-bottom: 15px;
`;

const SectionTitle = styled(motion.h2)`
	font-size: 2.5rem;
	color: #444;
	margin-bottom: 1rem;

	@media (max-width: 768px) {
		font-size: 2rem;
	}
`;

const SectionDescription = styled(motion.p)`
	font-size: 1.1rem;
	max-width: 700px;
	margin: 0 auto;
	color: #555;
	line-height: 1.6;

	@media (max-width: 768px) {
		font-size: 1rem;
	}
`;

// 결과 지표를 위한 스타일 컴포넌트
const ResultsContainer = styled(motion.div)`
	display: flex;
	flex-direction: column;
	margin-bottom: 5rem;
`;

const ResultsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 30px;
	margin-top: 50px;

	@media (max-width: 991px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 767px) {
		grid-template-columns: 1fr;
	}
`;

const ResultCard = styled(motion.div)`
	background-color: ${(props) => props.color || "#3498db"};
	border-radius: 15px;
	overflow: hidden;
	padding: 40px 30px;
	box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	justify-content: center;
	color: white;
	position: relative;
	min-height: 250px;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
		z-index: 0;
	}
`;

const ResultLabel = styled.div`
	font-size: 1.2rem;
	font-weight: 500;
	margin-bottom: 15px;
	position: relative;
	z-index: 1;
`;

const ResultValue = styled.div`
	font-size: 3rem;
	font-weight: 800;
	margin-bottom: 10px;
	position: relative;
	z-index: 1;

	@media (max-width: 1024px) {
		font-size: 2.5rem;
	}
`;

const ResultUnit = styled.div`
	font-size: 1.1rem;
	font-weight: 400;
	opacity: 0.8;
	position: relative;
	z-index: 1;
`;

const ResultIcon = styled.div`
	position: absolute;
	bottom: 20px;
	right: 20px;
	font-size: 80px;
	opacity: 0.2;
	transform: rotate(-10deg);
`;

// 애니메이션 변수
const fadeInUp: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
};

const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: "easeInOut",
		},
	},
};

const resultsVariant: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: (i) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.2,
			duration: 0.6,
			ease: "easeOut",
		},
	}),
};

const staggerContainer: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

// 결과 데이터
const resultsData = [
	{
		label: "누적매출",
		value: "124,000,000",
		unit: "원+",
		icon: "💰",
		color: "#3498db",
	},
	{
		label: "감량한 폐기물 양",
		value: "224,240",
		unit: "kg+",
		icon: "🌱",
		color: "#2ecc71",
	},
	{
		label: "절약한 비용",
		value: "42,025,400",
		unit: "원+",
		icon: "💵",
		color: "#f39c12",
	},
];

const SuccessStories: React.FC = () => {
	const controls = useAnimation();
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

	useEffect(() => {
		if (isInView) {
			controls.start("visible");
		}
	}, [controls, isInView]);

	return (
		<SectionContainer>
			<SectionInner ref={sectionRef}>
				<SectionHeader>
					<SectionTitle variants={fadeInUp} initial="hidden" animate={controls}>
						도입 성공 사례
					</SectionTitle>
					<SectionDescription variants={fadeInUp} initial="hidden" animate={controls} transition={{ delay: 0.1 }}>
						제로원의 솔루션을 도입한 기업들은 폐기물 관리 비용을 절감하고 환경 영향을 최소화하며 긍정적인 변화를 경험하고 있습니다.
					</SectionDescription>
				</SectionHeader>

				{/* 결과 지표 섹션 */}
				<ResultsContainer variants={staggerContainer} initial="hidden" animate={controls}>
					<ResultsGrid>
						{resultsData.map((result, index) => (
							<ResultCard key={index} color={result.color} variants={resultsVariant} custom={index} initial="hidden" animate={controls}>
								<ResultLabel>{result.label}</ResultLabel>
								<ResultValue>{result.value}</ResultValue>
								<ResultUnit>{result.unit}</ResultUnit>
								<ResultIcon>{result.icon}</ResultIcon>
							</ResultCard>
						))}
					</ResultsGrid>
				</ResultsContainer>

				{/* 기존 코드 유지 */}
			</SectionInner>
		</SectionContainer>
	);
};

export default SuccessStories;
