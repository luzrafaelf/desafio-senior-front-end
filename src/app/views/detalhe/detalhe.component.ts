import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/shared/item';
import { ItemService } from 'src/app/shared/service/item.service';
import { UnidadeMedida } from 'src/app/shared/unidadeMedida';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {

  constructor(private fb: FormBuilder, private messageService: MessageService, public router: Router, private route: ActivatedRoute, public itemService: ItemService) { }

  item!: Item;
  unidadesMedida: String[] = ["UNIDADE", "QUILOGRAMA", "LITRO"];
  novo: boolean = false;
  detalheForm!: FormGroup;

  ngOnInit(): void {

    this.detalheForm = this.fb.group({
      'nome': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('^[A-Za-zÀ-ú]+$')]),
      'unidadeMedida': new FormControl('', Validators.required),
      'quantidade': new FormControl(''),
      'preco': new FormControl('', Validators.required),
      'perecivel': new FormControl(''),
      'dataValidade': new FormControl(''),
      'dataFabricacao': new FormControl('')
    },{
      validators : [
        // Validadores customizados
        this.dataValidadeValidator(),
        this.dataFabricacaoValidator(),
        this.quantidadeValidator()
      ]
    });

    this.detalheForm.valueChanges.subscribe(data => this.onFormValueChange(data));

    let _uuid = this.route.snapshot.paramMap.get('uuid');

    this.item = new Item("", "", UnidadeMedida.UNIDADE, 0, 0, false, new Date(), new Date());

    if (_uuid != null){
      if (_uuid == 'novo'){
          this.novo = true;

          this.detalheForm.patchValue({
            nome: null,
            unidadeMedida: UnidadeMedida.UNIDADE,
            quantidade: 0,
            preco: 0,
            perecivel: false,
            dataValidade: null,
            dataFabricacao: null
          });

      }else {
        this.itemService.findOne(_uuid).then((data) => {
          this.item = data;

          this.detalheForm.patchValue({
            nome: this.item.nome,
            unidadeMedida:  this.item.unidadeMedida,
            quantidade: this.item.quantidade,
            preco: this.item.preco,
            perecivel: this.item.perecivel,
            dataValidade: this.item.dataValidade ? new Date(this.item.dataValidade) : null,
            dataFabricacao: this.item.dataFabricacao ? new Date(this.item.dataFabricacao) : null
          });
        });
      }
    }   

    this.inicializarForm(this.detalheForm);

  }
  
  /**
   * Marca os campos do form como dirty para conseguirmos ver quais são obrigatórios
   */
  inicializarForm(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((c: { markAsDirty: () => void; }) => {
      c.markAsDirty();
    });
  }


  dataValidadeValidator() {
    return (form: FormGroup) => {

      const error = form.get('perecivel')!.value == true && !form.get('dataValidade')?.value ? { required: true } : null;
      form.get('dataValidade')!.setErrors(error);
      return error;
    }
  }

  dataFabricacaoValidator() {
    return (form: FormGroup) => {
      const error = (form.get('dataFabricacao')!.value == null || (form.get('dataValidade')!.value && form.get('dataFabricacao')!.value < form.get('dataValidade')!.value)) ? { invalidDate: true } : null;
      form.get('dataFabricacao')!.setErrors(error);
      return error;
    }
  }

  quantidadeValidator() {
    return (form: FormGroup) => {
      const error = form.get('unidadeMedida')!.value == 'UNIDADE' && form.get('quantidade')!.value !== parseInt(form.get('quantidade')!.value, 10) ? { invalidNumber: true } : null;
      form.get('quantidade')!.setErrors(error);
      return error;
    }
  }

  voltar() {
    this.router.navigateByUrl('/');
  }

  /**
   * retorna o sufixo da unidade de medida para o campo de quantidade
   */
  getSuffix() {
    switch (this.detalheForm.get('unidadeMedida')!.value) {
      case 'LITRO':
          return " lt";
      case 'QUILOGRAMA':
        return " kg";
      case 'UNIDADE':
        return " un";
      default:
        return "";
    }
  }

  salvar(value: string) {

    if (this.detalheForm.invalid) {
      return;
    }

    this.itemService.save(this.item).then((success) => {
      this.router.navigateByUrl('/');
      this.messageService.add({severity:'success', summary: 'Success', detail: this.novo ? 'Item cadastrado' : 'Item editado'});
    }, (failure) => {
      this.messageService.add({severity:'error', summary: 'Falha', detail: 'não foi possível cadastrar o item'});
    })
  }

  /**
   * @param data atribui o valor do form para o ng-model
   */
  private onFormValueChange(data : any) {
    this.item.nome = data.nome;
    this.item.unidadeMedida =  data.unidadeMedida;
    this.item.quantidade = data.quantidade;
    this.item.preco = data.preco;
    this.item.perecivel = data.perecivel;
    this.item.dataValidade = data.dataValidade;
    this.item.dataFabricacao = data.dataFabricacao;
  }

}
