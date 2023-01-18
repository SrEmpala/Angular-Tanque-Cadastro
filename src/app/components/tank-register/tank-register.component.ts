import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Tank } from 'src/app/Tank';
import { TanksService } from 'src/app/tanks.service';

@Component({
  selector: 'app-tank-register',
  templateUrl: './tank-register.component.html',
  styleUrls: ['./tank-register.component.scss']
})
export class TankRegisterComponent implements OnInit {

  formulario: any;
  tituloFormulario?: string;


  constructor(private tankService: TanksService) { }

  ngOnInit(): void {

    this.tituloFormulario = "Novo Tanque";
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      nacao: new FormControl(null),
      modelo: new FormControl(null)
    })
  }

  EnviarFormulario(): void{
    const tanque : Tank = this.formulario.value; 

    this.tankService.SalvarTank(tanque).subscribe(resultado => {
      alert("Tanque inserido com sucesso.");
    });
  }

}
