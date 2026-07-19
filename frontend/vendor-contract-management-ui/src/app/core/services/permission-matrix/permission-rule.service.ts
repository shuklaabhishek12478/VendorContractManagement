import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PermissionRule } from '../../models/permission-rule.model';


@Injectable({
    providedIn: 'root'
})
export class PermissionRuleService {

    private apiUrl =
        `${environment.apiUrl}/permission-rules`;

    constructor(
        private http: HttpClient
    ) { }

    getRules():
        Observable<PermissionRule[]> {

        return this.http.get<PermissionRule[]>(
            this.apiUrl
        );

    }

}