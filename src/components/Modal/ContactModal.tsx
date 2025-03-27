import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

interface ContactModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const ModalOverlay = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(4px);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
`;

const ModalContent = styled(motion.div)`
	background: white;
	width: 90%;
	max-width: 500px;
	border-radius: 12px;
	padding: 24px;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
	position: relative;
`;

const CloseButton = styled.button`
	position: absolute;
	top: 16px;
	right: 16px;
	background: none;
	border: none;
	font-size: 24px;
	cursor: pointer;
	color: #666;
	transition: color 0.2s;

	&:hover {
		color: #0d5932;
	}
`;

const ModalTitle = styled.h2`
	color: #0d5932;
	margin-bottom: 16px;
`;

const FormGroup = styled.div`
	margin-bottom: 16px;
`;

const Label = styled.label`
	display: block;
	margin-bottom: 8px;
	font-weight: 500;
`;

const Input = styled.input`
	width: 100%;
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 4px;
	font-size: 16px;

	&:focus {
		outline: none;
		border-color: #0d5932;
	}
`;

const TextArea = styled.textarea`
	width: 100%;
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 4px;
	font-size: 16px;
	min-height: 120px;
	resize: vertical;

	&:focus {
		outline: none;
		border-color: #0d5932;
	}
`;

const SubmitButton = styled.button`
	background: #0d5932;
	color: white;
	border: none;
	padding: 12px 24px;
	border-radius: 4px;
	font-size: 16px;
	font-weight: 500;
	cursor: pointer;
	transition: background 0.2s;

	&:hover {
		background: #0a4527;
	}
`;

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// 여기에 폼 제출 로직 추가
		onClose();
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<ModalOverlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
					<ModalContent initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
						<CloseButton onClick={onClose}>&times;</CloseButton>
						<ModalTitle>문의하기</ModalTitle>

						<form onSubmit={handleSubmit}>
							<FormGroup>
								<Label htmlFor="name">이름</Label>
								<Input id="name" type="text" required />
							</FormGroup>

							<FormGroup>
								<Label htmlFor="company">회사명</Label>
								<Input id="company" type="text" required />
							</FormGroup>

							<FormGroup>
								<Label htmlFor="email">이메일</Label>
								<Input id="email" type="email" required />
							</FormGroup>

							<FormGroup>
								<Label htmlFor="phone">연락처</Label>
								<Input id="phone" type="tel" />
							</FormGroup>

							<FormGroup>
								<Label htmlFor="message">문의 내용</Label>
								<TextArea id="message" required />
							</FormGroup>

							<SubmitButton type="submit">문의하기</SubmitButton>
						</form>
					</ModalContent>
				</ModalOverlay>
			)}
		</AnimatePresence>
	);
};

export default ContactModal;
