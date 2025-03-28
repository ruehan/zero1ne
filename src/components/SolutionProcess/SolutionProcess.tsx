import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, useAnimation, Variants, useInView } from "framer-motion";

// 스타일드 컴포넌트
const SectionContainer = styled.section`
	padding: 100px 0;
	background-color: white;
	overflow: hidden;
`;

const SectionInner = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 20px;
	position: relative;
`;

const SectionHeader = styled.div`
	text-align: center;
	margin-bottom: 80px;
`;

const SectionTitle = styled(motion.h2)`
	font-size: 2.5rem;
	font-weight: 800;
	color: #0d5932;
	margin-bottom: 20px;

	@media (max-width: 768px) {
		font-size: 2rem;
	}
`;

const SectionDescription = styled(motion.p)`
	font-size: 1.1rem;
	line-height: 1.6;
	color: #333;
	max-width: 800px;
	margin: 0 auto;

	@media (max-width: 768px) {
		font-size: 1rem;
	}
`;

const TimelineContainer = styled.div`
	position: relative;
	padding: 20px 0;
`;

const TimelineLine = styled(motion.div)`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 50%;
	width: 4px;
	background-color: rgba(13, 89, 50, 0.15);
	transform: translateX(-50%);
	z-index: 1;

	@media (max-width: 768px) {
		left: 30px;
	}
`;

const TimelineProgress = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	background-color: #0d5932;
	height: 0;
	border-radius: 2px;
`;

const StepsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
`;

const StepRow = styled.div`
	display: flex;
	position: relative;
	margin-bottom: 60px;
	z-index: 3;

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

const StepCircle = styled.div`
	width: 30px;
	height: 30px;
	background-color: white;
	border: 5px solid #0d5932;
	border-radius: 50%;
	position: absolute;
	top: 30px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 3;

	&::after {
		content: "";
		position: absolute;
		width: 12px;
		height: 12px;
		background-color: #0d5932;
		border-radius: 50%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	@media (max-width: 768px) {
		left: 30px;
	}
`;

const ConnectLine = styled.div<{ isEven: boolean }>`
	position: absolute;
	top: 45px;
	height: 4px;
	background-color: #0d5932;
	z-index: 2;

	${(props) =>
		props.isEven
			? `
		left: 50%;
		width: calc(15% - 15px);
		transform-origin: left;
		transform: scaleX(0);
	`
			: `
		right: 50%;
		width: calc(15% - 15px);
		transform-origin: right;
		transform: scaleX(0);
	`}

	&[data-visible="true"] {
		transform: scaleX(1);
		transition: transform 0.4s ease-out 0.2s;
	}

	@media (max-width: 768px) {
		left: 30px;
		right: auto;
		width: 30px;
		transform-origin: left;
		transform: scaleX(0);

		&[data-visible="true"] {
			transform: scaleX(1);
		}
	}
`;

const StepContainer = styled(motion.div)<{ isEven: boolean }>`
	width: 50%;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: ${(props) => (props.isEven ? "flex-start" : "flex-end")};
	padding: ${(props) => (props.isEven ? "0 0 0 30px" : "0 30px 0 0")};
	margin-left: ${(props) => (props.isEven ? "auto" : "0")};
	opacity: 0;
	transform: translateX(${(props) => (props.isEven ? "30px" : "-30px")});
	transition: opacity 0.6s ease-out, transform 0.6s ease-out;
	z-index: 3;

	&[data-visible="true"] {
		opacity: 1;
		transform: translateX(0);
	}

	@media (max-width: 768px) {
		width: 100%;
		margin-left: 0;
		justify-content: flex-start;
		padding-left: 45px;
		padding-right: 0;
	}
`;

const StepContent = styled.div<{ isEven: boolean }>`
	width: calc(100% - 30px);
	background-color: white;
	border-radius: 15px;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
	padding: 30px;
	border: 1px solid rgba(0, 0, 0, 0.05);
	position: relative;
	z-index: 2;

	@media (max-width: 768px) {
		width: 100%;
	}
`;

const StepNumber = styled.div`
	width: 60px;
	height: 60px;
	background-color: #0d5932;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-size: 1.5rem;
	font-weight: 700;
	margin-bottom: 15px;
	box-shadow: 0 5px 15px rgba(13, 89, 50, 0.3);
`;

const StepTitle = styled.h3`
	font-size: 1.5rem;
	font-weight: 700;
	color: #0d5932;
	margin-bottom: 15px;
`;

const StepDescription = styled.p`
	font-size: 1rem;
	line-height: 1.5;
	color: #444;
	margin-bottom: 20px;
`;

const StepIcon = styled.div`
	font-size: 2.5rem;
	color: rgba(13, 89, 50, 0.1);
	position: absolute;
	top: 20px;
	right: 20px;
`;

