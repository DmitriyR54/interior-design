import testHtml from 'Sections/TestSection/TestComponent.html';
import './TestComponent.scss';

const TextComponent = () => {
    document.body.innerHTML += testHtml;

    const canvas = document.querySelector('.logo');
    console.log(canvas);
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(150, 50);
    ctx.lineWidth = '5';
    ctx.stroke();
};

export default TextComponent;
