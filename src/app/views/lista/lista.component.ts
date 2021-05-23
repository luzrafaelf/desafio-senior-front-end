import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
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
  
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, public router: Router, public itemService: ItemService) { 

  }

  novo() {
    this.router.navigateByUrl('/novo');
  }
    
  editar(_item: Item) {
    this.router.navigateByUrl('/'+_item.uuid);
  }

  remover(_item: Item) {

    this.confirmationService.confirm({
      message: 'Deseja mesmo remover o item?',
      accept: () => {
        this.itemService.remove(_item.uuid).then(() => {
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Item removido'});
          this.findAll();
        }, () => {
          this.messageService.add({severity:'success', summary: 'Error', detail: 'Não foi possível remover o item'});
        })
      }
    })
  }

  findAll(){
    this.itemService.findAll().then((data) => {
      this.itens = data;
    });
  }

  ngOnInit(): void {   
    this.findAll();

  }

}
function navigateWithState() {
  throw new Error('Function not implemented.');
}

function editar() {
  throw new Error('Function not implemented.');
}

