import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/shared/item';
import { ItemService } from 'src/app/shared/service/item.service';
import { UnidadeMedida } from 'src/app/shared/unidadeMedida';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {

  constructor(private route: ActivatedRoute, public itemService: ItemService) { }

  item!: Item;
  unidadesMedida: String[] = ["UNIDADE", "QUILOGRAMA", "LITRO"];

  ngOnInit(): void {

    let _uuid = this.route.snapshot.paramMap.get('uuid');

    this.item = new Item("", "", UnidadeMedida.UNIDADE, 0, 0, false, new Date(), new Date());

    if (_uuid != null){
      if (_uuid == 'novo'){

      }else {
        this.itemService.findOne(_uuid).then((data) => {
          this.item = data;
        });
      }

    } 

    
  }

}
