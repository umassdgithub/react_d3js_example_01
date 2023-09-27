import { useEffect, useRef } from "react";
import * as d3 from "d3";
export default function LineChart({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20
}) {
  const xAxis = useRef(null);
  const yAxis = useRef(null);
  const xScale = d3.scaleTime(
    d3.extent(data, (d) => d.DATE),
    [marginLeft, width - marginRight]
  );
  const yScale = d3.scaleLinear(
    d3.extent(data, (d) => d.TAVG),
    [height - marginBottom, marginTop]
  );
  const line = d3
    .line()
    .x((d) => xScale(d.DATE))
    .y((d) => yScale(d.TAVG));

  useEffect(() => {
    d3.select(xAxis.current)
      .attr("transform", `translate(${0},${height - marginBottom})`)
      .call(d3.axisBottom(xScale));
  }, [xAxis, data]);
  useEffect(() => {
    d3.select(yAxis.current)
      .attr("transform", `translate(${marginLeft},${0})`)
      .call(d3.axisLeft(yScale));
  }, [yAxis, data]);

  return (
    <svg width={width} height={height}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(data)}
      />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={xScale(d.DATE)} cy={yScale(d.TAVG)} r="2.5" />
        ))}
      </g>
      <g ref={xAxis}></g>
      <g ref={yAxis}></g>
    </svg>
  );
}
