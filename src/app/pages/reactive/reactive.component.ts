import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup; 

  constructor( private fb: FormBuilder) {
    this.crearFormulario();


   }

  ngOnInit(): void {
  }

  //METODOS

  //getters
  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }
  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }
  get departamentoNoValido(){
    return this.forma.get('direccion.departamentoDistrito').invalid && this.forma.get('direccion.departamentoDistrito').touched;
  }
  get ciudadNoValido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }


  crearFormulario(){
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      //paraque sea un objeto no un valor =>
      direccion: this.fb.group({
        departamentoDistrito: ['', [Validators.required, Validators.minLength(5)]],
        ciudad: ['', [Validators.required, Validators.minLength(5)]],
      })
    });
  }

  guardar(){
    console.log(this.forma);

    //verificaciones cuando se guarda
    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control =>{

        if (control instanceof FormGroup){
          Object.values(control.controls).forEach(control=> control.markAsTouched());
        }else{
        control.markAsTouched();
      }
      });
    }
  }

}
