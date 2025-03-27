import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import DambiIcon from "../../assets/icons/DambiIcon";
import SeulmoIcon from "../../assets/icons/SeulmoIcon";
import dambiImage from "../../assets/images/products/dambi.jpg";
import sslmoImage from "../../assets/images/products/sslmo.jpg";

// 스타일드 컴포넌트
const SectionContainer = styled.section`
	padding: 5rem 0;
	background-color: #f9fcf9;
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
	grid-template-columns: repeat(2, 1fr);
	gap: 3rem;
	margin-bottom: 4rem;

	@media (max-width: 992px) {
		grid-template-columns: 1fr;
		gap: 2rem;
	}
`;

const ProductCard = styled(motion.div)`
	background-color: white;
	border-radius: 1rem;
	overflow: hidden;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const ProductImageContainer = styled.div`
	position: relative;
	height: 220px;
	overflow: hidden;
`;

const ProductImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform 0.5s ease;

	${ProductCard}:hover & {
		transform: scale(1.05);
	}
`;

const ImageOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6));
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: 1.5rem;
`;

const ProductName = styled.h3`
	color: white;
	font-size: 2rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const ProductSubtitle = styled.span`
	color: rgba(255, 255, 255, 0.9);
	font-size: 1rem;
	font-weight: 500;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const ProductContent = styled.div`
	padding: 2rem;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
`;

const IconContainer = styled.div`
	width: 50px;
	height: 50px;
	background-color: #0d5932;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 1.5rem;
	box-shadow: 0 4px 10px rgba(13, 89, 50, 0.2);
`;

const StyledIcon = styled.div`
	width: 24px;
	height: 24px;
	color: white;

	& > svg {
		width: 100%;
		height: 100%;
	}
`;

const ProductDescription = styled.p`
	font-size: 1rem;
	color: #555;
	margin-bottom: 1.5rem;
	line-height: 1.6;
`;

const FeaturesTitle = styled.h4`
	font-size: 1.1rem;
	font-weight: 600;
	color: #333;
	margin-bottom: 1rem;
`;

const FeaturesList = styled.ul`
	list-style: none;
	padding: 0;
	margin-bottom: 1.5rem;
	flex-grow: 1;
`;

const FeatureItem = styled(motion.li)`
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
	margin-top: auto;

	&::after {
		content: "→";
		margin-left: 0.5rem;
		transition: transform 0.2s ease;
	}

	&:hover::after {
		transform: translateX(5px);
	}
`;

const SynergySection = styled(motion.div)`
	text-align: center;
	margin: 4rem 0;
	padding: 2rem;
	background-color: rgba(13, 89, 50, 0.05);
	border-radius: 1rem;
`;

const SynergyTitle = styled.h3`
	font-size: 1.8rem;
	color: #0d5932;
	margin-bottom: 1.5rem;
`;

const SynergyText = styled.p`
	font-size: 1.1rem;
	color: #444;
	max-width: 800px;
	margin: 0 auto 2rem;
	line-height: 1.6;
`;

const CTAButton = styled(motion.button)`
	background-color: #0d5932;
	color: white;
	border: none;
	padding: 1rem 2rem;
	font-size: 1.1rem;
	font-weight: 600;
	border-radius: 0.5rem;
	cursor: pointer;
	box-shadow: 0 4px 10px rgba(13, 89, 50, 0.2);
	transition: transform 0.2s, box-shadow 0.2s;

	&:hover {
		background-color: #0a4527;
		transform: translateY(-2px);
		box-shadow: 0 6px 15px rgba(13, 89, 50, 0.3);
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

const fadeInRight: Variants = {
	hidden: { opacity: 0, x: -50 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.6,
			ease: "easeOut",
		},
	},
};

const fadeInLeft: Variants = {
	hidden: { opacity: 0, x: 50 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.6,
			ease: "easeOut",
		},
	},
};

