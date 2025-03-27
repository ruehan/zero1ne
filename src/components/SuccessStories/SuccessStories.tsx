import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation, Variants, useInView } from "framer-motion";
import { useRef } from "react";

// 스타일드 컴포넌트
const SectionContainer = styled.section`
	padding: 100px 0;
	background-color: #f9f9f9;
	overflow: hidden;
`;

const SectionInner = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 20px;
`;

const SectionHeader = styled.div`
	text-align: center;
	margin-bottom: 60px;
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

const StoriesGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 30px;

	@media (max-width: 991px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

const StoryCard = styled(motion.div)`
	background-color: white;
	border-radius: 12px;
	overflow: hidden;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
	border: 1px solid rgba(0, 0, 0, 0.05);
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	height: 100%;
	display: flex;
	flex-direction: column;

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
	}
`;

const CardHeader = styled.div`
	padding: 25px 25px 15px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.05);
	display: flex;
	align-items: center;
`;

const LogoContainer = styled.div`
	width: 60px;
	height: 60px;
	background-color: #f5f5f5;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 15px;
	overflow: hidden;
`;

const Logo = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	color: #0d5932;
	font-size: 1.5rem;
`;

const CompanyInfo = styled.div`
	flex: 1;
`;

const CompanyName = styled.h3`
	font-size: 1.3rem;
	font-weight: 700;
	color: #222;
	margin: 0 0 5px 0;
`;

const CompanyType = styled.span`
	font-size: 0.85rem;
	color: #777;
`;

const CardContent = styled.div`
	padding: 20px 25px;
	flex: 1;
	display: flex;
	flex-direction: column;
`;

const ResultText = styled.p`
	font-size: 1rem;
	line-height: 1.6;
	color: #444;
	margin-bottom: 20px;
	flex: 1;
`;

const MetricsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 10px;
`;

const Metric = styled.div`
	text-align: center;
	background-color: #f8f8f8;
	padding: 12px 10px;
	border-radius: 8px;
`;

const MetricValue = styled.div`
	font-size: 1.5rem;
	font-weight: 700;
	color: #0d5932;
	margin-bottom: 5px;
`;

const MetricLabel = styled.div`
	font-size: 0.8rem;
	color: #555;
`;

const TestimonialContainer = styled.div`
	margin-top: 20px;
	padding-top: 15px;
	border-top: 1px dashed rgba(0, 0, 0, 0.1);
`;

const Testimonial = styled.blockquote`
	font-size: 0.9rem;
	font-style: italic;
	color: #555;
	line-height: 1.5;
	position: relative;
	padding-left: 20px;
	margin: 0;

	&::before {
		content: '"';
		position: absolute;
		left: 0;
		top: 0;
		font-size: 1.5rem;
		color: #0d5932;
	}
`;

// 애니메이션 설정
const fadeInUp: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: "easeOut" },
	},
};

const cardAnimations: Variants[] = [
	{
		hidden: { opacity: 0, x: -50 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
		},
	},
	{
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
		},
	},
	{
		hidden: { opacity: 0, x: 50 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.6, ease: "easeOut", delay: 0.6 },
		},
	},
];

