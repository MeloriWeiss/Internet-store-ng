import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PaymentType} from "../../../../types/payment.type";
import {DeliveryType} from "../../../../types/delivery.type";
import {UserService} from "../../../shared/services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {UserInfoType} from "../../../../types/user-info.type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  deliveryType: DeliveryType = DeliveryType.delivery;
  deliveryTypes = DeliveryType;
  paymentTypes = PaymentType;
  userInfoForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    phone: [''],
    fatherName: [''],
    paymentType: [PaymentType.cashToCourier],
    email: ['', [Validators.required, Validators.email]],
    street: [''],
    house: [''],
    entrance: [''],
    apartment: ['']
  });

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getUserInfo()
      .subscribe((data: UserInfoType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message);
        }
        const userInfo = data as UserInfoType;
        this.userInfoForm.patchValue(userInfo);
        if (userInfo.deliveryType) {
          this.deliveryType = userInfo.deliveryType;
        }
      });
  }

  changeDeliveryType(type: DeliveryType) {
    this.deliveryType = type;
    this.userInfoForm.markAsDirty();
  }

  updateUserInfo() {
    if (this.userInfoForm.valid) {

      const paramsObject: UserInfoType = {
        email: this.userInfoForm.value.email ? this.userInfoForm.value.email : '',
        deliveryType: this.deliveryType,
        paymentType: this.userInfoForm.value.paymentType ? this.userInfoForm.value.paymentType : PaymentType.cashToCourier
      };

      if (this.userInfoForm.value.firstName) {
        paramsObject.firstName = this.userInfoForm.value.firstName;
      }
      if (this.userInfoForm.value.lastName) {
        paramsObject.lastName = this.userInfoForm.value.lastName;
      }
      if (this.userInfoForm.value.fatherName) {
        paramsObject.fatherName = this.userInfoForm.value.fatherName;
      }
      if (this.userInfoForm.value.phone) {
        paramsObject.phone = this.userInfoForm.value.phone;
      }
      if (this.userInfoForm.value.street) {
        paramsObject.street = this.userInfoForm.value.street;
      }
      if (this.userInfoForm.value.house) {
        paramsObject.house = this.userInfoForm.value.house;
      }
      if (this.userInfoForm.value.entrance) {
        paramsObject.entrance = this.userInfoForm.value.entrance;
      }
      if (this.userInfoForm.value.apartment) {
        paramsObject.apartment = this.userInfoForm.value.apartment;
      }

      this.userService.updateUserInfo(paramsObject)
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (data.error) {
              this._snackBar.open(data.message);
              throw new Error(data.message);
            }

            this._snackBar.open('Данные успешно сохранены');
            this.userInfoForm.markAsPristine();
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка при сохранении');
            }
          }
        });
    } else {
      this.userInfoForm.markAllAsTouched();
      this._snackBar.open('Заполните поле E-mail');
    }
  }
}
