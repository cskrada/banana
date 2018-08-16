import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()

export class ClientsProvider {

    private apiUrl = 'http://bananaservertest.herokuapp.com/api/thirds/customers/7';

constructor(public http: HttpClient) {

}
    getClients(): Observable<string[]> {
        return this.http.get(this.apiUrl).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    private handleError (error: Response | any) {
        let errMsg: string;
            if (error instanceof Response) {
                const err = error || '';
                errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            } else {
                errMsg = error.message ? error.message : error.toString();
            }
        console.error(errMsg);
        return Observable.throw(errMsg);
        }

}