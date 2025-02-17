import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private baseUrl = 'https://dein-backend-url/api/exercises'; // Passe die URL an

  constructor(private http: HttpClient) {}

  getEventsUrl(userId: string): string {
    return `${this.baseUrl}/${userId}`;
  }

  addExercise(userId: string, exercise: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${userId}`, exercise);
  }

  // Neue Methode zum Löschen einer Übung:
  deleteExercise(userId: string, exerciseId: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.baseUrl}/${userId}/${exerciseId}`);
  }
}
