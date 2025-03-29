import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import solution1 from "../../assets/images/solution1.jpg";
import solution2 from "../../assets/images/solution2.jpeg";
import solution3 from "../../assets/images/solution3.jpeg";
import ContactModal from "../Modal/ContactModal";

// 솔루션 데이터
const solutionsData = [
	{
		id: "waste-reduction",
		title: "유기성 폐기물 발생지 직접 감량",
		description: "식품 폐기물이 발생하는 현장에서 즉시 처리하여 부피와 중량을 최대 90%까지 줄이는 혁신적인 시스템입니다.",
		image: solution1,
		benefits: ["폐기물 발생지에서 즉시 처리", "악취 및 해충 문제 해결", "환경 오염 최소화"],
	},
	{
		id: "byproduct-collection",
		title: "폐기물 수집 및 운반 서비스",
		description: "폐기물을 효율적으로 수집하고 운반하는 통합 물류 서비스를 제공합니다.",
		image: solution2,
		benefits: ["수거 일정 최적화 시스템", "전용 운반 차량 및 장비 제공", "실시간 수거량 모니터링", "투명한 처리 과정 추적"],
	},
	{
		id: "resource-recycling",
		title: "유기성 폐기물의 자원화를 통한 재활용",
		description: "수집된 유기성 폐기물을 에너지원 및 비료 등 가치 있는 자원으로 변환하는 순환경제 솔루션입니다.",
		image: solution3,
		benefits: ["바이오가스 생산 및 에너지화", "고품질 퇴비 및 비료 생산", "탄소 배출권 확보 지원", "자원 재활용 인증 획득"],
	},
];

// 스타일드 컴포넌트
const SectionContainer = styled.section`
	padding: 5rem 0;
	background-color: #f8faf8;
`;

const SectionInner = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 2rem;
`;

const SectionHeader = styled(motion.div)`
	text-align: center;
	margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
	font-size: 2.5rem;
	color: #0d5932;
	margin-bottom: 1rem;

	@media (max-width: 768px) {
		font-size: 2rem;
	}
`;

const SectionDescription = styled.p`
	font-size: 1.1rem;
	max-width: 700px;
	margin: 0 auto;
	color: #444;
	line-height: 1.6;

	@media (max-width: 768px) {
		font-size: 1rem;
	}
`;

const CardsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 2rem;
	margin-bottom: 4rem;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

const SolutionCard = styled(motion.div)`
	background-color: white;
	border-radius: 1rem;
	overflow: hidden;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
	transition: transform 0.3s ease, box-shadow 0.3s ease;
`;

const CardImage = styled.div<{ image: string }>`
	height: 200px;
	background-image: url(${(props) => props.image});
	background-size: cover;
	background-position: center;
	position: relative;
`;

const CardContent = styled.div`
	padding: 2rem;
`;

const CardTitle = styled.h3`
	font-size: 1.5rem;
	margin-bottom: 1rem;
	color: #0d5932;
`;

const CardDescription = styled.p`
	font-size: 1rem;
	color: #555;
	margin-bottom: 1.5rem;
	line-height: 1.5;
`;

const BenefitsList = styled.ul`
	list-style: none;
	padding: 0;
	margin-bottom: 1.5rem;
`;

const BenefitItem = styled(motion.li)`
	display: flex;
	align-items: flex-start;
	margin-bottom: 0.75rem;

	&::before {
		content: "✓";
		color: #0d5932;
		margin-right: 0.75rem;
		font-weight: bold;
	}
`;

const LearnMoreLink = styled(motion.a)`
	display: inline-flex;
	align-items: center;
	color: #0d5932;
	font-weight: 600;
	text-decoration: none;
	margin-top: 0.5rem;

	&::after {
		content: "→";
		margin-left: 0.5rem;
		transition: transform 0.2s ease;
	}

	&:hover::after {
		transform: translateX(5px);
	}
`;

const CTAContainer = styled(motion.div)`
	text-align: center;
	margin-top: 3rem;
`;

const CTAButton = styled(motion.button)`
	background-color: #2563eb;
	color: white;
	border: none;
	padding: 1rem 2rem;
	font-size: 1.1rem;
	font-weight: 600;
	border-radius: 0.5rem;
	cursor: pointer;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
	transition: transform 0.2s, box-shadow 0.2s;

	&:hover {
		background-color: #1d4ed8;
		transform: translateY(-2px);
		box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
	}
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

const cardHover = {
	rest: { scale: 1 },
	hover: {
		scale: 1.03,
		boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
		transition: {
			duration: 0.3,
			ease: "easeOut",
		},
	},
};

const Solution: React.FC = () => {
	const controls = useAnimation();
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		if (isInView) {
			controls.start("visible");
		}
	}, [controls, isInView]);

	return (
		<>
			<SectionContainer ref={sectionRef}>
				<SectionInner>
					<SectionHeader variants={fadeInUp} initial="hidden" animate={controls}>
						<SectionTitle>ZERO ONE SOLUTION</SectionTitle>
						<SectionDescription>유기성 폐기물을 자원화하기 위한 제로원의 솔루션</SectionDescription>
					</SectionHeader>

					<CardsContainer>
						{solutionsData.map((solution, index) => {
							return (
								<SolutionCard
									key={solution.id}
									variants={{
										...fadeInUp,
										rest: cardHover.rest,
										hover: cardHover.hover,
									}}
									initial="hidden"
									animate={controls}
									transition={{ delay: index * 0.2 }}
									whileHover="hover"
								>
									<CardImage image={solution.image}></CardImage>

									<CardContent>
										<CardTitle>{solution.title}</CardTitle>
										<CardDescription>{solution.description}</CardDescription>

										<BenefitsList>
											{solution.benefits.map((benefit, i) => (
												<BenefitItem key={i} variants={fadeInUp} initial="hidden" animate={controls} transition={{ delay: 0.3 + index * 0.1 + i * 0.05 }}>
													{benefit}
												</BenefitItem>
											))}
										</BenefitsList>

										<LearnMoreLink href={`#${solution.id}`} whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
											자세히 알아보기
										</LearnMoreLink>
									</CardContent>
								</SolutionCard>
							);
						})}
					</CardsContainer>

					<CTAContainer variants={fadeInUp} initial="hidden" animate={controls} transition={{ delay: 0.6 }}>
						<CTAButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setModalOpen(true)}>
							맞춤형 솔루션 문의하기
						</CTAButton>
					</CTAContainer>
				</SectionInner>
			</SectionContainer>
			<ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
		</>
	);
};

export default Solution;