const CoreTechnology: React.FC = () => {
	const controls = useAnimation();
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

	useEffect(() => {
		if (isInView) {
			controls.start("visible");
		}
	}, [controls, isInView]);

	return (
		<SectionContainer ref={sectionRef}>
			<SectionInner>
				<SectionHeader variants={fadeInUp} initial="hidden" animate={controls}>
					<SectionTitle>핵심 기술 솔루션</SectionTitle>
					<SectionDescription>
						제로원의 혁신적인 기술력으로 탄생한 식품 폐기물 처리 솔루션 '담비'와 '쓸모'를 소개합니다. 현장에서 발생하는 유기성 폐기물을 효율적으로 처리하고 자원화하는 제로원의 솔루션을 경험하세요.
					</SectionDescription>
				</SectionHeader>

				<CardsContainer>
					<ProductCard variants={fadeInRight} initial="hidden" animate={controls} transition={{ delay: 0.2 }}>
						<ProductImageContainer>
							<ProductImage src={dambiImage} alt="담비 - 고속 감량기" />
							<ImageOverlay>
								<ProductName>담비</ProductName>
								<ProductSubtitle>고속 감량기</ProductSubtitle>
							</ImageOverlay>
						</ProductImageContainer>

						<ProductContent>
							<IconContainer>
								<StyledIcon>
									<DambiIcon />
								</StyledIcon>
							</IconContainer>

							<ProductDescription>
								'담비'는 식품 폐기물 발생 현장에서 직접 처리할 수 있는 고속 감량 시스템입니다. 특허받은 기술을 바탕으로 수분 증발 방식을 통해 폐기물의 부피와 무게를 최대 90%까지 줄이며, 악취와 위생
								문제를 해결합니다.
							</ProductDescription>

							<FeaturesTitle>주요 특징</FeaturesTitle>

							<FeaturesList>
								<FeatureItem variants={fadeInUp} animate={controls} transition={{ delay: 0.4 }}>
									하루 최대 100kg 처리 가능한 고효율 시스템
								</FeatureItem>
								<FeatureItem variants={fadeInUp} animate={controls} transition={{ delay: 0.5 }}>
									특허받은 수분 증발 방식으로 부피 90% 감소
								</FeatureItem>
								<FeatureItem variants={fadeInUp} animate={controls} transition={{ delay: 0.6 }}>
									악취 제거 및 해충 발생 방지 효과
								</FeatureItem>
								<FeatureItem variants={fadeInUp} animate={controls} transition={{ delay: 0.7 }}>
									사용이 간편한 자동화 시스템
								</FeatureItem>
							</FeaturesList>

							<LearnMoreLink href="#dambi" whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
								자세히 알아보기
							</LearnMoreLink>
						</ProductContent>
					</ProductCard>

					<ProductCard variants={fadeInLeft} initial="hidden" animate={controls} transition={{ delay: 0.3 }}>
						<ProductImageContainer>
							<ProductImage src={sslmoImage} alt="쓸모 - 위탁 처리 서비스" />
							<ImageOverlay>
								<ProductName>쓸모</ProductName>
								<ProductSubtitle>위탁 처리 서비스</ProductSubtitle>
							</ImageOverlay>
						</ProductImageContainer>

						<ProductContent>
							<IconContainer>
								<StyledIcon>
									<SeulmoIcon />
								</StyledIcon>
							</IconContainer>

							<ProductDescription>
								'쓸모'는 '담비'를 통해 감량된 폐기물을 수거하여 자원으로 재활용하는 종합 위탁 처리 서비스입니다. 정기적인 수거 일정을 제공하고, 처리된 폐기물을 바이오가스, 비료 등으로 재활용하여 순환
								경제를 실현합니다.
							</ProductDescription>

							<FeaturesTitle>주요 특징</FeaturesTitle>

							<FeaturesList>
								<FeatureItem variants={fadeInUp} animate={controls} transition={{ delay: 0.4 }}>
									정기적인 수거 일정 및 맞춤형 서비스
								</FeatureItem>
								<FeatureItem variants={fadeInUp} animate={controls} transition={{ delay: 0.5 }}>
									실시간 수거 현황 및 처리 과정 모니터링
								</FeatureItem>
								<FeatureItem variants={fadeInUp} animate={controls} transition={{ delay: 0.6 }}>
									감량된 폐기물의 자원화 처리
								</FeatureItem>
								<FeatureItem variants={fadeInUp} animate={controls} transition={{ delay: 0.7 }}>
									환경 규제 준수 및 폐기물 처리 인증서 발급
								</FeatureItem>
							</FeaturesList>

							<LearnMoreLink href="#seulmo" whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
								자세히 알아보기
							</LearnMoreLink>
						</ProductContent>
					</ProductCard>
				</CardsContainer>

				<SynergySection variants={fadeInUp} initial="hidden" animate={controls} transition={{ delay: 0.8 }}>
					<SynergyTitle>시너지 효과</SynergyTitle>
					<SynergyText>
						'담비'와 '쓸모'를 함께 활용하면 식품 폐기물 처리부터 재활용까지 완벽한 순환 체계를 구축할 수 있습니다. 현장에서 즉시 처리하여 운반 비용을 줄이고, 처리된 폐기물은 새로운 자원으로 재탄생하여
						경제적 가치를 창출하는 동시에 환경 보호에 기여합니다. 제로원의 토탈 솔루션으로 폐기물 발생부터 최종 처리까지 효율적이고 지속가능한 방식으로 관리하세요.
					</SynergyText>

					<CTAButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						솔루션 상담 받기
					</CTAButton>
				</SynergySection>
			</SectionInner>
		</SectionContainer>
	);
};

export default CoreTechnology;
