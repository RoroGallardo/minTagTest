import { Component, OnInit } from '@angular/core';
import { services } from 'src/app/services/services';
import { arrayMod } from 'src/app/model/array-model';
import { filteredData } from 'src/app/model/filtered-data';
import { log } from 'util';
import { element } from 'protractor';

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss']
})
export class ArrayComponent implements OnInit {

  public _arrayMod: arrayMod;
  public arrayModFiltered = [];
  public arrayModRefactored = "";
  public _charged = false;

  constructor(
    private serv: services,
  ) {
    this._arrayMod = new arrayMod();
    this.getArray();
  }
  
  ngOnInit() {
  }

  getArray() {
    this.serv.getArray().subscribe((data: arrayMod) => {
      if (data.success) {
        this._arrayMod = data;
        console.log(data);
        this._arrayMod.data.forEach(element => {
          var count = 0;//acumulador de ocurrencias
          var arrayModClone = this._arrayMod; //arreglo auxiliar para manejo dentro del segundo ciclo
          var filtData = new filteredData();//objeto que contendra el procesamiento para desplegar la imnformacion
          let self = this;//bandera al scope principal
          arrayModClone.data.forEach(function (numbONl) {
            var prev = false; //bandera que informa sobre la carga del primer indice encontrado
            if (numbONl == element) {//se compara el valor del indice x con el valor del ince y
              count++;  //si contiene ocurrencia la agrega al contador
              if (!prev) {
                filtData.firsPosition = arrayModClone.data.indexOf(element); //obtencion primer indice
                prev = true;
              }
              filtData.lastPosition = arrayModClone.data.lastIndexOf(element);//obtencion primer indice
              self.dropDuplicated(arrayModClone.data, element);//eliminacion del elemento ya procesado
            }
          });
          filtData.value = element;
          filtData.quantity = count;
          this.arrayModFiltered.push(filtData);//se agrega a la coleccion de compone la tabla 

        });

        var refactorAux = this.refactorArray(this.arrayModFiltered);//ordenamiento de valores
        refactorAux.forEach((item) => {
          this.arrayModRefactored += `${item.value} -> `;
        });
      }
      //cuando termina de consumir el servicio cambia el valor para desactivar spinner de carga
      this._charged = true;
    });
  }

  // Metodo creado para realizar ordenamiento burbuja a un arreglo con clave value
  refactorArray(arrayToProcess) {
    var collection = [];
    collection = collection.concat(arrayToProcess);
    for (let x = 0; x < collection.length; x++) {
      for (let i = 0; i < collection.length - x - 1; i++) {
        if (collection[i].value > collection[i + 1].value) {
          let tmp = collection[i + 1];
          collection[i + 1] = collection[i];
          collection[i] = tmp;
        }
      }
    }
    return collection;
  }

  //Metodo que elimina secuencialmente un valor que fue previamente procesado
  //Array : arreglo a reducir || toDelete : dato previamente procesado
  dropDuplicated(array, toDelete) {
    array.forEach(function (xc) {
      var iElement = array.indexOf(xc);
      if (iElement != -1) {
        if (xc == toDelete) {
          array.splice(iElement, 1);
        }
      }
    });
  }

}

