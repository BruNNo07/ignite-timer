import { HeaderConteiner } from "./styles";
import { Timer, Scroll } from 'phosphor-react';
import { NavLink } from 'react-router-dom'

import LogoIgnite from '../../assets/Logo.svg'

export function Header (){
    return (
        <HeaderConteiner>
            <img src={LogoIgnite} alt="Logo Ignite"/>
            <nav>
                <NavLink to="" title="Title">
                    <Timer size={24}/>
                </NavLink>
                <NavLink to="/history" title="Histórico">
                    <Scroll size={24}/>
                </NavLink>
            </nav>
        </HeaderConteiner>
    )
}