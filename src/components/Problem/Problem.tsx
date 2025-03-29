import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, useAnimation, useInView, Variants } from "framer-motion";

// 스타일드 컴포넌트
const ProblemSection = styled.section`
	padding: 120px 0;
	background-color: white;
	color: #333;
	position: relative;
	overflow: hidden;
	min-height: 120vh; /* 스크롤을 위한 공간 확보 */
`;

const SectionInner = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 2rem;
	position: relative;
	z-index: 2;
`;

const SectionTag = styled(motion.div)`
	display: inline-block;
	background-color: rgba(139, 0, 0, 0.1);
	color: #8b0000;
	font-weight: 600;
	font-size: 0.9rem;
	padding: 6px 12px;
	border-radius: 20px;
	margin-bottom: 15px;
`;

const SectionHeader = styled.div`
	text-align: center;
	margin-bottom: 80px;
`;

const SectionTitle = styled(motion.h2)`
	font-size: 3rem;
	font-weight: 800;
	margin-bottom: 20px;
	color: #333;

	@media (max-width: 768px) {
		font-size: 2.3rem;
	}
`;

const SectionSubtitle = styled(motion.div)`
	font-size: 1.2rem;
	max-width: 700px;
	margin: 0 auto;
	line-height: 1.6;
	opacity: 0.8;
	color: #555;

	@media (max-width: 768px) {
		font-size: 1rem;
	}
`;

const ProcessContainer = styled.div`
	position: relative;
	height: 900px; /* 컨테이너 높이 증가 */
`;

const CardWrapper = styled.div`
	position: sticky;
	top: 150px;
	height: 650px;
	margin-top: 80px;
`;

const ProcessCard = styled(motion.div)`
	background-color: white;
	border-radius: 20px;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
	padding: 40px 30px;
	border: 1px solid rgba(0, 0, 0, 0.05);
	position: relative;
	width: 100%;
	height: 100%;

	&:hover {
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
	}
`;

// 프로세스 스타일 - 문제 버전
const ProblemProcessContainer = styled.div`
	margin-top: 40px;
`;

const ProcessRow = styled(motion.div)`
	display: flex;
	justify-content: space-between;
	position: relative;
	width: 100%;
	margin-bottom: 50px;
`;

const FlowConnector = styled(motion.div)`
	position: absolute;
	height: 2px;
	background-color: #ddd;
	top: 50%;
	left: 0;
	right: 0;
	z-index: 0;

	@media (max-width: 768px) {
		display: none;
	}
`;

const ProcessDot = styled(motion.div)`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background-color: #bbb;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 1;

	@media (max-width: 768px) {
		display: none;
	}
`;

const ProcessStepBox = styled(motion.div)<{ active?: boolean; isHighlighted?: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 14.28%;
	position: relative;
	z-index: 2;
	padding: 0 5px;

	@media (max-width: 768px) {
		width: calc(100% / 3);
		padding: 0 5px;
	}
`;

const StepBox = styled(motion.div)<{ active?: boolean; isHighlighted?: boolean }>`
	width: 90px;
	height: 90px;
	background-color: ${(props) => (props.isHighlighted ? "#b22222" : props.active ? "#e74c3c" : "#f8e9e9")};
	border-radius: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 10px;
	box-shadow: ${(props) => (props.isHighlighted ? "0 5px 15px rgba(178, 34, 34, 0.3)" : props.active ? "0 5px 15px rgba(231, 76, 60, 0.2)" : "0 2px 8px rgba(0, 0, 0, 0.05)")};
	transition: all 0.3s ease;
	color: ${(props) => (props.isHighlighted || props.active ? "white" : "#666")};

	@media (max-width: 768px) {
		width: 70px;
		height: 70px;
	}
`;

const StepIcon = styled.div`
	font-size: 32px;

	@media (max-width: 768px) {
		font-size: 24px;
	}
`;

const StepText = styled(motion.div)<{ active?: boolean; isHighlighted?: boolean }>`
	font-weight: ${(props) => (props.isHighlighted || props.active ? "700" : "500")};
	font-size: 1rem;
	text-align: center;
	color: ${(props) => (props.isHighlighted ? "#b22222" : props.active ? "#e74c3c" : "#666")};

	@media (max-width: 768px) {
		font-size: 0.9rem;
	}
`;

// 타임라인 스타일
const TimelineSection = styled(motion.div)`
	display: flex;
	justify-content: center;
	gap: 30px;
	margin-top: 30px;
	max-width: 600px;
	margin: 50px auto 0;

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

const TimePeriod = styled(motion.div)`
	background-color: #f8f8f8;
	border-radius: 15px;
	padding: 20px;
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid #eee;
`;

const TimeLabel = styled.div`
	font-weight: 600;
	font-size: 1rem;
	margin-bottom: 5px;
	color: #666;
`;

const TimeDuration = styled(motion.div)`
	font-weight: 700;
	font-size: 1.8rem;
	color: ${(props) => props.color || "#666"};
	margin-top: 10px;
`;

// 스크롤 트리거 영역
const ScrollTrigger = styled.div`
	height: 200px;
	width: 100%;
	position: absolute;
	bottom: 200px;
	left: 0;
	opacity: 0;
