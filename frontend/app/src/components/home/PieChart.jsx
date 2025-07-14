import { useRef, useEffect } from 'react';

export default function PieChart({ data, labels, colors, width = 300, height = 300 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const total = data.reduce((sum, val) => sum + val, 0);

    //center of the circle
    const cx = width / 2;
    const cy = height / 2;
    //radius is the diameter divided by 2
    const radius = height/2

    //angle that we start
    let startAngle = 0;

    data.forEach((value, i) => {
      //full circle in radians is 2pi, so we get only the % of the slice of a full circle
      //the angle of the slice will be the value of the slice divide by the total
      const sliceAngle = (value / total) * 2 * Math.PI;

      //the end will obviously be the start + the slice (accumulating)
      const endAngle = startAngle + sliceAngle;

      //call the context to start drawing
      ctx.beginPath();
      //start from the middle
      ctx.moveTo(cx, cy);
      //draw an arc with the radius and angle "size" we specified
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      //stop the drawing
      ctx.closePath();

      ctx.fillStyle = colors[i];
      ctx.fill();

      //calculate the position of labels
      const midAngle = startAngle + sliceAngle / 2;

      const labelX = cx + (radius / 1.5) * Math.cos(midAngle);
      const labelY = cy + (radius / 1.5) * Math.sin(midAngle);
      
      ctx.fillStyle = '#000';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillText(`${labels[i]}`, labelX, labelY);

      startAngle = endAngle;
    });
  }, [data, colors, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
}