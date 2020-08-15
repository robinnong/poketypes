import styled from "styled-components";

export const Input = styled.input`
    color: black;
    font-size: 3rem;  
    font-family: inherit;
    letter-spacing: 2px;
    text-align: center; 
    text-transform: lowercase;
    background-color: white;
    border: 2px solid white;
    border-radius: 5px;
    width: 100%;
    margin-top: 10px;
    transition: all 0.2s;
`
export const Button = styled.button`
    background-color: ${props => (props.isRed ? "#d45594" : "#61a0ff" )};
    border-bottom: ${props => (props.isRed ? "6px solid #b4487e" : "6px solid #4e85d6")};
    &:hover, 
    &:focus {
        background-color: ${props => (props.isRed ? "#bd4e85" : "#548bdf" )}; 
        border-bottom: ${props => (props.isRed ? "6px solid #a04271" : "6px solid #4678c4")};
    } 
`
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    margin: 10px 0; 
`

export const ScoreBoard = styled.form`
    position: relative; 
    width: 500px;
    margin: 10px auto 0 auto;
    border-radius: 5px;    
    background-color: white;
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
    animation-duration: 0.4s;

        div {display: flex;}  
        h3 {margin-bottom: 0;} 

    @media (max-width:568px) {
        width: 100%;
    }
`
export const FullToggle = styled.button`
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    z-index: 20;
    
    color: rgb(82, 82, 82);
    font-weight: 400;
    font-size: 1.6rem;

    width: 250px;
    margin: 0 auto;
    padding: 5px;
    
    background-color: #ffffff99;
    border-radius: 5px;

        &:hover,
        &:focus {background-color:  #ffffffe6;} 
`

export const Footer = styled.footer`
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    text-align: center;
    color: #202020;
    font-size: 1.4rem;
    font-weight: 700;  
    background-color: #f0f0f0; 
    padding: 15px;
        p {line-height: 1.3rem;}
        a {color: #ff5890;} 

    @media (max-width:480px) {
        font-size: 1.2rem;
    }
`