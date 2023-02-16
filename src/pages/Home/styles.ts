import styled from "styled-components";

export const HomeConteiner = styled.main`
    flex:1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }
`;

export const BaseCountDownButton = styled.button`
    width: 100%;
    border: 0;
    padding: 1rem;
    border-radius: 8px;

    display:flex;
    align-items: center;
    justify-content: center;

    gap: 00.5rem;
    font-weight: bold;

    cursor: pointer;

    color: ${props=> props.theme["gray-100"]};

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }


`;

export const StartCountDownButton = styled(BaseCountDownButton)`
    background: ${props => props.theme["green-300"]};

    &:not(:disabled):hover{
        background: ${props => props.theme["green-700"]};
        color: ${props=> props.theme["gray-500"]};
    }
`;

export const StopCountDownButton = styled(BaseCountDownButton)`
    background: ${props => props.theme["red-500"]};

    &:not(:disabled):hover{
        background: ${props => props.theme["red-700"]};
        color: ${props=> props.theme["gray-500"]};
    }
`;



