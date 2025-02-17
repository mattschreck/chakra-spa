import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  private BASE_URL = 'https://chakra-backend-3783b443f623.herokuapp.com/api/exercises';

  constructor(private http: HttpClient) {}

  getEventsUrl(userId: string): string {
    return `${this.BASE_URL}/${userId}`;
  }

  addExercise(userId: string, exercise: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/${userId}`, exercise);
  }

  deleteExercise(userId: string, exerciseId: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${userId}/${exerciseId}`);
  }
}
