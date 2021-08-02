import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { ProductReport } from 'src/ProductReport';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})

export class ProductTableComponent implements OnInit {
  PRODUCT_DATA: ProductReport[];
  displayedColumns: string[] = ['id', 'nome', 'preco'];
  dataSource = new MatTableDataSource<ProductReport>(this.PRODUCT_DATA);

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
}
