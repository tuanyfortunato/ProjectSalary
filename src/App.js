import React, { Component } from 'react';
import { calculateSalaryFrom } from './helpers/salary';
import './app.css';

import Bar from './components/Bar';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      salarioBruto: 0,
      baseInss: 0,
      baseIrpf: 0,
      descontoInss: 0,
      descontoIrpf: 0,
      salarioLiquido: 0,
      barSalario: 0,
      barInss: 0,
      barIrpf: 0,
    };
  }

  handleChangeInput = (event) => {
    const valueSalBruto = parseInt(event.target.value);
    let result = calculateSalaryFrom(valueSalBruto);
    console.log(result);

    let barSalLiq = (result.netSalary / valueSalBruto) * 100;
    let barInss = (result.discountINSS / valueSalBruto) * 100;
    let barIrpf = (result.discountIRPF / valueSalBruto) * 100;

    this.setState({
      salarioBruto: valueSalBruto,
      salarioLiquido: result.netSalary,
      baseInss: result.baseINSS,
      baseIrpf: result.baseIRPF,
      descontoInss: result.discountINSS,
      descontoIrpf: result.discountIRPF,
      barSalario: barSalLiq.toFixed(2),
      barInss: barInss.toFixed(2),
      barIrpf: barIrpf.toFixed(2),
    });
  };

  render() {
    const {
      salarioBruto,
      baseInss,
      baseIrpf,
      descontoInss,
      descontoIrpf,
      salarioLiquido,
      barSalario,
      barInss,
      barIrpf,
    } = this.state;
    return (
      <div className="container center">
        <h2>React Salário</h2>
        <div className="row">
          <div className="col s12 m12 l12">
            <label className="labelInput">Salário Bruto</label>
            <input type="number" onChange={this.handleChangeInput} />
          </div>
        </div>
        <div className="row">
          <div className="col s6 m3 l3">
            <label className="labelInputBlack">Base Inss:</label>
            <input type="text" value={`R$ ${baseInss}`} readOnly />
          </div>
          <div className="col s6 m3 l3">
            <label className="labelInputOrange">Desconto Inss:</label>
            <input
              type="text"
              value={`R$ ${descontoInss} (${barInss}%)`}
              readOnly
            />
          </div>
          <div className="col s6 m3 l3">
            <label className="labelInputBlack">Base IRPF:</label>
            <input type="text" value={`R$ ${baseIrpf}`} readOnly />
          </div>
          <div className="col s6 m3 l3">
            <label className="labelInputRed">Desconto IRPF:</label>
            <input
              type="text"
              value={`R$ ${descontoIrpf}(${barIrpf}%)`}
              readOnly
            />
          </div>
        </div>
        <div className="row">
          <div className="col s6 m3 l3">
            <label className="labelInputSalLiquido">Salário Liquido:</label>
            <input
              type="text"
              value={`R$ ${salarioLiquido} (${barSalario}%)`}
              readOnly
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Bar value={barInss} color="darkorange" />
          <Bar value={barIrpf} color="darkred" />
          <Bar value={barSalario} color="darkcyan" />
        </div>
      </div>
    );
  }
}
