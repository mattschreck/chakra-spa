import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ExerciseService } from '../data/exercise.service';
import { Calendar, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-exercises',
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

  // FullCalendar-Instanz, um Events neu zu laden
  calendar: Calendar | null = null;

  // Eigenschaften für das Löschmodal
  showDeleteModal: boolean = false;
  currentExerciseId: string = '';
  currentExerciseTitle: string = '';

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
        url: this.exerciseService.getEventsUrl(this.userId),
        method: 'GET',
        failure: () => {
          alert('Fehler beim Laden der Events!');
        }
      },
      eventClick: (info: EventClickArg) => {
        // Bei Klick auf ein Event Modal öffnen zum Löschen
        this.currentExerciseId = info.event.id;
        this.currentExerciseTitle = info.event.title;
        this.showDeleteModal = true;
      }
    });
    this.calendar.render();
  }

  addExercise(): void {
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
      (res: any) => {
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
      (err: any) => {
        this.message = 'Fehler: ' + err.message;
      }
    );
  }

  deleteExercise(): void {
    if (!this.currentExerciseId) {
      alert("Kein Event ausgewählt!");
      return;
    }
    if (!confirm(`Möchten Sie die Übung "${this.currentExerciseTitle}" wirklich löschen?`)) {
      return;
    }
    this.exerciseService.deleteExercise(this.userId, this.currentExerciseId).subscribe(
      (res: any) => {
        if (res.success) {
          this.message = 'Übung gelöscht!';
          this.showDeleteModal = false;
          this.calendar?.refetchEvents();
        } else {
          this.message = 'Fehler beim Löschen: ' + res.message;
        }
      },
      (err: any) => {
        this.message = 'Fehler beim Löschen: ' + err.message;
      }
    );
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  logoff(): void {
    localStorage.clear();
    this.message = 'Abgemeldet!';
  }
}

