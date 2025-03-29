import React, { useRef, useState } from "react";
import styled from "styled-components";
import { motion, useAnimation, useInView } from "framer-motion";
import MapComponent from "./MapComponent";
import ContactModal from "../Modal/ContactModal";

// 스타일드 컴포넌트
const ContactSection = styled.section`
	padding: 120px 0;
	background-color: #f8f9fa;
	background-image: linear-gradient(to bottom right, rgba(240, 242, 245, 0.8), rgba(248, 249, 250, 0.9));
	color: #333;
	position: relative;
	overflow: hidden;
`;

const ContactInner = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	z-index: 2;
`;

const ContactHeader = styled.div`
	text-align: center;
	margin-bottom: 60px;
`;

const ContactTitle = styled(motion.h2)`
	font-size: 3rem;
	font-weight: 800;
	margin-bottom: 20px;
	color: #1a2a6c;
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
		background: linear-gradient(90deg, #1a2a6c 0%, #b21f1f 100%);
		border-radius: 2px;
	}

	@media (max-width: 768px) {
		font-size: 2.3rem;
	}
`;

const ContactSubtitle = styled(motion.div)`
	font-size: 1.2rem;
	max-width: 600px;
	margin: 25px auto 0;
	line-height: 1.6;
	opacity: 0.9;

	@media (max-width: 768px) {
		font-size: 1rem;
	}
`;

const ContactContent = styled.div`
	display: flex;
	width: 100%;
	gap: 40px;

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

const ContactInfo = styled(motion.div)`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 30px;
`;

const ContactCard = styled(motion.div)`
	background-color: white;
	border-radius: 16px;
	padding: 24px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	display: flex;
	gap: 20px;
	align-items: flex-start;
	transition: transform 0.3s ease, box-shadow 0.3s ease;

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
	}
`;

const CardIcon = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 12px;
	background: linear-gradient(135deg, #1a2a6c 0%, #2a3c7e 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.5rem;
	flex-shrink: 0;
	color: white;
	box-shadow: 0 5px 15px rgba(26, 42, 108, 0.2);
`;

const CardContent = styled.div`
	display: flex;
	flex-direction: column;
`;

const CardTitle = styled.div`
	font-weight: 600;
	font-size: 1.1rem;
	margin-bottom: 8px;
	color: #1a2a6c;
`;

const CardText = styled.div`
	font-size: 0.95rem;
	color: #555;
	line-height: 1.5;
`;

const CTAButton = styled(motion.button)`
	background: linear-gradient(90deg, #1a2a6c 0%, #b21f1f 100%);
	border: none;
	padding: 16px 32px;
	border-radius: 8px;
	font-weight: 600;
	font-size: 1.1rem;
	color: white;
	cursor: pointer;
	margin-top: 30px;
	transition: all 0.3s ease;
	box-shadow: 0 4px 15px rgba(26, 42, 108, 0.3);

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(26, 42, 108, 0.4);
	}
`;

const MapWrapper = styled(motion.div)`
	flex: 1.2;
	height: 450px;
	border-radius: 16px;
	overflow: hidden;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
	border: 5px solid white;

	@media (max-width: 768px) {
		margin-top: 40px;
		height: 350px;
	}
`;

// 배경 장식 요소
const BackgroundDecoration = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	z-index: 1;
`;

const Circle = styled.div`
	width: 500px;
	height: 500px;
	border-radius: 50%;
	background: linear-gradient(135deg, rgba(26, 42, 108, 0.05) 0%, rgba(178, 31, 31, 0.05) 100%);
	position: absolute;

	&:nth-child(1) {
		top: -250px;
		left: -250px;
	}

	&:nth-child(2) {
		bottom: -350px;
		right: -150px;
		width: 600px;
		height: 600px;
	}
`;

const Contact: React.FC = () => {
	const controls = useAnimation();
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
	const [modalOpen, setModalOpen] = useState(false);

	const position: [number, number] = [36.7125, 127.4385];

	React.useEffect(() => {
		if (isInView) {
			controls.start("visible");
		}
	}, [controls, isInView]);

	const handleContactClick = () => {
		setModalOpen(true);
	};

	const itemAnimation = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};

	const leftAnimation = {
		hidden: { opacity: 0, x: -50 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.7, ease: "easeOut" },
		},
	};

	const rightAnimation = {
		hidden: { opacity: 0, x: 50 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.7, ease: "easeOut" },
		},
	};

	return (
		<ContactSection ref={sectionRef}>
			<BackgroundDecoration>
				<Circle />
				<Circle />
			</BackgroundDecoration>

			<ContactInner>
				<ContactHeader>
					<ContactTitle initial="hidden" animate={controls} variants={itemAnimation}>
						Contact
					</ContactTitle>
					<ContactSubtitle initial="hidden" animate={controls} variants={itemAnimation}>
						제로원에 문의하시면 친절하게 답변해 드리겠습니다.
					</ContactSubtitle>
				</ContactHeader>

				<ContactContent>
					<ContactInfo initial="hidden" animate={controls} variants={leftAnimation}>
						<ContactCard whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
							<CardIcon>📍</CardIcon>
							<CardContent>
								<CardTitle>주소</CardTitle>
								<CardText>충청북도 청주시 청원구 오창읍 양청송대길 10, 308호</CardText>
								<CardText>(주)제로원</CardText>
							</CardContent>
						</ContactCard>

						<ContactCard whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
							<CardIcon>📠</CardIcon>
							<CardContent>
								<CardTitle>Fax</CardTitle>
								<CardText>0303-3441-0101</CardText>
							</CardContent>
						</ContactCard>

						<ContactCard whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
							<CardIcon>📧</CardIcon>
							<CardContent>
								<CardTitle>이메일</CardTitle>
								<CardText>zerone.khk@gmail.com</CardText>
							</CardContent>
						</ContactCard>

						<CTAButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} onClick={handleContactClick}>
							지금 문의하기
						</CTAButton>
					</ContactInfo>

					<MapWrapper initial="hidden" animate={controls} variants={rightAnimation}>
						<MapComponent position={position} popupText="제로원 <br /> 충청북도 청주시 청원구 오창읍 양청송대길 10, 308호" />
					</MapWrapper>
				</ContactContent>
			</ContactInner>

			<ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
		</ContactSection>
	);
};

export default Contact;