`;

// 애니메이션 변수
const fadeInUp: Variants = {
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

const fadeInLeft: Variants = {
	hidden: { opacity: 0, x: 30 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.6,
			ease: "easeOut",
		},
	},
};

const processSteps = [
	{ name: "발생", icon: "📦", delay: 0 },
	{ name: "야적", icon: "📚", delay: 0.1 },
	{ name: "수집", icon: "🚚", delay: 0.2 },
	{ name: "운송", icon: "🚛", delay: 0.3 },
	{ name: "선별", icon: "🔍", delay: 0.4 },
	{ name: "건조", icon: "🔥", delay: 0.5, isHighlighted: true },
	{ name: "재활용", icon: "♻️", delay: 0.6 },
];

const Problem: React.FC = () => {
	const controls = useAnimation();
	const solutionControls = useAnimation();
	const sectionRef = useRef<HTMLElement>(null);
	const solutionTriggerRef = useRef<HTMLDivElement>(null);

	const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
	const isSolutionTriggerVisible = useInView(solutionTriggerRef, { once: false, amount: 0.8 });

	const [showSolution, setShowSolution] = useState(false);

	useEffect(() => {
		if (isInView) {
			controls.start("visible");
		}
	}, [controls, isInView]);

	useEffect(() => {
		if (isSolutionTriggerVisible) {
			setShowSolution(true);
			solutionControls.start("visible");
		} else {
			setShowSolution(false);
			solutionControls.start("hidden");
		}
	}, [isSolutionTriggerVisible, solutionControls]);

	return (
		<ProblemSection ref={sectionRef}>
			<SectionInner>
				<SectionHeader>
					<SectionTag variants={fadeInUp} initial="hidden" animate={controls}>
						PROBLEM
					</SectionTag>
					<SectionTitle variants={fadeInUp} initial="hidden" animate={controls}>
						건조 공정의 전환, 초기 단계로
					</SectionTitle>
					<SectionSubtitle variants={fadeInUp} initial="hidden" animate={controls} transition={{ delay: 0.1 }}>
						기존 위탁처리 서비스 밸류체인
					</SectionSubtitle>
				</SectionHeader>

				<ProcessContainer>
					<CardWrapper>
						<ProcessCard>
							<ProblemProcessContainer>
								<ProcessRow>
									<FlowConnector />

									{processSteps.map((step, index) => {
										const position = (index / (processSteps.length - 1)) * 100;
										// 스텝 위치 애니메이션
										const shouldHide = showSolution && (step.name === "야적" || step.name === "수집");
										const isChanged = showSolution && step.name === "건조";
										const initialX = "0%";

										// 솔루션 모드에서 건조는 두 번째 위치로 이동
										const animateX = isChanged ? "-14.28%" : "0%";

										// 건조 위치 계산 (발생 다음)
										const newOrder = (() => {
											if (step.name === "발생") return 0;
											if (step.name === "건조") return 1;
											if (step.name === "선별") return 2;
											if (step.name === "운송") return 3;
											if (step.name === "재활용") return 4;
											return index; // 기본값
										})();

										return (
											<ProcessStepBox
												key={step.name}
												animate={{
													x: animateX,
													zIndex: step.name === "건조" ? 10 : 2,
													opacity: shouldHide ? 0 : 1,
													scale: shouldHide ? 0.5 : 1,
												}}
												initial={{ x: initialX, opacity: 1, scale: 1 }}
												transition={{ duration: 0.8, ease: "easeInOut" }}
												style={{
													order: showSolution ? newOrder : index,
													display: shouldHide ? "none" : "flex",
												}}
											>
												<StepBox
													isHighlighted={step.isHighlighted}
													animate={{
														backgroundColor: showSolution && step.name === "건조" ? "#4CAF50" : step.isHighlighted ? "#b22222" : "#f8e9e9",
														boxShadow:
															showSolution && step.name === "건조" ? "0 5px 15px rgba(76, 175, 80, 0.3)" : step.isHighlighted ? "0 5px 15px rgba(178, 34, 34, 0.3)" : "0 2px 8px rgba(0, 0, 0, 0.05)",
													}}
													transition={{ duration: 0.8 }}
												>
													<StepIcon>{step.icon}</StepIcon>
												</StepBox>
												<StepText
													isHighlighted={step.isHighlighted}
													animate={{
														color: showSolution && step.name === "건조" ? "#4CAF50" : step.isHighlighted ? "#b22222" : "#666",
													}}
													transition={{ duration: 0.8 }}
												>
													{step.name}
												</StepText>

												{index > 0 && index < processSteps.length - 1 && <ProcessDot style={{ left: `${position}%`, opacity: shouldHide ? 0 : 1 }} />}
											</ProcessStepBox>
										);
									})}
								</ProcessRow>

								<TimelineSection>
									<TimePeriod variants={fadeInLeft} initial="hidden" animate={controls} transition={{ delay: 0.8 }}>
										<TimeLabel>부패시간</TimeLabel>
										<TimeDuration color={showSolution ? "#2ecc71" : "#e74c3c"} animate={{ color: showSolution ? "#2ecc71" : "#e74c3c" }} transition={{ duration: 0.8 }}>
											{showSolution ? "30분 이내" : "2시간~2일"}
										</TimeDuration>
									</TimePeriod>

									<TimePeriod variants={fadeInLeft} initial="hidden" animate={controls} transition={{ delay: 1 }}>
										<TimeLabel>건조시간</TimeLabel>
										<TimeDuration color={showSolution ? "#2ecc71" : "#e74c3c"} animate={{ color: showSolution ? "#2ecc71" : "#e74c3c" }} transition={{ duration: 0.8 }}>
											{showSolution ? "1~2일 소요" : "12일 소요"}
										</TimeDuration>
									</TimePeriod>
								</TimelineSection>
							</ProblemProcessContainer>
						</ProcessCard>
					</CardWrapper>

					<ScrollTrigger ref={solutionTriggerRef} />
				</ProcessContainer>
			</SectionInner>
		</ProblemSection>
	);
};

export default Problem;
