import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {
  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      id: ['0'],
      nome: [''],
      preco: [''],
      data: ['	0001-01-01T00:00:00']
    })
  }

  ngOnInit() { }

  submitForm() {
    var formData: any = new FormData();
    //formData.append("nome", this.form.get('nome').value);
    //formData.append("preco", this.form.get('preco').value);
    var body = {
      id: 1,
      nome: this.form.get('nome').value,
      preco: parseInt(this.form.get('preco').value),
      data: "0001-01-01T00:00:00"
    }
    console.log(body);


    this.http.post('https://www.getwayautomacao.com.br/teste-angular/api/produtos/salvarProduto', body).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }

}