// 성공 사례 데이터
const successStories = [
	{
		id: 1,
		companyName: "대형 식품 제조업체 A",
		companyType: "식품 제조 산업",
		logo: "A",
		result: "식품 폐기물 처리 비용 감소와 함께 친환경 이미지 구축에 성공했습니다. '담비' 도입으로 폐기물 부피가 크게 감소하고 자체 처리 효율이 향상되었습니다.",
		metrics: [
			{ value: "72%", label: "폐기물 부피 감소" },
			{ value: "45%", label: "처리 비용 절감" },
			{ value: "30%", label: "CO2 배출 감소" },
			{ value: "90%", label: "악취 제거율" },
		],
		testimonial: "제로원 솔루션 도입 후 환경 규제 대응이 수월해졌고, ESG 지표 개선에도 큰 도움이 되었습니다.",
	},
	{
		id: 2,
		companyName: "종합 물류 기업 B",
		companyType: "물류 및 유통",
		logo: "B",
		result: "다수의 물류 센터에서 발생하는 포장 폐기물과 식품 폐기물을 효율적으로 관리하게 되었습니다. '쓸모' 서비스를 통한 일괄 처리로 관리 효율성이 크게 향상되었습니다.",
		metrics: [
			{ value: "60%", label: "관리 시간 절감" },
			{ value: "85%", label: "자원 재활용률" },
			{ value: "38%", label: "처리 비용 절감" },
			{ value: "99%", label: "규정 준수율" },
		],
		testimonial: "여러 지점의 폐기물 처리를 한번에 관리할 수 있게 되어 업무 효율성이 크게 개선되었습니다.",
	},
	{
		id: 3,
		companyName: "지방자치단체 C",
		companyType: "공공 기관",
		logo: "C",
		result: "공공 급식 시설과 주민 센터 등에서 발생하는 식품 폐기물 관리 체계를 혁신적으로 개선했습니다. 주민들의 환경 만족도가 크게 상승했습니다.",
		metrics: [
			{ value: "50%", label: "예산 절감" },
			{ value: "65%", label: "처리 시간 단축" },
			{ value: "95%", label: "친환경 처리율" },
			{ value: "20%", label: "민원 감소" },
		],
		testimonial: "제로원 솔루션은 우리 지자체의 탄소중립 목표 달성에 실질적으로 기여하고 있습니다.",
	},
];

// 성공 사례 컴포넌트
const SuccessStories: React.FC = () => {
	const controls = useAnimation();
	const headerRef = useRef(null);
	const storiesRef = useRef(null);
	const isHeaderInView = useInView(headerRef, { once: false, amount: 0.7 });
	const areStoriesInView = useInView(storiesRef, { once: false, amount: 0.2 });

	useEffect(() => {
		if (isHeaderInView) {
			controls.start("visible");
		}
	}, [controls, isHeaderInView]);

	return (
		<SectionContainer>
			<SectionInner>
				<SectionHeader ref={headerRef}>
					<SectionTitle variants={fadeInUp} initial="hidden" animate={controls}>
						도입 성공 사례
					</SectionTitle>
					<SectionDescription variants={fadeInUp} initial="hidden" animate={controls} transition={{ delay: 0.1 }}>
						제로원의 폐기물 순환 경제 솔루션은 다양한 산업 분야에서 실질적인 성과를 창출하고 있습니다. 효율적인 폐기물 관리를 통해 비용 절감과 환경 보호를 동시에 달성한 기업과 기관들의 사례를
						확인하세요.
					</SectionDescription>
				</SectionHeader>

				<StoriesGrid>
					{successStories.map((story, index) => (
						<StoryCard key={story.id} variants={cardAnimations[index]} initial="hidden" animate={controls}>
							<CardHeader>
								<LogoContainer>
									<Logo>{story.logo}</Logo>
								</LogoContainer>
								<CompanyInfo>
									<CompanyName>{story.companyName}</CompanyName>
									<CompanyType>{story.companyType}</CompanyType>
								</CompanyInfo>
							</CardHeader>

							<CardContent>
								<ResultText>{story.result}</ResultText>

								<MetricsContainer>
									{story.metrics.map((metric, idx) => (
										<Metric key={idx}>
											<MetricValue>{metric.value}</MetricValue>
											<MetricLabel>{metric.label}</MetricLabel>
										</Metric>
									))}
								</MetricsContainer>

								<TestimonialContainer>
									<Testimonial>{story.testimonial}</Testimonial>
								</TestimonialContainer>
							</CardContent>
						</StoryCard>
					))}
				</StoriesGrid>
			</SectionInner>
		</SectionContainer>
	);
};

export default SuccessStories;
