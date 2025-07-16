import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import './Charts.css';

const PieChart = ({ data, width = 600, height = 300 }) => {
  const svgRef = useRef();
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    if (!data.length) return;

    const radius = Math.min(width, height) / 2 - 20;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .range(['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe']);

    const pie = d3
      .pie()
      .value(d => d)
      .sort(null);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    g.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i))
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .style('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))')
      .on('mouseenter', (event, d) => {
        const centroid = arc.centroid(d);
        setTooltip({
          x: centroid[0] + width / 2,
          y: centroid[1] + height / 2,
          value: d.data,
          percentage: ((d.data / d3.sum(data)) * 100).toFixed(1),
        });
        d3.select(event.target).style('filter', 'drop-shadow(0 6px 12px rgba(0,0,0,0.2))');
      })
      .on('mouseleave', event => {
        setTooltip(null);
        d3.select(event.target).style('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))');
      });

    g.selectAll('text')
      .data(pie(data))
      .enter()
      .append('text')
      .attr('transform', d => `translate(${outerArc.centroid(d)})`)
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', '600')
      .style('fill', '#4a5568')
      .text((d, i) => `${i + 1}`);
  }, [data, height, width]);

  return (
    <div className="chart-container" style={{ width, height }}>
      <svg ref={svgRef} width={width} height={height} />
      {tooltip && (
        <div
          className="chart-tooltip"
          style={{
            top: tooltip.y - 50,
            left: tooltip.x + 15,
          }}
        >
          <div className="tooltip-content">
            <div className="tooltip-indicator"></div>
            Value: {tooltip.value} ({tooltip.percentage}%)
          </div>
        </div>
      )}
    </div>
  );
};

export default PieChart;
