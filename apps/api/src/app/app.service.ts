import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Message {
  message: string;
}

@Injectable()
export class AppService {
  getData(): Observable<Message> {
    return of({ message: 'Welcome to api!' }).pipe(map((data) => ({ ...data, message: data.message.toLowerCase() })));
  }
}
