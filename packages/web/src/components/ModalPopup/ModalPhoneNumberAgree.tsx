import React from 'react';
import Modal from '@/components/Modal';

interface ModalPhoneNumberAgreeProps {
  isOpen: boolean;
  onAgree: () => void;
  onDisagree: () => void;
}

const ModalPhoneNumberAgree: React.FC<ModalPhoneNumberAgreeProps> = ({
  isOpen,
  onAgree,
  onDisagree,
}) => {
  if (!isOpen) return null; // 모달이 열리지 않았으면 아무것도 렌더링 안 함

  return (
    <Modal isOpen={isOpen} onChangeIsOpen={onDisagree} padding="20px">
      <div style={{ textAlign: 'center' }}>
        <h3>전화번호 업데이트 동의</h3>
        <p>전화번호 업데이트 진행에 동의하시겠어요?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          <button onClick={onDisagree}>취소</button>
          <button onClick={onAgree}>동의</button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPhoneNumberAgree;
