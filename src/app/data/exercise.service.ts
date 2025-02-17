import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  private BACKEND_URL = 'https://chakra-backend-3783b443f623.herokuapp.com';

  constructor(private http: HttpClient) {}

  getEventsUrl(userId: string): string {
    return `${this.BACKEND_URL}/api/exercises/${userId}`;
  }

  addExercise(userId: string, exercise: any): Observable<any> {
    return this.http.post<any>(
      `${this.BACKEND_URL}/api/exercises/${userId}`,
      exercise
    );
  }

  // optional: deleteExercise(userId: string, exId: string)
  // ...
}
