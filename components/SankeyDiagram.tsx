import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';

const SankeyDiagram = () => {
  const svgRef = useRef();

  useEffect(() => {
    const data = {
      nodes: [
        { name: 'Jobs Applied' },
        { name: 'Replies' },
        { name: 'Interview' },
        { name: 'Offer Accepted' },
        { name: 'Offer Turned Down' },
        { name: 'Not Offered' },
        { name: 'Rejected' },
        { name: 'No Response' },
        { name: 'No Further Action' },
      ],
      links: [
        { source: 0, target: 1, value: 15 },
        { source: 1, target: 2, value: 9 },
        { source: 2, target: 3, value: 1 },
        { source: 2, target: 4, value: 2 },
        { source: 2, target: 5, value: 6 },
        { source: 0, target: 6, value: 5 },
        { source: 0, target: 7, value: 12 },
        { source: 1, target: 8, value: 6 },
      ],
    };

    const width = 1200;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const { nodes, links } = sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 1], [width - 1, height - 5]])(data);

    svg.append('g')
      .selectAll('rect')
      .data(nodes)
      .join('rect')
      .attr('x', d => d.x0)
      .attr('y', d => d.y0)
      .attr('height', d => d.y1 - d.y0)
      .attr('width', d => d.x1 - d.x0)
      .attr('fill', d => {
        const colorMap = {
          'Jobs Applied': '#1f77b4',
          'Replies': '#ff7f0e',
          'Interview': '#2ca02c',
          'Offer Accepted': '#d62728',
          'Offer Turned Down': '#9467bd',
          'Not Offered': '#8c564b',
          'Rejected': '#e377c2',
          'No Response': '#7f7f7f',
          'No Further Action': '#bcbd22',
        };
        return colorMap[d.name] || '#ccc'; 
      });

    svg.append('g')
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke', '#aaa')
      .attr('fill', 'none')
      .attr('stroke-width', d => Math.max(1, d.width));

    svg.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('x', d => d.x0 - 6)
      .attr('y', d => (d.y1 + d.y0) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .text(d => d.name)
      .attr('fill', '#000')
      .filter(d => d.x0 < width / 2)
      .attr('x', d => d.x1 + 6)
      .attr('text-anchor', 'start');
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default SankeyDiagram;
