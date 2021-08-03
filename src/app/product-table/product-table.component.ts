import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { ProductReport } from 'src/ProductReport';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})

export class ProductTableComponent implements OnInit {
  PRODUCT_DATA: ProductReport[];
  displayedColumns: string[] = ['id', 'nome', 'preco', 'editar', 'apagar'];
  dataSource = new MatTableDataSource<ProductReport>(this.PRODUCT_DATA);
  status;
  errorMessage;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private service: DataService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.buscarTodosProdutos();
  }

  public buscarTodosProdutos() {
    this.service.buscarProdutos().subscribe((data: any[]) => {
      data = Object.values(data);
      console.log(data);
      this.dataSource.data = data[1];
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public deleteMe(id) {
    Swal.fire({
      title: 'Deseja mesmo excluir o Id ' + id + '?',
      text: 'Esta ação é irreversível!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, apague!'
    }).then((result) => {
      console.log(id);
      this.service.apagarProduto(id).subscribe({
        next: data => {
          this.status = 'Apagado com sucesso!';
          Swal.fire('Apagado!', 'O produto foi excluído.', 'success');
          this.refreshPage()

        },
        error: error => {
          this.errorMessage = error.message;
          console.error('Ocorreu um erro!', error);
          Swal.fire('Erro!', error, 'error')
        }
      });
    })
  }

  public refreshPage() {
    window.location.reload();
  }
}


