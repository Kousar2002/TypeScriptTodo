import * as React from 'react';
import { PieChart, pieClasses, pieArcClasses } from '@mui/x-charts/PieChart';
import { Box } from '@mui/material';
import { rainbowSurgePalette } from '@mui/x-charts/colorPalettes';
import { useTheme } from '@mui/material/styles';
interface Todo {
  title: string;
  description: string;
  category: string;
  status: string;
}
interface PieProps {
  todos: Todo[];
}
const Piechart:React.FC<PieProps> = ({ todos }) => {
  const theme = useTheme();
  const palette = rainbowSurgePalette(theme.palette.mode);
  const statusColorMap:Record<Todo["status"],string> = {
    Todo: 'red',
    'Progress': 'blue',
    Completed: 'yellow',
  };
  
  const statusCounts:Record<string,number>={};
  todos.forEach((todo)=>{
    const stat=todo.status;
    console.log(stat);
    statusCounts[stat]=(statusCounts[stat]||0)+1;
  })
  const statusData = Object.entries(statusCounts).map(([stat, count], ind) => ({
    id: ind,
    value: count,
    label: stat,
    color: statusColorMap[stat] || palette[ind % palette.length],
  }));
  const categoryData:{label:string;value:number;color:string}[]=[];
  todos.forEach((todo,ind)=>{
    const cat=todo.category;
    const stat=todo.status;
    console.log(stat);
    const key=`${stat}-${cat}`
    const existing=categoryData.find((item)=>item.label===key);
    if(existing) existing.value+=1;
    else{
      categoryData.push({
        label: key,
        value: 1,
        color: statusColorMap[stat] || 'gray',
      })
    }

  })
  const settings = {
    series: [
      {
        innerRadius: 0,
        outerRadius: 80,
        data: statusData,
        // highlightScope: { fade: 'global', highlight: 'item' },
      },
      {
        id: 'outer',
        innerRadius: 100,
        outerRadius: 120,
        data: categoryData,
        // highlightScope: { fade: 'global', highlight: 'item' },
      },
    ],
    height: 300,
    hideLegend:true
    // slotProps: {
    //   legend: { hidden: true },
    // },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid black',
         width: 300,
          height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#E6D8C3',
      }}
    >
      <PieChart
        {...settings}
        sx={{
          [`.${pieClasses.series}[data-series="outer"] .${pieArcClasses.root}`]: {
            opacity: 0.6, // makes outer ring softer
          },
        }}
      />
    </Box>
  );
};

export default Piechart;
