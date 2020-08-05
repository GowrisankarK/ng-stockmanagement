import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCsvUploadComponent } from './stock-csv-upload.component';

describe('StockCsvUploadComponent', () => {
  let component: StockCsvUploadComponent;
  let fixture: ComponentFixture<StockCsvUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockCsvUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockCsvUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
