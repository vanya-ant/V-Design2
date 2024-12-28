import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private api = 'https://formspree.io/f/mrgrveqv';

  constructor(private http: HttpClient,  public toastr: ToastrService) { }
  PostMessage(input: any) {
    return this.http.post(this.api, input)
      .pipe(
        map(
          (response) => {
            if (response) {
              return response;
            }
          },
          // tslint:disable-next-line:no-shadowed-variable
          (error: any) => {
            return error;
          }
        )
      ).subscribe( success => this.toastr.success('Success!'));
  }
}
