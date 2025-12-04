import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonumentDetailPage } from './monument-detail.page';

describe('MonumentDetailPage', () => {
  let component: MonumentDetailPage;
  let fixture: ComponentFixture<MonumentDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MonumentDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
