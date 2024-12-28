import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ContactService} from '../../shared/services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  form: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, private contactService: ContactService) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      subject: [''],
      message: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit(form) {
    this.contactService.PostMessage(form.value);
    this.form.reset();
  }
}
