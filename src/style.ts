export const callStyle = () => {
  logseq.provideStyle(`
    @keyframes shake {
    0% { transform: translate(10px, 10px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(30px, 20px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(30px, 10px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
    }

    .combo {
        font-size: 12px;
        transition: 0.5s; 
        border: 1px solid;
        padding: 0px 8px;
        height: 24px;
        border-radius: 12px;

        margin: 3px 4px 0 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: .5;
    }

    .combo:hover { 
        cursor: pointer;
        background-color: purple;
        color: white;
    }

    .comboChange {
        font-size: 24px;
        color: red;
        transition: 0.5s;
    }

    #canvas {
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        position: absolute;
    }`);
};
