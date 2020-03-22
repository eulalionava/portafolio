import { Component, OnInit } from '@angular/core';
import { Tecnologia } from '../../modelos/tecnologia';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { TecnologiaService } from '../../services/tecnologia.service';

@Component({
  selector: 'app-agregar-tec',
  templateUrl: './agregar-tec.component.html',
  providers:[TecnologiaService]
})
export class AgregarTecComponent implements OnInit {
  public tecnologia:Tecnologia;
  public fileToUpload;
  public resultUpload:any;
  public msjerror;

  constructor(
    private _serviceTecnologia:TecnologiaService,
    private _Route:ActivatedRoute,
    private _router:Router
  ){
    this.tecnologia = new Tecnologia(1,'','','','','');
    this.msjerror = "";
  }

  ngOnInit() {

  }

  //Metodo para agregar nueva tecnologia
  agregarTecnologia(){
    if(this.fileToUpload && this.fileToUpload.length > 0){
      this._serviceTecnologia.fileRequest(GLOBAL.url +'cargarImagen',[],this.fileToUpload).then(
        (result)=>{ 
          this.resultUpload = result;
          this.tecnologia.imagen = this.resultUpload.filename;
          this.tecnologia.activo = '1';
          this._serviceTecnologia.addTecnologia(this.tecnologia).subscribe(
            respuesta=>{
              console.log(respuesta);
              if(respuesta['code'] == 200){
                this._router.navigate(['/tecnologia']);
              }else{
                this.msjerror = respuesta['message'];
              }
            },
            error=>{
              alert("Upss!! algo anda mal");
            }
          )
        },
        (error)=>{
          alert("Upss !! Error al cargar la imagen ");
        }
      )
    }

  }

  //Detecta cambios en la imagen
  fileChangeEvent(fileInput:any){
    this.fileToUpload =<Array<File>>fileInput.target.files
    console.log(this.fileToUpload);
  }


}
