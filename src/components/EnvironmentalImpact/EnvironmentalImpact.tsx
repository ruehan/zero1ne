import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { CarbonReductionIcon, CircularEconomyIcon, SustainableEnvironmentIcon } from "../../assets/icons/EnvironmentalIcons";

// 환경 영향 데이터
const environmentalImpactData = [
	{
		id: "carbon-footprint",
		title: "탄소발자국 감소",
		icon: CarbonReductionIcon,
		percentage: 75,
		description: "제로원의 솔루션은 유기성 폐기물 처리 과정에서 발생하는 탄소 배출량을 75% 감소시킵니다.",
		stats: [
			{ label: "현장 처리", value: "68", unit: "%" },
			{ label: "운송 감소", value: "82", unit: "%" },
			{ label: "CO₂ 감축", value: "2.5", unit: "톤/월" },
		],
	},
	{
		id: "circular-economy",
		title: "순환 경제 구현",
		icon: CircularEconomyIcon,
		percentage: 90,
		description: "처리된 폐기물의 90%를 재활용 가능한 자원으로 변환하여 순환경제 실현에 기여합니다.",
		stats: [
			{ label: "자원화율", value: "90", unit: "%" },
			{ label: "비료 생산", value: "1.8", unit: "톤/월" },
			{ label: "에너지 생산", value: "45", unit: "kWh" },
		],
	},
	{
		id: "sustainable-environment",
		title: "지속가능한 환경 조성",
		icon: SustainableEnvironmentIcon,
		percentage: 85,
		description: "환경오염 요소를 85% 감소시켜 보다 지속가능한 생태계를 조성합니다.",
		stats: [
			{ label: "악취 감소", value: "95", unit: "%" },
			{ label: "수질 개선", value: "65", unit: "%" },
			{ label: "매립지 감소", value: "78", unit: "%" },
		],
	},
];

// 스타일드 컴포넌트
const SectionContainer = styled.section`
	padding: 120px 0;
	background-color: #f9fdf9;
	overflow: hidden;
`;

const SectionInner = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 2rem;
`;

const SectionHeader = styled(motion.div)`
	text-align: center;
	margin-bottom: 5rem;
`;

const SectionTag = styled(motion.div)`
	display: inline-block;
	background-color: rgba(13, 89, 50, 0.1);
	color: #0d5932;
	font-weight: 600;
	font-size: 0.9rem;
	padding: 6px 12px;
	border-radius: 20px;
	margin-bottom: 1rem;
