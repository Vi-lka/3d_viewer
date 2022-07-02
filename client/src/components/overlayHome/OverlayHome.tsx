import React from 'react'
import { a } from '@react-spring/web'
import './overlayHome.css';

export default function OverlayHome({ fill }: any) {
  return (
<div className="overlay">
    {/* <img className='main-logo' src="../main-logo.png" alt="" /> */}
      <a.svg viewBox="0 0 820 820" fill={fill} xmlns="http://www.w3.org/2000/svg">
        <text style={{ whiteSpace: 'pre' }} fontFamily="Cera Pro" fontSize={10} fontWeight="bold" letterSpacing="-.02em">
          <tspan x={40} y={46.182} children="CИБИРСКИЙ " />
          <tspan x={40} y={58.182} children="ФЕДЕРАЛЬНЫЙ " />
          <tspan x={40} y={70.182} children="УНИВЕРСИТЕТ" />
        </text>
        <text style={{ whiteSpace: 'pre' }} fontFamily="Cera Pro" fontSize={10.5} fontWeight={500} letterSpacing="0em">
          <tspan x={40} y={188.318} children="ДАННЫЙ ПРОЕКТ ЯВЛЯЕТСЯ ПРОТОТИПОМ" />
        </text>
        <text fill="#e83c07" style={{ whiteSpace: 'pre' }} fontFamily="Cera Pro" fontSize={52} fontWeight="bold" letterSpacing="0em">
          <tspan x={40} y={257.909} children={'Добро пожаловать \u2014'} />
        </text>
        <text style={{ whiteSpace: 'pre' }} fontFamily="Cera Pro" fontSize={12} fontWeight="bold" letterSpacing="0em">
          <tspan x={40} y={270.909} />
        </text>
        <text style={{ whiteSpace: 'pre' }} fontFamily="Cera Pro" fontSize={48} fontWeight="bold" letterSpacing="0em">
          <tspan x={40} y={321.909} children="Разработка веб-приложения " />
          <tspan x={40} y={372.909} children="для просмотра 3D-моделей " />
          <tspan x={40} y={423.909} children="на примере археологической " />
          <tspan x={40} y={474.909} children="коллекции СФУ" />
        </text>
        <text style={{ whiteSpace: 'pre' }} fontFamily="Cera Pro" fontSize={16} fontWeight={500} letterSpacing="0em">
          <tspan x={674} y={540} children="Пермяков В.А." />
        </text>
      </a.svg>
    </div>
  )
}
