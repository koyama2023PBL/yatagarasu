import React, { useRef, MouseEvent } from 'react';

// スクロールを実行する関数
const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }
};

//Props
interface ScrollLinkProps {
  to: string;
  children: React.ReactNode;
}

//本体
const ScrollLink: React.FC<ScrollLinkProps> = ({ to, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToRef(ref);
  };
  
  return (
    <>
      <a href={`#${to}`} onClick={handleClick}>
        {children}
      </a>
      <div id={to} ref={ref} />
    </>
  );
};

export default ScrollLink;