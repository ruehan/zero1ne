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

// 프로세스 데이터 - 홀수는 왼쪽, 짝수는 오른쪽에 배치
const processSteps = [
	{
		number: 1,
		title: "문의 및 상담",
		description: "전화, 이메일 또는 웹사이트를 통해 문의해주시면 전문 컨설턴트가 초기 상담을 진행합니다. 고객의 요구사항과 현재 폐기물 관리 상황을 파악합니다.",
		isEven: false, // 왼쪽에 배치
	},
	{
		number: 2,
		title: "현장 분석",
		description: "전문가 팀이 현장을 방문하여 폐기물 발생량, 처리 현황, 시설 환경 등을 분석합니다. 정확한 데이터를 수집하여 최적의 솔루션을 설계하기 위한 기초 작업을 수행합니다.",
		isEven: true, // 오른쪽에 배치
	},
	{
		number: 3,
		title: "맞춤형 솔루션 제안",
		description: "수집된 데이터를 바탕으로 고객의 상황에 맞는 최적의 폐기물 처리 솔루션을 설계하고 제안합니다. 담비와 쓸모 서비스 중 적합한 조합을 구성하여 효율적인 순환 경제 시스템을 구축합니다.",
		isEven: false, // 왼쪽에 배치
	},
	{
		number: 4,
		title: "도입 및 사후관리",
		description: "합의된 솔루션을 설치 및 도입한 후, 지속적인 모니터링과 사후관리를 제공합니다. 정기적인 성과 보고서를 통해 솔루션의 효과를 확인하고, 필요시 최적화를 진행합니다.",
		isEven: true, // 오른쪽에 배치
	},
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

// 솔루션 프로세스 컴포넌트
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
