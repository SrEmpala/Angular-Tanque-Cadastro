import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { Tank } from 'src/app/Tank';
import { TanksService } from 'src/app/tanks.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tank-register',
  templateUrl: './tank-register.component.html',
  styleUrls: ['./tank-register.component.scss']
})
export class TankRegisterComponent implements OnInit {

  formulario: any;
  tituloFormulario?: string;
  tanques?: Tank[];

  tabelaVisibilidade: boolean = true;
  formularioVisibilidade: boolean = false;

  constructor(private tankService: TanksService, private rota: ActivatedRoute) { }

  ngOnInit(): void {

    this.tankService.BuscarTodos().subscribe(resultado => {
      this.tanques = resultado
    });

    this.tituloFormulario = "Novo Tanque";
    this.formulario = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      nacao: new FormControl(null, [Validators.required]),
      modelo: new FormControl(null, [Validators.required])
    })
    console.log("🚀 ~ file: tank-register.component.ts:30 ~ TankRegisterComponent ~ ngOnInit ~ this.rota.snapshot.params['id']", this.rota.snapshot.params['id'])
  }

  ExibirFormularioTanques(): void{
    this.tabelaVisibilidade = false;
    this.formularioVisibilidade = true;

    this.tituloFormulario = "Novo Tanque";
    this.formulario = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      nacao: new FormControl(null, [Validators.required]),
      modelo: new FormControl(null, [Validators.required])
    })
  }

  FormularioAtualizar(tankId: number | any): void{
    console.log("🚀 ~ file: tank-register.component.ts:51 ~ TankRegisterComponent ~ FormularioAtualizar ~ tankId", this.tanques)
    this.tabelaVisibilidade = false;
    this.formularioVisibilidade = true;

    this.tankService.BuscarPorId(tankId).subscribe(resultado =>{
      this.tituloFormulario = `Atualizar ${resultado.nome}`;
      this.formulario = new FormGroup({
        tankId: new FormControl(resultado.id),
        nome: new FormControl(resultado.nome),
        modelo: new FormControl(resultado.modelo),
        nacao: new FormControl(resultado.nacao)        
      });
    });
  }

  EnviarFormulario(): void{
    const tanque : Tank = this.formulario.value; 

    if( (tanque as any).tankId > 0){
       this.tankService.AtualizarTank(tanque).subscribe(resultado => {
        this.tabelaVisibilidade = true;
        this.formularioVisibilidade = false;
        alert("Tanque atualizado com sucesso.");
        this.tankService.BuscarTodos().subscribe((registros) => {
          this.tanques = registros
        });
      });
    }

    else{
      this.tankService.SalvarTank(tanque).subscribe(resultado => {
        this.tabelaVisibilidade = true;
        this.formularioVisibilidade = false;
        alert("Tanque inserido com sucesso.");
        this.tankService.BuscarTodos().subscribe((registros) => {
          this.tanques = registros
        });
      });
    }
  }

  ExcluirTanque(id: any){
    this.tankService.ExcluirTank(id).subscribe(() => {
      this.ngOnInit()
    });
  }

  Voltar(): void{
    this.tabelaVisibilidade = true;
    this.formularioVisibilidade = false;
  }
}
