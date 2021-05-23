import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Item } from '../item';

@Injectable({
  providedIn: 'root'
})
/**
 * Irá sempre retornar uma promise
 */
export class ItemService {

  constructor() { }

  public async save(item: Item) {
    await Promise.resolve();
    if (!item.uuid) {
      let _uuid = uuidv4();
      item.uuid = _uuid;
    }
    return localStorage.setItem(item.uuid + "", JSON.stringify(item));
  }

  public async findAll(){ 
    await Promise.resolve();
    let _itens = [];
    for (let _i = 0; _i < localStorage.length; _i++) {
      _itens.push("" + localStorage.getItem(localStorage.key(_i)!));
    }
    return _itens.map((i) => JSON.parse(i));
  }
    
  public async findOne(key: string){ 
    await Promise.resolve();
    let _item = localStorage.getItem(key)!;
    return JSON.parse(_item);
  }

  public async remove(key: string) {
    await Promise.resolve();
    return localStorage.removeItem(key);
  }
}
