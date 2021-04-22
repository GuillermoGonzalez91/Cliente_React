import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';




// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('12/12', 33),
  createData('13/12', 11),
  createData('14/12', 33),
  createData('15/12', 44),
  createData('16/12', 55),
  createData('17/12', 11),
  createData('18/12', 22),
  createData('19/12', 99),
  createData('20/12', undefined),
];







export default function Chart({transaction, transactions ,setTransaction, setListUpdated}) {
  const theme = useTheme();

let{concepto, monto, fecha, tipo} = transaction



  return (


    
    <React.Fragment>
      <ResponsiveContainer>
        <LineChart
          data={transactions}
          margin={{
            top: 16,
            right: 150,
            bottom: 400,
            left: 150,
            
          }}
        >
          <XAxis dataKey="Fecha" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Gastos ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="Monto" stroke="#008f39" dot={false} />
          <Line type="monotone" dataKey="Monto" stroke="#ff1100" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}