'use client';
import {GitHubCalendar} from 'react-github-calendar';
import { styleText } from 'util';

export default function Contributions() {
    const customTheme = {
    light: ['#808080', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#535353', '#868686', '#C0C0C0', '#D3D3D3', '#ffffff'],
  };
  return (
    
    <div className="glow p-10">
      <GitHubCalendar username="Zarcotech" theme={customTheme}/>
    </div>
  );
}
