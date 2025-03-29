import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import styled from "styled-components";
import ContactModal from "../Modal/ContactModal";
import logoImage from "../../assets/logo.png";

// 스타일드 컴포넌트
const HeaderContainer = styled(motion.header)<{ scrolled: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 100;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 3rem;
	height: 80px;
	transition: all 0.3s ease;
	background: ${({ scrolled }) => (scrolled ? "rgba(255, 255, 255, 0.9)" : "transparent")};
	backdrop-filter: ${({ scrolled }) => (scrolled ? "blur(10px)" : "none")};
	box-shadow: ${({ scrolled }) => (scrolled ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none")};

	@media (max-width: 768px) {
		padding: 0 1.5rem;
		height: 70px;
	}
`;

const LogoContainer = styled(motion.div)`
	display: flex;
	align-items: center;
	cursor: pointer;
`;

const LogoIcon = styled.img<{ scrolled: boolean }>`
	height: 45px;
	width: auto;
	margin-right: 8px;
	filter: ${({ scrolled }) =>
		scrolled ? "brightness(0) saturate(100%) invert(25%) sepia(94%) saturate(526%) hue-rotate(107deg) brightness(95%) contrast(90%)" : "brightness(0) saturate(100%) invert(100%)"};
	transition: filter 0.3s ease;
`;

const NavContainer = styled.nav`
	display: flex;
	align-items: center;

	@media (max-width: 1024px) {
		display: none;
	}
`;

const NavItems = styled.ul`
	display: flex;
	list-style: none;
	margin: 0;
	padding: 0;
`;

const NavItem = styled.li`
	margin: 0 1.2rem;
`;

const NavLink = styled.a<{ isActive?: boolean; scrolled: boolean }>`
	text-decoration: none;
	color: ${(props) => {
		if (props.scrolled) {
			return props.isActive ? "#0d5932" : "#333";
		}
		return props.isActive ? "#ffffff" : "#f0f0f0";
	}};
	font-weight: ${(props) => (props.isActive ? "700" : "500")};
	font-size: 1rem;
	position: relative;
	padding: 0.5rem 0;
	cursor: pointer;
	transition: color 0.2s ease;

	&:hover {
		color: ${(props) => (props.scrolled ? "#0d5932" : "#ffffff")};
	}

	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: ${(props) => (props.scrolled ? "#0d5932" : "#ffffff")};
		transform: scaleX(${(props) => (props.isActive ? 1 : 0)});
		transition: transform 0.3s ease;
		transform-origin: bottom right;
	}

	&:hover::after {
		transform: scaleX(1);
		transform-origin: bottom left;
	}
`;

const ContactButton = styled(motion.button)`
	background-color: #0d5932;
	color: white;
	border: none;
	border-radius: 4px;
	padding: 0.8rem 1.5rem;
	font-size: 0.9rem;
	font-weight: 600;
	cursor: pointer;
	margin-left: 1.5rem;
	box-shadow: 0 4px 10px rgba(13, 89, 50, 0.2);
	transition: all 0.2s ease;

	&:hover {
		background-color: #0a4527;
		transform: translateY(-2px);
		box-shadow: 0 6px 15px rgba(13, 89, 50, 0.3);
	}

	@media (max-width: 1024px) {
		display: none;
	}
`;

const MobileMenuButton = styled.button`
	display: none;
	background: none;
	border: none;
	cursor: pointer;
	padding: 0.5rem;

	@media (max-width: 1024px) {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 30px;
		height: 20px;
	}
`;

const MobileMenuLine = styled.span<{ isOpen?: boolean; scrolled: boolean }>`
	width: 100%;
	height: 2px;
	background-color: ${(props) => (props.scrolled ? "#0d5932" : "#ffffff")};
	transition: all 0.3s ease;

	&:nth-child(1) {
		transform: ${(props) => (props.isOpen ? "rotate(45deg) translate(6px, 6px)" : "none")};
	}

	&:nth-child(2) {
		opacity: ${(props) => (props.isOpen ? 0 : 1)};
	}

	&:nth-child(3) {
		transform: ${(props) => (props.isOpen ? "rotate(-45deg) translate(6px, -6px)" : "none")};
	}
`;

const MobileMenu = styled(motion.div)<{ isOpen: boolean }>`
	display: ${(props) => (props.isOpen ? "flex" : "none")};
	position: fixed;
	top: 70px;
	left: 0;
	width: 100%;
	height: calc(100vh - 70px);
	background-color: white;
	flex-direction: column;
	padding: 2rem;
	z-index: 90;
`;

const MobileNavItems = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`;

const MobileNavItem = styled.li`
	font-size: 1.2rem;
	font-weight: 500;
`;

const MobileNavLink = styled.a<{ isActive?: boolean }>`
	text-decoration: none;
	color: ${(props) => (props.isActive ? "#0d5932" : "#333")};
	font-weight: ${(props) => (props.isActive ? "700" : "500")};
	display: block;
	padding: 0.5rem 0;
	border-bottom: 1px solid #eee;
`;

const MobileContactButton = styled(motion.button)`
	background-color: #0d5932;
	color: white;
	border: none;
	border-radius: 4px;
	padding: 1rem;
	font-size: 1rem;
	font-weight: 600;
	margin-top: 2rem;
	width: 100%;
	cursor: pointer;
`;

const Header: React.FC = () => {
	const [scrolled, setScrolled] = useState(false);
	const [activeNavItem, setActiveNavItem] = useState("소개");
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const controls = useAnimation();

	// 스크롤 이벤트 처리
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		// 초기 애니메이션
		controls.start({
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut",
			},
		});

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [controls]);

	const handleMobileMenuToggle = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	const handleNavItemClick = (item: string) => {
		setActiveNavItem(item);
		setMobileMenuOpen(false);

		// '문의하기' 클릭 시 모달 열기
		if (item === "문의하기") {
			setModalOpen(true);
		}
	};

	const navItems = ["소개", "솔루션", "R&D", "도입사례", "문의하기"];

	return (
		<>
			<HeaderContainer scrolled={scrolled} initial={{ y: -100, opacity: 0 }} animate={controls}>
				<LogoContainer whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
					<LogoIcon src={logoImage} scrolled={scrolled} />
				</LogoContainer>

				<NavContainer>
					<NavItems>
						{navItems.map((item) => (
							<NavItem key={item}>
								<NavLink href="#" isActive={activeNavItem === item} scrolled={scrolled} onClick={() => handleNavItemClick(item)}>
									{item}
								</NavLink>
							</NavItem>
						))}
					</NavItems>
				</NavContainer>

				<ContactButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setModalOpen(true)}>
					솔루션 도입 문의
				</ContactButton>

				<MobileMenuButton onClick={handleMobileMenuToggle}>
					<MobileMenuLine isOpen={mobileMenuOpen} scrolled={scrolled} />
					<MobileMenuLine isOpen={mobileMenuOpen} scrolled={scrolled} />
					<MobileMenuLine isOpen={mobileMenuOpen} scrolled={scrolled} />
				</MobileMenuButton>
			</HeaderContainer>

			<MobileMenu isOpen={mobileMenuOpen} initial={{ opacity: 0, y: -20 }} animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : -20 }} transition={{ duration: 0.3 }}>
				<MobileNavItems>
					{navItems.map((item) => (
						<MobileNavItem key={item}>
							<MobileNavLink href="#" isActive={activeNavItem === item} onClick={() => handleNavItemClick(item)}>
								{item}
							</MobileNavLink>
						</MobileNavItem>
					))}
				</MobileNavItems>

				<MobileContactButton
					whileHover={{ scale: 1.03 }}
					whileTap={{ scale: 0.97 }}
					onClick={() => {
						setModalOpen(true);
						setMobileMenuOpen(false);
					}}
				>
					솔루션 도입 문의
				</MobileContactButton>
			</MobileMenu>

			<ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
		</>
	);
};

export default Header;