const StepLink = styled.a`
	color: #0d5932;
	text-decoration: none;
	font-weight: 600;
	font-size: 0.9rem;
	display: inline-flex;
	align-items: center;
	transition: color 0.3s ease;

	&:hover {
		color: #064623;
		text-decoration: underline;
	}

	&::after {
		content: "→";
		margin-left: 5px;
		transition: transform 0.3s ease;
	}

	&:hover::after {
		transform: translateX(3px);
	}
`;

const ImageContainer = styled.div`
	width: 100%;
	height: 150px;
	margin-bottom: 20px;
	border-radius: 8px;
	overflow: hidden;
	background-color: #f5f5f5;
`;

const StepImage = styled.div`
	width: 100%;
	height: 100%;
	background-color: rgba(13, 89, 50, 0.1);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 4rem;
	color: #0d5932;
`;

const CTAContainer = styled(motion.div)`
	text-align: center;
	margin-top: 30px;
	padding: 40px 0;
`;

const CTAButton = styled(motion.button)`
	background-color: #0d5932;
	color: white;
	border: none;
	padding: 15px 30px;
	font-size: 1.1rem;
	font-weight: 600;
	border-radius: 8px;
	cursor: pointer;
	box-shadow: 0 5px 15px rgba(13, 89, 50, 0.3);
	transition: background-color 0.3s ease, transform 0.2s ease;

	&:hover {
		background-color: #064623;
		transform: translateY(-2px);
	}
`;

const ProblemHeader = styled(motion.div)`
	text-align: center;
	margin-bottom: 30px;
`;

const ProblemTag = styled(motion.div)`
	display: inline-block;
	background-color: rgba(13, 89, 50, 0.1);
	color: #0d5932;
	font-weight: 600;
	font-size: 0.9rem;
	padding: 6px 12px;
	border-radius: 20px;
	margin-bottom: 15px;
`;

const ProcessTimeline = styled(motion.div)`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 30px 0 60px;
	position: relative;

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: center;
	}
`;

const ProcessStep = styled(motion.div)<{ active?: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 120px;
	position: relative;

	@media (max-width: 768px) {
		width: 100%;
		margin-bottom: 30px;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
`;

const ProcessIcon = styled.div<{ active?: boolean }>`
	width: 80px;
	height: 80px;
	background-color: ${(props) => (props.active ? "#3498db" : "#f2f2f2")};
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 15px;
	box-shadow: ${(props) => (props.active ? "0 5px 15px rgba(52, 152, 219, 0.3)" : "0 5px 15px rgba(0, 0, 0, 0.05)")};

	@media (max-width: 768px) {
		width: 60px;
		height: 60px;
		margin-right: 15px;
		margin-bottom: 0;
	}
`;

const ProcessStepName = styled.div<{ active?: boolean }>`
	font-weight: ${(props) => (props.active ? "700" : "500")};
	font-size: 1rem;
	text-align: center;
	color: ${(props) => (props.active ? "#333" : "#777")};

	@media (max-width: 768px) {
		text-align: left;
	}
`;

const TimeConnector = styled(motion.div)`
	position: absolute;
	height: 2px;
	background-color: #e0e0e0;
	top: 40px;
	left: 60px;
	right: 60px;
	z-index: -1;

	@media (max-width: 768px) {
		display: none;
	}
`;

const TimeSection = styled(motion.div)`
	display: flex;
	justify-content: space-between;
	margin-top: 20px;

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

const TimePeriod = styled.div`
	text-align: center;
	width: 50%;

	@media (max-width: 768px) {
		width: 100%;
		margin-bottom: 20px;
	}
`;

const TimeLabel = styled.div`
	font-weight: 600;
	font-size: 1rem;
	color: #555;
	margin-bottom: 5px;
`;

const TimeDuration = styled.div`
	font-weight: 700;
	font-size: 1.5rem;
	color: ${(props) => props.color || "#3498db"};
`;

// 공정 단계 데이터 업데이트
const processSteps = [
	{
		number: "01",
		title: "현장 분석",
		description: "고객사의 요구사항과 현재 폐기물 처리 시스템을 분석하여 최적의 솔루션을 설계합니다.",
		isEven: false,
	},
	{
		number: "02",
		title: "맞춤형 솔루션 설계",
		description: "고객사의 특성과 요구에 맞는 친환경 순환 경제 솔루션을 설계합니다.",
		isEven: true,
	},
	{
		number: "03",
		title: "솔루션 구현",
		description: "설계된 솔루션을 현장에 맞게 구현하고 시스템을 설치합니다.",
		isEven: false,
	},
	{
		number: "04",
		title: "시스템 최적화",
		description: "설치된 시스템의 성능을 최적화하고 고객사 환경에 맞게 조정합니다.",
		isEven: true,
	},
	{
		number: "05",
		title: "운영 교육 및 인수인계",
		description: "고객사 담당자에게 시스템 운영 교육을 진행하고 원활한 인수인계를 지원합니다.",
		isEven: false,
	},
	{
		number: "06",
		title: "사후 관리 및 모니터링",
		description: "지속적인 모니터링과 정기 점검을 통해 시스템이 최적의 상태로 유지될 수 있도록 관리합니다.",
		isEven: true,
	},
];

// 폐기물 처리 프로세스 단계 데이터
const wasteProcessSteps = [
	{ name: "발생", icon: "📦", active: false },
	{ name: "야적", icon: "📚", active: false },
	{ name: "수집", icon: "🚚", active: false },
	{ name: "운송", icon: "🚛", active: false },
	{ name: "선별", icon: "🔍", active: false },
	{ name: "건조", icon: "🔥", active: true },
	{ name: "운송", icon: "🚛", active: false },
	{ name: "재활용", icon: "♻️", active: false },
];

// 애니메이션 설정
const fadeInUp: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: "easeOut" },
	},
};

