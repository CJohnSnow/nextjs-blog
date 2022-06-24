import { BackTop } from 'antd';
import React from 'react';

const style: React.CSSProperties = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};

const BackTopButton: React.FC = () => (
      <BackTop>
        <div style={style}>UP</div>
      </BackTop>
  );
  
  export default BackTopButton;