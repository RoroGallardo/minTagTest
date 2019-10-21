import { Component, OnInit } from '@angular/core';
import { services } from 'src/app/services/services';
import { dictMod } from 'src/app/model/dict-model';
import { letterModel } from 'src/app/model/letter-model';
import { TmplAstTextAttribute } from '@angular/compiler';

@Component({
  selector: 'app-dict',
  templateUrl: './dict.component.html',
  styleUrls: ['./dict.component.scss']
})

export class DictComponent implements OnInit {
public _dictMod:dictMod;
public _arrayAlphabet = [];
public _arrayProsCharts = [];
public _charged = false;
pageOfItems : Array<any>;

  constructor(private serv:services) { 
    this._dictMod = new dictMod();
    this._arrayAlphabet.push('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
    this.getDict()
  }

  ngOnInit() {

  }

  getDict(){
    this.serv.getDict().subscribe((data:dictMod)=>{
      this._dictMod = data;
      var dictModAux = this._dictMod;
      var tableArray = [];
      var alhpaux =this. _arrayAlphabet;
      //recorre de la a hasta la z
      
      dictModAux.data.forEach(function(val){
        var rowArray = [];

        alhpaux.forEach(function(pointedChar){

          //por cada letra en el alfabeto se crea un modelo que seran acumuladas
          let character = new letterModel();
          character.value = pointedChar;//asigna el valor del alfabeto correspondiente
          character.count = 0;
          
          //<-para llegar a recorrer los caracteres del "paragraph"
          for (let index = 0; index < val.paragraph.length; index++) {
            //se obtiene el char de la frase
            const element = val.paragraph[index];
            //se compara con la letra del alfabeto agregada al modelo
            if(element == pointedChar){
              //si existe suma
              character.count++;
            }
          }
          rowArray.push(character);
        });
        var sum = 0;//variable que se exportara para complentar la suma de los valores contados
        rowArray.forEach(function(x){sum = sum +x.count});
        tableArray.push({'array':rowArray,
                          'sum' :sum,
                          'parag' : val.paragraph}); //disposicion de la frase en tootip
      }); 
      this._arrayProsCharts = tableArray; //exportacion de objeto contenedor de informacion procesada.
    this._charged = true;//cambio de estado para mostrar la grilla con data.
  })
  }
  onChangePage(pageOfItems: Array<any>) {    
    this.pageOfItems = pageOfItems;
  }
}
