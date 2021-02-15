import React, { PureComponent, useRef, useLayoutEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid} from '@material-ui/core';
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, ComposedChart, Legend, Bar, Line, PieChart, Pie, Cell, Sector } from 'recharts';

const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
]

const COLORS = ['#d44a48', '#38a07d', '#e7cf00'];

const renderActiveShape = (props) => {
    const {
      cx, cy, innerRadius, outerRadius, startAngle, endAngle,
      fill, percent,
    } = props;
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{`${(percent * 100).toFixed(2)}%`}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius - 5}
          outerRadius={outerRadius+5}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

export default class CustomPieChart extends PureComponent {
    classes = makeStyles((theme) => ({
      align: {
        justifyContent: 'center'
      }
    }));
    
    state = {
      activeIndex: 0,
      dimensions: { 
        width:0,
        height: 0
      }   
    };

    componentDidMount() {
      this.setState({
        dimensions: {
          width: this.container.offsetWidth,
          height: this.container.offsetHeight,
        },
      });
    }
    onPieEnter = (data, index) => {
      this.setState({
        activeIndex: index,
      });
    };
  renderContent() {
    const { dimensions } = this.state;
    return (
    	<PieChart width={dimensions.width} height={250} className={this.classes.align}>
            <Legend layout="horizontal" align="center" wrapperStyle={{display: 'inlineBlock'}}/>
            <Pie 
                activeIndex={this.state.activeIndex}
                activeShape={renderActiveShape} 
                data={data} 
                innerRadius={60}
                outerRadius={80}
                dataKey="uv"
                fill="#8884d8"
                onMouseEnter={this.onPieEnter}
            >
                {
                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
            </Pie>
       </PieChart>
    );
  }
	render () {
    const { dimensions } = this.state;
    return (
      <div ref={el => (this.container = el)}>
        {dimensions && this.renderContent()}
      </div>
    )
  }
}


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: '1.5rem',
      padding: '0 4rem'
    },
    align: {
      justifyContent: 'center'
    }
}));

export const Dashboard = () => {
    const classes = useStyles();
    const targetRefComposedChart = useRef();
    const targetRefAreaChart = useRef();
    const [dimensionsComposedChart, setDimensionsComposedChart] = useState({ width:0, height: 0 });
    const [dimensionsAreaChart, setDimensionsAreaChart] = useState({ width:0, height: 0 });

    useLayoutEffect(() => {
      if (targetRefComposedChart.current) {
        setDimensionsComposedChart({
          width: targetRefComposedChart.current.offsetWidth,
          height: targetRefComposedChart.current.offsetHeight
        });
      }
    }, []);
    useLayoutEffect(() => {
      if (targetRefAreaChart.current) {
        setDimensionsAreaChart({
          width: targetRefAreaChart.current.offsetWidth,
          height: targetRefAreaChart.current.offsetHeight
        });
      }
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={5}>
                    <Card className={classes.align}>
                        <CustomPieChart />
                    </Card>
                </Grid>
                <Grid item xs={7}>
                    <Card ref={targetRefComposedChart}>
                        <ComposedChart width={dimensionsComposedChart.width} height={250} data={data} margin={{ top: 20, right: 10, bottom: 20, left: 10 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Bar dataKey="amt" barSize={20} fill="#6662f1" />
                            <Bar dataKey="pv" barSize={20} fill="#308af3 " />
                            <Line type="monotone" dataKey="uv" stroke="#e9e7f1" />
                        </ComposedChart>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card ref={targetRefAreaChart}>
                        <AreaChart width={dimensionsAreaChart.width - 20} height={250} data={data}
                            margin={{ top: 20, right: 10, bottom: 20, left: 10 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#6662f1" stopOpacity={0.8}/>
                                    <stop offset="100%" stopColor="#6662f1" stopOpacity={0.8}/>
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#308af3" stopOpacity={0.8}/>
                                    <stop offset="100%" stopColor="#308af3" stopOpacity={0.8}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" stroke="#6662f1" fillOpacity={1} fill="url(#colorUv)" />
                            <Area type="monotone" dataKey="pv" stroke="#308af3" fillOpacity={1} fill="url(#colorPv)" />
                        </AreaChart>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}