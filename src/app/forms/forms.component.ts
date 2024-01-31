import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  //standalone: true,
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit{
inputForm!:FormGroup;
public ngOnInit(): void {
  this.setForm();  
}
setForm(){
  this.inputForm = new FormGroup({
    FirstName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    LastName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    MiddleName: new FormControl('', Validators.maxLength(20)),
    Age: new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]$/), Validators.min(10), Validators.max(50)]),
    Gender: new FormControl(''),
    Address: new FormGroup({
      Street: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      Landmark: new FormControl('', Validators.maxLength(20)),
      City: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      State: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      ZipCode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(20)]),
      Country: new FormControl('', [Validators.required, Validators.maxLength(20)])
    }),
    Hobbies: new FormArray([
      new FormControl('', Validators.maxLength(20))
    ])
  });
}
get hobbies() {//getter method
  return this.inputForm.get('Hobbies') as FormArray;
}
getHobbyControl(index: number): FormControl {
  return this.hobbies.at(index) as FormControl;
}
add() {
  this.hobbies.push(new FormControl('', Validators.maxLength(20)));
}
remove(index: number) {
  this.hobbies.removeAt(index);
}
Submit() {
  if (this.inputForm.valid) {
    console.log('Submitted Form:', this.inputForm.value);
  } else {
    console.log('Invalid Form', this.inputForm.value);
  }
}
}

