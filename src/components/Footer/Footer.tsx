import React from "react";
import styled from "styled-components";
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon } from "../../assets/icons/SocialIcons";
import { MapIcon, PhoneIcon, EmailIcon, ClockIcon } from "../../assets/icons/ContactIcons";

// 스타일드 컴포넌트
const FooterContainer = styled.footer`
	width: 100%;
	background-color: #0a2640;
	color: #fff;
	padding: 80px 0 40px;
`;

const FooterInner = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 2rem;
`;

const FooterGrid = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr 1.5fr;
	gap: 60px;
	margin-bottom: 60px;

	@media (max-width: 992px) {
		grid-template-columns: 1fr 1fr;
		gap: 40px;
	}

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		gap: 50px;
	}
`;

const FooterColumn = styled.div`
	display: flex;
	flex-direction: column;
`;

const Logo = styled.div`
	margin-bottom: 24px;

	img {
		height: 40px;
		width: auto;
	}
`;

const CompanyDescription = styled.p`
	font-size: 1rem;
	line-height: 1.7;
	color: rgba(255, 255, 255, 0.8);
	margin-bottom: 24px;
	max-width: 400px;
`;

const ColumnTitle = styled.h4`
	font-size: 1.2rem;
	font-weight: 600;
	margin-bottom: 24px;
	color: #fff;
`;

const LinksList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`;

const LinkItem = styled.li`
	margin-bottom: 12px;
`;

const FooterLink = styled.a`
	color: rgba(255, 255, 255, 0.8);
	text-decoration: none;
	transition: color 0.2s ease;
	font-size: 0.95rem;

	&:hover {
		color: #fff;
	}
`;

const ContactInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const ContactItem = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 12px;
	font-size: 0.95rem;
	color: rgba(255, 255, 255, 0.8);
`;

const IconWrapper = styled.div`
	font-size: 1.2rem;
	color: rgba(255, 255, 255, 0.9);
	flex-shrink: 0;
`;

const SocialIcons = styled.div`
	display: flex;
	gap: 16px;
	margin-top: 24px;
`;

const SocialIcon = styled.a`
	width: 36px;
	height: 36px;
	border-radius: 50%;
	background-color: rgba(255, 255, 255, 0.1);
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}
`;

const Divider = styled.div`
	height: 1px;
	background-color: rgba(255, 255, 255, 0.1);
	margin-bottom: 30px;
`;

const Copyright = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: rgba(255, 255, 255, 0.6);
	font-size: 0.85rem;

	@media (max-width: 768px) {
		flex-direction: column;
		gap: 16px;
		text-align: center;
	}
`;

const LegalLinks = styled.div`
	display: flex;
	gap: 24px;

	@media (max-width: 768px) {
		flex-wrap: wrap;
		justify-content: center;
		gap: 16px;
	}
`;

const LegalLink = styled.a`
	color: rgba(255, 255, 255, 0.6);
	text-decoration: none;
	transition: color 0.2s ease;

	&:hover {
		color: rgba(255, 255, 255, 0.9);
	}
`;

const Footer: React.FC = () => {
	return (
		<FooterContainer>
			<FooterInner>
				<FooterGrid>
					<FooterColumn>
						<Logo>
							<img src="/logo-white.svg" alt="(주)제로원" />
						</Logo>
						<CompanyDescription>제로원은 유기성 폐기물 처리 솔루션을 통해 지속 가능한 미래를 만들어갑니다. 제로원의 혁신적인 기술은 환경 오염을 줄이고 순환 경제를 촉진합니다.</CompanyDescription>
						<SocialIcons>
							<SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
								<FacebookIcon color="#fff" width="20" height="20" />
							</SocialIcon>
							<SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
								<TwitterIcon color="#fff" width="20" height="20" />
							</SocialIcon>
							<SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
								<InstagramIcon color="#fff" width="20" height="20" />
							</SocialIcon>
							<SocialIcon href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
								<LinkedInIcon color="#fff" width="20" height="20" />
							</SocialIcon>
						</SocialIcons>
					</FooterColumn>

					<FooterColumn>
						<ColumnTitle>바로가기</ColumnTitle>
						<LinksList>
							<LinkItem>
								<FooterLink href="#hero">회사소개</FooterLink>
							</LinkItem>
							<LinkItem>
								<FooterLink href="#solution">솔루션</FooterLink>
							</LinkItem>
							<LinkItem>
								<FooterLink href="#technology">R&D</FooterLink>
							</LinkItem>
							<LinkItem>
								<FooterLink href="#environmental-impact">환경 영향</FooterLink>
							</LinkItem>
							<LinkItem>
								<FooterLink href="#success">도입사례</FooterLink>
							</LinkItem>
							<LinkItem>
								<FooterLink href="#contact">문의하기</FooterLink>
							</LinkItem>
						</LinksList>
					</FooterColumn>

					<FooterColumn>
						<ColumnTitle>연락처</ColumnTitle>
						<ContactInfo>
							<ContactItem>
								<IconWrapper>
									<MapIcon color="rgba(255, 255, 255, 0.9)" width="20" height="20" />
								</IconWrapper>
								<div>
									충청북도 청주시 청원구 오창읍 양청송대길 10, 308호
									<br />
									(주)제로원
								</div>
							</ContactItem>
							<ContactItem>
								<IconWrapper>
									<PhoneIcon color="rgba(255, 255, 255, 0.9)" width="20" height="20" />
								</IconWrapper>
								<div>Fax. 0303-3441-0101</div>
							</ContactItem>
							<ContactItem>
								<IconWrapper>
									<EmailIcon color="rgba(255, 255, 255, 0.9)" width="20" height="20" />
								</IconWrapper>
								<div>zerone.khk@gmail.com</div>
							</ContactItem>
							<ContactItem>
								<IconWrapper>
									<ClockIcon color="rgba(255, 255, 255, 0.9)" width="20" height="20" />
								</IconWrapper>
								<div>월-금: 9:00 - 18:00</div>
							</ContactItem>
						</ContactInfo>
					</FooterColumn>
				</FooterGrid>

				<Divider />

				<Copyright>
					<div> Copyright © 2025 ZERO ONE Inc. All right reserved</div>
					<LegalLinks>
						<LegalLink href="#">개인정보처리방침</LegalLink>
						<LegalLink href="#">이용약관</LegalLink>
						<LegalLink href="#">사이트맵</LegalLink>
					</LegalLinks>
				</Copyright>
			</FooterInner>
		</FooterContainer>
	);
};

export default Footer;