`;

const SectionTitle = styled(motion.h2)`
	font-size: 3rem;
	font-weight: 800;
	color: #0d5932;
	margin-bottom: 1.5rem;
	position: relative;
	display: inline-block;

	&::after {
		content: "";
		position: absolute;
		bottom: -10px;
		left: 50%;
		transform: translateX(-50%);
		width: 60px;
		height: 4px;
		background: linear-gradient(90deg, #0d5932, #4caf50);
		border-radius: 2px;
	}

	@media (max-width: 768px) {
		font-size: 2.3rem;
	}
`;

const SectionDescription = styled(motion.p)`
	font-size: 1.2rem;
	max-width: 700px;
	margin: 0 auto;
	color: #444;
	line-height: 1.7;

	@media (max-width: 768px) {
		font-size: 1rem;
	}
`;

const CardsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
	gap: 2.5rem;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

const ImpactCard = styled(motion.div)`
	background-color: white;
	border-radius: 20px;
	overflow: hidden;
	box-shadow: 0 10px 25px rgba(13, 89, 50, 0.08);
	transition: transform 0.3s ease, box-shadow 0.3s ease;

	&:hover {
		transform: translateY(-10px);
		box-shadow: 0 15px 35px rgba(13, 89, 50, 0.12);
	}
`;

const CardHeader = styled.div`
	background: linear-gradient(135deg, #0d5932 0%, #2e8b57 100%);
	padding: 2rem;
	position: relative;
	height: 180px;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
`;

const IconWrapper = styled(motion.div)`
	position: absolute;
	top: 30px;
	right: 30px;
	width: 64px;
	height: 64px;
	color: rgba(255, 255, 255, 0.8);
`;

const CardTitle = styled.h3`
	color: white;
	font-size: 1.8rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
	z-index: 1;
`;

const PercentageDisplay = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	z-index: 1;
`;

const PercentageText = styled.div`
	color: white;
	font-size: 2.5rem;
	font-weight: 800;
	line-height: 1;
`;

const PercentageLabel = styled.div`
	color: rgba(255, 255, 255, 0.8);
	font-size: 0.9rem;
`;

const CardContent = styled.div`
	padding: 2rem;
`;

const CardDescription = styled.p`
	font-size: 1rem;
	color: #555;
	line-height: 1.6;
	margin-bottom: 2rem;
`;

const CircleProgressContainer = styled.div`
	margin: 2rem 0;
	position: relative;
	width: 120px;
	height: 120px;
	margin: 0 auto 2rem;
`;

const CircleBackground = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background-color: #f0f0f0;
	position: absolute;
`;

const CircleProgress = styled(motion.div)<{ percentage: number }>`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background: conic-gradient(#0d5932 ${(props) => props.percentage * 3.6}deg, transparent 0deg);
	position: absolute;
`;

const CircleInner = styled.div`
	width: 80%;
	height: 80%;
	background-color: white;
	border-radius: 50%;
	position: absolute;
	top: 10%;
	left: 10%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.8rem;
	font-weight: 700;
	color: #0d5932;
`;

const StatsList = styled.div`
	display: grid;
	gap: 1rem;
`;

const StatItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const StatLabel = styled.div`
	font-size: 0.9rem;
	color: #666;
	display: flex;
	justify-content: space-between;
`;

const BarContainer = styled.div`
	width: 100%;
	height: 10px;
	background-color: #f0f0f0;
	border-radius: 5px;
	overflow: hidden;
`;

const BarProgress = styled(motion.div)<{ value: number }>`
	height: 100%;
	width: ${(props) => props.value}%;
	background: linear-gradient(90deg, #0d5932, #4caf50);
	border-radius: 5px;
`;

// 애니메이션 변수
const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.3,
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: "easeOut",
		},
	},
};

// 원형 차트를 위한 애니메이션 변수
const circleVariants: Variants = {
	hidden: {
		background: "conic-gradient(#0d5932 0deg, transparent 0deg)",
	},
	visible: (percentage) => ({
		background: `conic-gradient(#0d5932 ${percentage * 3.6}deg, transparent 0deg)`,
		transition: {
			duration: 1.5,
			ease: "easeOut",
		},
	}),
};

// 바 차트를 위한 애니메이션 변수
const barVariants: Variants = {
	hidden: { width: 0 },
	visible: (value) => ({
		width: `${value}%`,
		transition: {
			duration: 1,
			ease: "easeOut",
		},
	}),
};

// 아이콘 애니메이션
const iconVariants: Variants = {
	hover: {
		scale: 1.1,
		y: -10,
		rotate: [0, -5, 5, -5, 0],
		transition: {
			scale: { duration: 0.3 },
			rotate: {
				duration: 0.8,
				ease: "easeInOut",
				repeat: Infinity,
				repeatType: "reverse",
			},
		},
	},
};

const EnvironmentalImpact: React.FC = () => {
	const controls = useAnimation();
	const sectionRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

	React.useEffect(() => {
		if (isInView) {
			controls.start("visible");
		}
	}, [controls, isInView]);

	return (
		<SectionContainer ref={sectionRef}>
			<SectionInner>
				<SectionHeader>
					<SectionTitle initial="hidden" animate={controls} variants={itemVariants}>
						환경적 영향
					</SectionTitle>
					<SectionDescription initial="hidden" animate={controls} variants={itemVariants}>
						제로원 솔루션은 유기성 폐기물 처리 과정에서 환경에 미치는 영향을 최소화하고, 지속 가능한 미래를 위한 친환경 자원 순환 체계를 구축합니다. 우리의 기술은 탄소 배출량을 줄이고, 자원의 가치를
						극대화합니다.
					</SectionDescription>
				</SectionHeader>

				<CardsContainer>
					{environmentalImpactData.map((impact, index) => (
						<ImpactCard key={impact.id} initial="hidden" animate={controls} variants={itemVariants} custom={index} whileHover="hover">
							<CardHeader>
								<CardTitle>{impact.title}</CardTitle>
								<PercentageDisplay>
									<PercentageText>{impact.percentage}%</PercentageText>
									<PercentageLabel>
										{impact.id === "carbon-footprint" && "감소율"}
										{impact.id === "circular-economy" && "재활용률"}
										{impact.id === "sustainable-environment" && "개선율"}
									</PercentageLabel>
								</PercentageDisplay>
							</CardHeader>
							<CardContent>
								<CardDescription>{impact.description}</CardDescription>

								<CircleProgressContainer>
									<CircleBackground />
									<CircleProgress initial="hidden" animate={controls} variants={circleVariants} custom={impact.percentage} percentage={impact.percentage} />
									<CircleInner>{impact.percentage}%</CircleInner>
								</CircleProgressContainer>

								<StatsList>
									{impact.stats.map((stat, statIndex) => (
										<StatItem key={statIndex}>
											<StatLabel>
												<span>{stat.label}</span>
												<span>
													{stat.value}
													{stat.unit}
												</span>
											</StatLabel>
											<BarContainer>
												<BarProgress
													initial="hidden"
													animate={controls}
													variants={barVariants}
													custom={parseInt(stat.value) > 100 ? 100 : parseInt(stat.value)}
													value={parseInt(stat.value) > 100 ? 100 : parseInt(stat.value)}
												/>
											</BarContainer>
										</StatItem>
									))}
								</StatsList>
							</CardContent>
						</ImpactCard>
					))}
				</CardsContainer>
			</SectionInner>
		</SectionContainer>
	);
};

export default EnvironmentalImpact;