const lineAnimation = {
	hidden: { scaleY: 0, originY: 0 },
	visible: {
		scaleY: 1,
		transition: { duration: 1.5, ease: "easeInOut" },
	},
};

const progressAnimation = {
	hidden: { height: 0 },
	visible: (value: number) => ({
		height: `${value}%`,
		transition: { duration: 0.5, ease: "easeInOut" },
	}),
};

// SolutionProcess 컴포넌트 수정
const SolutionProcess: React.FC = () => {
	const controls = useAnimation();
	const lineControls = useAnimation();
	const progressControls = useAnimation();
	const headerRef = useRef(null);
	const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
	const isHeaderInView = useInView(headerRef, { once: false, amount: 0.7 });
	const [progressHeight, setProgressHeight] = useState(0);

	useEffect(() => {
		if (isHeaderInView) {
			controls.start("visible");
			lineControls.start("visible");
		}
	}, [controls, lineControls, isHeaderInView]);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + window.innerHeight * 0.6;
			let activeSteps = 0;

			stepRefs.current.forEach((ref, index) => {
				if (ref && ref.offsetTop < scrollPosition) {
					document.getElementById(`step-${index + 1}`)?.setAttribute("data-visible", "true");
					document.getElementById(`connect-${index + 1}`)?.setAttribute("data-visible", "true");
					activeSteps = index + 1;
				}
			});

			const progress = (activeSteps / processSteps.length) * 100;
			setProgressHeight(progress);
			progressControls.start("visible");
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // 초기 로드 시 한 번 실행
		return () => window.removeEventListener("scroll", handleScroll);
	}, [progressControls]);

	return (
		<SectionContainer>
			<SectionInner>
				<SectionHeader ref={headerRef}>
					<SectionTitle variants={fadeInUp} initial="hidden" animate={controls}>
						도입 및 사후관리
					</SectionTitle>
					<SectionDescription variants={fadeInUp} initial="hidden" animate={controls} transition={{ delay: 0.1 }}>
						제로원의 순환 경제 솔루션 도입은 체계적인 절차를 통해 진행됩니다. 고객의 요구에 맞는 최적의 솔루션을 제공하기 위해 전문가 팀이 단계별로 맞춤형 서비스를 제공합니다.
					</SectionDescription>
				</SectionHeader>

				<TimelineContainer>
					<TimelineLine variants={lineAnimation} initial="hidden" animate={lineControls}>
						<TimelineProgress variants={progressAnimation} initial="hidden" animate={progressControls} custom={progressHeight} />
					</TimelineLine>

					<StepsWrapper>
						{processSteps.map((step, index) => (
							<StepRow key={index}>
								<StepCircle />
								<ConnectLine isEven={step.isEven} id={`connect-${index + 1}`} />
								<StepContainer
									className="step-container"
									isEven={step.isEven}
									ref={(el: HTMLDivElement | null) => {
										stepRefs.current[index] = el;
									}}
									id={`step-${index + 1}`}
									data-visible="false"
								>
									<StepContent isEven={step.isEven}>
										<StepNumber>{step.number}</StepNumber>
										<StepTitle>{step.title}</StepTitle>
										<StepDescription>{step.description}</StepDescription>
										<StepLink href="#contact">상담 신청하기</StepLink>
									</StepContent>
								</StepContainer>
							</StepRow>
						))}
					</StepsWrapper>
				</TimelineContainer>

				<CTAContainer variants={fadeInUp} initial="hidden" animate={controls}>
					<CTAButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						지금 시작하기
					</CTAButton>
				</CTAContainer>
			</SectionInner>
		</SectionContainer>
	);
};

export default SolutionProcess;
