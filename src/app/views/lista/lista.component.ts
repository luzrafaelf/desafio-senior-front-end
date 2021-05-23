import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/shared/item';
import { ItemService } from 'src/app/shared/service/item.service';
import { UnidadeMedida } from 'src/app/shared/unidadeMedida';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
 
  itens: Item[] = [];
  
  constructor(public router: Router, public itemService: ItemService) { 

  }

  novo() {
    this.router.navigateByUrl('/novo');
  }
    
  editar(_item: Item) {
    this.router.navigateByUrl('/'+_item.uuid);
  }

  ngOnInit(): void {
    
    this.itemService.findAll().then((data) => {
      this.itens = data;
    });

  }

}
function navigateWithState() {
  throw new Error('Function not implemented.');
}

function editar() {
  throw new Error('Function not implemented.');
}

