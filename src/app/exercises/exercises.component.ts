import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ExerciseService } from '../data/exercise.service';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-exercises',
  standalone: false,
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar') calendarEl!: ElementRef;

  userId = '';
  title = '';
  date = '';
  weight = 0;
  repetitions = 0;
  sets = 0;
  bodyPart = '';
  message = '';

  // FullCalendar-Instanz, um events refetchen zu können
  calendar: any;

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
    if (!this.userId) {
      this.message = 'Bitte logge dich ein!';
    }
  }

  ngAfterViewInit(): void {
    if (!this.userId) return;
    this.calendar = new Calendar(this.calendarEl.nativeElement, {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      locale: 'de',
      events: {
        url: this.exerciseService.getEventsUrl(this.userId), // z. B. BACKEND/api/exercises/{userId}
        method: 'GET',
        failure: () => {
          alert('Fehler beim Laden der Events!');
        }
      },
      eventClick: (info) => {
        // z. B. Modal
      }
    });
    this.calendar.render();
  }

  addExercise() {
    if (!this.userId) {
      this.message = 'Keine userId => bitte einloggen!';
      return;
    }
    const newEx = {
      title: this.title,
      start: this.date,
      weight: this.weight,
      repetitions: this.repetitions,
      sets: this.sets,
      bodyPart: this.bodyPart
    };
    this.exerciseService.addExercise(this.userId, newEx).subscribe(
      res => {
        this.message = 'Übung hinzugefügt!';
        // Felder zurücksetzen
        this.title = '';
        this.date = '';
        this.weight = 0;
        this.repetitions = 0;
        this.sets = 0;
        this.bodyPart = '';
        // Kalender neu laden
        this.calendar?.refetchEvents();
      },
      err => {
        this.message = 'Fehler: ' + err.message;
      }
    );
  }

  logoff() {
    localStorage.clear();
    this.message = 'Abgemeldet!';
  }
}
